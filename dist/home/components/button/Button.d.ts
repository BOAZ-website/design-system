import type { ComponentPropsWithRef, ReactNode } from 'react';
export type ButtonVariant = 'brand' | 'neutral' | 'glass' | 'text-link' | 'outlined' | 'destructive';
export type ButtonSize = 'brand-wide' | 'brand-pill-lg' | 'brand-pill-md' | 'brand-small' | 'neutral-lg' | 'neutral-md';
type VariantSize = {
    variant?: 'brand';
    size?: Extract<ButtonSize, `brand-${string}`>;
} | {
    variant: 'neutral';
    size?: Extract<ButtonSize, `neutral-${string}`>;
} | {
    variant: 'glass' | 'text-link' | 'outlined' | 'destructive';
    size?: never;
};
type Common = {
    iconStart?: ReactNode;
    iconEnd?: ReactNode;
    responsive?: boolean;
};
type Named = {
    children: ReactNode;
} | {
    children?: undefined;
    'aria-label': string;
} | {
    children?: undefined;
    'aria-labelledby': string;
};
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
export type ButtonProps = VariantSize & Common & Named & (ButtonEl | LinkEl);
export declare function Button(props: ButtonProps): import("react").JSX.Element;
export {};
