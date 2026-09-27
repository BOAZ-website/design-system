// 토큰(tokens/**/*.json, DTCG) → dist/ 생성물 3종
//   tokens.css          :root { --boaz-* }
//   tokens.ts           var() 참조를 담은 중첩 객체(Vanilla Extract 등에서 사용)
//   tailwind-theme.css  Tailwind v4 @theme inline 별칭(--color-boaz-* 등)
import StyleDictionary from 'style-dictionary';

const PREFIX = 'boaz';

// Tailwind v4 는 네임스페이스(--color-*, --radius-* …)로 유틸리티를 만든다.
// 토큰 최상위 그룹 → Tailwind 네임스페이스. 여기 없는 그룹은 tailwind-theme.css 에 넣지 않는다.
const TAILWIND_NAMESPACE = { color: 'color', radius: 'radius' };

StyleDictionary.registerFormat({
  name: 'boaz/ts-vars',
  format: ({ dictionary }) => {
    const tree = {};
    for (const token of dictionary.allTokens) {
      const keys = [...token.path];
      const leaf = keys.pop();
      let node = tree;
      for (const key of keys) node = node[key] ??= {};
      node[leaf] = `var(--${token.name})`;
    }
    return [
      '// 이 파일은 npm run build 로 생성됩니다. 직접 수정하지 마세요.',
      `export const vars = ${JSON.stringify(tree, null, 2)} as const;`,
      '',
    ].join('\n');
  },
});

StyleDictionary.registerFormat({
  name: 'boaz/tailwind-theme',
  format: ({ dictionary }) => {
    const lines = dictionary.allTokens
      .filter((token) => TAILWIND_NAMESPACE[token.path[0]])
      .map((token) => {
        const namespace = TAILWIND_NAMESPACE[token.path[0]];
        const rest = token.path.slice(1).join('-');
        return `  --${namespace}-${PREFIX}-${rest}: var(--${token.name});`;
      });
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
        { destination: 'tokens.ts', format: 'boaz/ts-vars' },
        { destination: 'tailwind-theme.css', format: 'boaz/tailwind-theme' },
      ],
    },
  },
});

await sd.buildAllPlatforms();
