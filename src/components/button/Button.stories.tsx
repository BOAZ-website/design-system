import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties } from 'react';
import { Button, type ButtonProps, type ButtonVariant } from './Button';

const ArrowIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
const ChatIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 3C6.5 3 2 6.6 2 11c0 2.8 1.8 5.3 4.6 6.7L5.5 21l4.2-2.4c.8.1 1.5.2 2.3.2 5.5 0 10-3.6 10-8S17.5 3 12 3z" />
  </svg>
);

const description = `
명세: \`components/button.md\`. 툴바 "바탕"에서 홈페이지(검정)와 관리자(흰색)를 전환해 확인함.

**컴포넌트 CSS 변수** (패키지는 선언하지 않음. 앱이 \`:root\`에서 덮어씀. text-link는 읽지 않음)

| 변수 | 뜻 | 예(brand-small 기본값) |
| --- | --- | --- |
| \`--boaz-button-height\` | 높이 | 42px |
| \`--boaz-button-padding-x\` | 좌우 패딩 | 33.5px |
| \`--boaz-button-font-size\` | 글자 크기 | 18px |
| \`--boaz-button-line-height\` | 행간 | 1 |
| \`--boaz-button-radius\` | 모서리 | 40px |
| \`--boaz-button-gap\` | 아이콘과 글자 사이 | 10px |
| \`--boaz-button-icon-size\` | 아이콘 크기 | 20px |

변수 이름 삭제·변경은 prop 이름 삭제·변경과 같은 breaking 변경임.
`;

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: { docs: { description: { component: description } } },
  args: { children: '지원하기' },
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Brand: Story = { args: { variant: 'brand' } };
export const Neutral: Story = { args: { variant: 'neutral' } };
export const Glass: Story = { args: { variant: 'glass' } };
export const TextLink: Story = {
  args: { variant: 'text-link', iconEnd: <ArrowIcon />, children: '다음' },
};
export const Outlined: Story = {
  args: { variant: 'outlined', children: '임시저장' },
};
export const Destructive: Story = {
  args: { variant: 'destructive', children: '삭제' },
};

const column: CSSProperties = {
  display: 'grid',
  gap: 16,
  justifyItems: 'start',
};

export const Sizes: Story = {
  render: () => (
    <div style={column}>
      <Button size="brand-wide">brand-wide</Button>
      <Button size="brand-pill-lg">brand-pill-lg</Button>
      <Button size="brand-pill-md">brand-pill-md</Button>
      <Button size="brand-small">brand-small</Button>
      <Button variant="neutral" size="neutral-lg">
        neutral-lg
      </Button>
      <div style={{ inlineSize: 458 }}>
        <Button variant="neutral" size="neutral-md">
          neutral-md
        </Button>
      </div>
    </div>
  ),
};

export const Responsive: Story = {
  name: 'Responsive (뷰포트 768px 이하에서 확인)',
  render: () => (
    <div style={column}>
      <Button responsive size="brand-pill-md">
        brand-pill-md
      </Button>
      <Button responsive>brand-small</Button>
      <Button responsive variant="neutral">
        neutral-md
      </Button>
      <Button responsive variant="glass">
        glass
      </Button>
      <Button responsive variant="text-link" iconEnd={<ArrowIcon />}>
        text-link
      </Button>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div style={column}>
      <Button iconStart={<ChatIcon />}>카카오톡 문의하기</Button>
      <Button variant="outlined" iconStart={<ArrowIcon />}>
        임시저장
      </Button>
      <Button variant="neutral" iconEnd={<ArrowIcon />}>
        자세히 보기
      </Button>
      <Button variant="text-link" iconEnd={<ArrowIcon />}>
        다음
      </Button>
      <Button aria-label="문의하기" iconStart={<ChatIcon />} />
    </div>
  ),
};

const variants: ButtonVariant[] = ['brand', 'neutral', 'glass', 'text-link', 'outlined', 'destructive'];

export const Pending: Story = {
  render: () => (
    <div style={column}>
      {variants.map((variant) => (
        <Button key={variant} {...({ variant, pending: true } as ButtonProps)}>
          {variant}
        </Button>
      ))}
    </div>
  ),
};

const states = [
  ['rest', {}],
  ['hover', {}],
  ['press', {}],
  ['focus-visible', {}],
  ['pending', { pending: true }],
  ['disabled', { disabled: true }],
] as const;

const cellId = (variant: string, state: string) => `${variant}-${state}`;
const idsOf = (state: string) => variants.map((variant) => `#${cellId(variant, state)}`);

// hover·press·focus-visible 은 storybook-addon-pseudo-states 가 해당 셀에만 고정한다.
export const AllStates: Story = {
  parameters: {
    layout: 'padded',
    pseudo: { hover: idsOf('hover'), active: idsOf('press'), focusVisible: idsOf('focus-visible') },
  },
  render: () => (
    <table style={{ borderCollapse: 'separate', borderSpacing: '16px 12px' }}>
      <thead>
        <tr>
          <th />
          {states.map(([name]) => (
            <th key={name} style={{ textAlign: 'start', fontWeight: 400 }}>
              {name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {variants.map((variant) => (
          <tr key={variant}>
            <th scope="row" style={{ textAlign: 'start', fontWeight: 400 }}>
              {variant}
            </th>
            {states.map(([name, extra]) => (
              <td key={name}>
                <Button {...({ variant, id: cellId(variant, name), ...extra } as ButtonProps)}>
                  {variant === 'destructive' ? '삭제' : '라벨'}
                </Button>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
};
