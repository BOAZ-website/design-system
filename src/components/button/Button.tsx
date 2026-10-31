import type { ComponentPropsWithRef, MouseEvent, ReactNode } from 'react';
import styles from './Button.module.css';

export type ButtonVariant = 'brand' | 'neutral' | 'glass' | 'text-link' | 'outlined' | 'destructive';
export type ButtonSize = 'brand-wide' | 'brand-pill-lg' | 'brand-pill-md' | 'brand-small' | 'neutral-lg' | 'neutral-md';

// size 는 brand·neutral 에만 있다. 나머지 variant 의 크기는 variant 가 정한다(components/button.md 3절).
type VariantSize =
  | { variant?: 'brand'; size?: Extract<ButtonSize, `brand-${string}`> }
  | { variant: 'neutral'; size?: Extract<ButtonSize, `neutral-${string}`> }
  | {
      variant: 'glass' | 'text-link' | 'outlined' | 'destructive';
      size?: never;
    };

type Common = {
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
  responsive?: boolean;
};

// 보이는 라벨이 없으면(아이콘만) 접근 가능한 이름 prop 이 있어야 한다.
// 타입은 키가 있는지만 확인한다. 빈 문자열·undefined 값은 런타임에 잡지 못한다.
type Named =
  | { children: ReactNode }
  | { children?: undefined; 'aria-label': string }
  | { children?: undefined; 'aria-labelledby': string };

type ButtonEl = Omit<ComponentPropsWithRef<'button'>, 'type' | 'children' | 'aria-busy'> & {
  type?: 'button' | 'submit' | 'reset';
  pending?: boolean;
  href?: undefined;
};
type LinkEl = Omit<ComponentPropsWithRef<'a'>, 'children' | 'aria-busy'> & {
  href: string;
  disabled?: never;
  pending?: never;
  type?: never;
};

// 이 유니온에 Omit<ButtonProps, …> 를 쓰면 판별이 무너져 variant·size·href 검사가 사라진다.
// 감싸는 컴포넌트는 Pick 하거나 유니온 멤버를 각각 extends 한다.
export type ButtonProps = VariantSize & Common & Named & (ButtonEl | LinkEl);

const DEFAULT_SIZE = { brand: 'brand-small', neutral: 'neutral-md' } as const;

// 위 유니온은 호출부를 검사하기 위한 것이고, 구현 안에서는 느슨한 모양으로 읽는다. 아래 `as Loose` 가 이 파일의 유일한 캐스트다.
type Loose = Common &
  Omit<ComponentPropsWithRef<'button'> & ComponentPropsWithRef<'a'>, 'type' | 'children' | 'href'> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
    children?: ReactNode;
    href?: string;
    pending?: boolean;
    type?: 'button' | 'submit' | 'reset';
  };

export function Button(props: ButtonProps) {
  const {
    variant = 'brand',
    size,
    iconStart,
    iconEnd,
    responsive,
    pending,
    href,
    type,
    className,
    children,
    onClick,
    ...rest
  } = props as Loose;

  const resolvedSize = variant === 'brand' || variant === 'neutral' ? (size ?? DEFAULT_SIZE[variant]) : undefined;
  const common = {
    ...rest,
    className: className ? `${styles.root} ${className}` : styles.root,
    'data-variant': variant,
    'data-size': resolvedSize,
    'data-responsive': responsive ? '' : undefined,
    'data-icon-start': iconStart ? '' : undefined,
  };
  const content = (
    <>
      {iconStart ? (
        <span className={styles.icon} data-slot="icon-start" aria-hidden="true">
          {iconStart}
        </span>
      ) : null}
      {children}
      {iconEnd ? (
        <span className={styles.icon} data-slot="icon-end" aria-hidden="true">
          {iconEnd}
        </span>
      ) : null}
    </>
  );

  if (href !== undefined) {
    return (
      <a {...common} href={href} onClick={onClick}>
        {content}
      </a>
    );
  }

  // 처리 중에는 disabled 로 바꾸지 않고(포커스 유지) 클릭만 막는다. 제출 버튼이면 폼 제출도 막힌다.
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (pending) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };

  return (
    <button {...common} type={type ?? 'button'} aria-busy={pending || undefined} onClick={handleClick}>
      {content}
    </button>
  );
}
