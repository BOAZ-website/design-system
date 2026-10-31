import type { Preview } from '@storybook/react-vite';
import '../dist/tokens.css';
import './admin-preset.css';

// 바탕은 body 가 아니라 이 래퍼가 그린다. 관리자 덮어쓰기(admin-preset.css)도 이 속성에 걸린다.
const preview: Preview = {
  globalTypes: {
    surface: {
      description: '바탕 전환',
      toolbar: {
        title: '바탕',
        icon: 'paintbrush',
        items: [
          { value: 'home', title: '홈페이지 (검정)' },
          { value: 'admin', title: '관리자 (흰색)' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { surface: 'home' },
  decorators: [
    (Story, context) => (
      <div
        data-boaz-theme={context.globals.surface}
        style={{
          minHeight: '100vh',
          boxSizing: 'border-box',
          padding: '1rem',
          background: 'var(--boaz-color-bg-canvas)',
          color: 'var(--boaz-color-fg-default)',
          fontFamily: 'var(--boaz-font-family-base)',
        }}
      >
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    backgrounds: { disable: true },
    // 접근성 패널은 표시하되 위반이 테스트를 실패시키지는 않는다. CI 는 Storybook 빌드만 한다.
    a11y: { test: 'todo' },
  },
};

export default preview;
