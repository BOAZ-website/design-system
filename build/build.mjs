// 토큰(tokens/**/*.json, DTCG) → dist/ 생성물 4종
//   tokens.css          :root { --boaz-* }
//   tokens.js           var() 참조를 담은 중첩 객체(Vanilla Extract 등에서 사용, ESM)
//   tokens.d.ts         tokens.js 타입
//   tailwind-theme.css  Tailwind v4 @theme inline 별칭(--color-boaz-* 등)
import { globSync } from 'node:fs';
import { rename, rm } from 'node:fs/promises';
import StyleDictionary from 'style-dictionary';

const PREFIX = 'boaz';
const BUILD_DIR = 'dist.tmp';
const HEADER = '// 이 파일은 npm run build 로 생성됩니다. 직접 수정하지 마세요.';

// 토큰 → Tailwind v4 테마 변수 이름. null 이면 tailwind-theme.css 에 넣지 않는다.
// 타이포는 Tailwind 의 --text-{name}--line-height / --font-weight 짝 규칙에 맞춰 바꿔 쓴다.
const TYPOGRAPHY_SUFFIX = { size: '', 'line-height': '--line-height', weight: '--font-weight' };
// 일부러 Tailwind 에 내보내지 않는 원시 글꼴 토큰. typography.* 가 대신 나간다.
const TAILWIND_SKIP = new Set(['font.size', 'font.weight', 'font.line-height']);

// 표에 없는 그룹·속성은 null 로 조용히 빠지지 않고 빌드를 멈춘다. 새 토큰 그룹을 추가하면 여기도 고친다.
function tailwindName(path) {
  const [group, ...rest] = path;
  if (TAILWIND_SKIP.has(path.slice(0, 2).join('.'))) return null;
  switch (group) {
    case 'color':
    case 'radius':
    case 'spacing':
      return `--${group}-${PREFIX}-${rest.join('-')}`;
    case 'typography': {
      const [style, prop] = rest;
      if (!(prop in TYPOGRAPHY_SUFFIX)) throw new Error(`tailwind 변환 표에 없는 타이포 속성: ${path.join('.')}`);
      return `--text-${PREFIX}-${style}${TYPOGRAPHY_SUFFIX[prop]}`;
    }
    case 'font':
      return `--font-${PREFIX}-${rest[1]}`;
    default:
      throw new Error(`tailwind 변환 표에 없는 토큰 그룹: ${path.join('.')}`);
  }
}

function varsTree(tokens) {
  const tree = {};
  for (const token of tokens) {
    const keys = [...token.path];
    const leaf = keys.pop();
    let node = tree;
    for (const key of keys) node = node[key] ??= {};
    node[leaf] = `var(--${token.name})`;
  }
  return tree;
}

// 숫자 단계는 숫자 키, 이름에 - 가 있으면 따옴표 키
const typeKey = (key) => (/^\d+$/.test(key) || /^[A-Za-z_$][\w$]*$/.test(key) ? key : JSON.stringify(key));

function typeOf(node, indent) {
  if (typeof node === 'string') return JSON.stringify(node);
  const pad = '  '.repeat(indent + 1);
  const body = Object.entries(node)
    .map(([key, value]) => `${pad}readonly ${typeKey(key)}: ${typeOf(value, indent + 1)};`)
    .join('\n');
  return `{\n${body}\n${'  '.repeat(indent)}}`;
}

StyleDictionary.registerFormat({
  name: 'boaz/js-vars',
  format: ({ dictionary }) =>
    [HEADER, `export const vars = ${JSON.stringify(varsTree(dictionary.allTokens), null, 2)};`, ''].join('\n'),
});

StyleDictionary.registerFormat({
  name: 'boaz/dts-vars',
  format: ({ dictionary }) =>
    [HEADER, `export declare const vars: ${typeOf(varsTree(dictionary.allTokens), 0)};`, ''].join('\n'),
});

StyleDictionary.registerFormat({
  name: 'boaz/tailwind-theme',
  format: ({ dictionary }) => {
    const lines = dictionary.allTokens
      .map((token) => [tailwindName(token.path), token.name])
      .filter(([name]) => name)
      .map(([name, source]) => `  ${name}: var(--${source});`);
    return [
      '/* 이 파일은 npm run build 로 생성됩니다. 직접 수정하지 마세요. */',
      '@import "./tokens.css";',
      '',
      '@theme inline {',
      ...lines,
      '}',
      '',
    ].join('\n');
  },
});

const sd = new StyleDictionary({
  // 파일 순서가 출력 순서다. glob 결과 순서는 환경마다 다를 수 있어 정렬해 고정한다.
  source: globSync('tokens/**/*.json').sort(),
  // 참조 깨짐·중복 이름은 기본값이 경고라 빌드가 통과한다. 오류로 올려 빌드를 멈춘다.
  log: { warnings: 'error' },
  platforms: {
    css: {
      transformGroup: 'css',
      prefix: PREFIX,
      buildPath: `${BUILD_DIR}/`,
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: { outputReferences: true, showFileHeader: false },
        },
        { destination: 'tokens.js', format: 'boaz/js-vars' },
        { destination: 'tokens.d.ts', format: 'boaz/dts-vars' },
        { destination: 'tailwind-theme.css', format: 'boaz/tailwind-theme' },
      ],
    },
  },
});

// 임시 폴더에 먼저 만들고 성공했을 때만 dist/ 와 바꾼다. 빌드가 실패해도 커밋된 dist/ 는 남는다.
// 이름이 바뀐 생성물(예: 예전 tokens.ts)이 남지 않게 통째로 교체한다.
await rm(BUILD_DIR, { recursive: true, force: true });
await sd.buildAllPlatforms();
await rm('dist', { recursive: true, force: true });
await rename(BUILD_DIR, 'dist');
