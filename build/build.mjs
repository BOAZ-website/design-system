// 토큰(tokens/**/*.json, DTCG) → dist/ 생성물 4종
//   tokens.css          :root { --boaz-* }
//   tokens.js           var() 참조를 담은 중첩 객체(Vanilla Extract 등에서 사용, ESM)
//   tokens.d.ts         tokens.js 타입
//   tailwind-theme.css  Tailwind v4 @theme inline 별칭(--color-boaz-* 등)
import { rm } from 'node:fs/promises';
import StyleDictionary from 'style-dictionary';

const PREFIX = 'boaz';
const HEADER = '// 이 파일은 npm run build 로 생성됩니다. 직접 수정하지 마세요.';

// 토큰 → Tailwind v4 테마 변수 이름. null 이면 tailwind-theme.css 에 넣지 않는다.
// 타이포는 Tailwind 의 --text-{name}--line-height / --font-weight 짝 규칙에 맞춰 바꿔 쓴다.
const TYPOGRAPHY_SUFFIX = { size: '', 'line-height': '--line-height', weight: '--font-weight' };

function tailwindName([group, ...rest]) {
  switch (group) {
    case 'color':
    case 'radius':
    case 'spacing':
      return `--${group}-${PREFIX}-${rest.join('-')}`;
    case 'typography': {
      const [style, prop] = rest;
      return `--text-${PREFIX}-${style}${TYPOGRAPHY_SUFFIX[prop]}`;
    }
    case 'font':
      return rest[0] === 'family' ? `--font-${PREFIX}-${rest[1]}` : null;
    default:
      return null;
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
  source: ['tokens/**/*.json'],
  // 참조 깨짐·중복 이름은 기본값이 경고라 빌드가 통과한다. 오류로 올려 빌드를 멈춘다.
  log: { warnings: 'error' },
  platforms: {
    css: {
      transformGroup: 'css',
      prefix: PREFIX,
      buildPath: 'dist/',
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

// 이름이 바뀐 생성물(예: 예전 tokens.ts)이 남지 않게 매번 비운다.
await rm('dist', { recursive: true, force: true });
await sd.buildAllPlatforms();
