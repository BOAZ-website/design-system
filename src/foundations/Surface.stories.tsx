import type { Meta, StoryObj } from '@storybook/react-vite';

// 임시: 바탕 전환(홈페이지·관리자) 확인용. 패키지에서 export 하지 않는다.
const meta = { title: 'Foundations/Surface' } satisfies Meta;
export default meta;

const colors = ['bg-canvas', 'bg-brand-solid', 'bg-brand-solid-hover', 'stroke-focus', 'stroke-critical'];

export const Semantic: StoryObj = {
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      <p style={{ margin: 0 }}>기본 글자 (fg-default)</p>
      <p style={{ margin: 0, color: 'var(--boaz-color-fg-muted)' }}>보조 글자 (fg-muted)</p>
      <p style={{ margin: 0, color: 'var(--boaz-color-fg-critical)' }}>오류 글자 (fg-critical)</p>
      <div style={{ display: 'flex', gap: 8 }}>
        {colors.map((name) => (
          <div key={name} style={{ textAlign: 'center', fontSize: 12 }}>
            <div
              style={{
                width: 72,
                height: 40,
                background: `var(--boaz-color-${name})`,
                border: '1px solid var(--boaz-color-stroke-neutral)',
              }}
            />
            {name}
          </div>
        ))}
      </div>
    </div>
  ),
};
