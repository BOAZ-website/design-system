import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { Button } from './Button';

describe('Button', () => {
  it('기본은 type="button" 인 <button> 이다', () => {
    render(<Button>지원하기</Button>);
    const button = screen.getByRole('button', { name: '지원하기' });
    expect(button.tagName).toBe('BUTTON');
    expect(button).toHaveAttribute('type', 'button');
  });

  it('type 을 넘기면 그대로 쓴다', () => {
    render(<Button type="submit">제출</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('brand·neutral 은 기본 size 를 data-size 로 갖고 나머지 variant 는 갖지 않는다', () => {
    render(
      <>
        <Button>a</Button>
        <Button variant="neutral">b</Button>
        <Button variant="glass">c</Button>
      </>,
    );
    expect(screen.getByText('a')).toHaveAttribute('data-size', 'brand-small');
    expect(screen.getByText('b')).toHaveAttribute('data-size', 'neutral-md');
    expect(screen.getByText('c')).not.toHaveAttribute('data-size');
  });

  it('Enter 와 Space 로 onClick 이 실행된다', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>확인</Button>);
    await userEvent.tab();
    expect(screen.getByRole('button')).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await userEvent.keyboard(' ');
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it('pending 이면 aria-busy 를 켜고 클릭을 막되 disabled 로 바꾸지 않고 포커스·라벨을 유지한다', async () => {
    const onClick = vi.fn();
    render(
      <Button pending onClick={onClick}>
        제출
      </Button>,
    );
    const button = screen.getByRole('button', { name: '제출' });
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button).not.toBeDisabled();
    await userEvent.tab();
    expect(button).toHaveFocus();
    await userEvent.click(button);
    await userEvent.keyboard('{Enter}');
    expect(onClick).not.toHaveBeenCalled();
    expect(button).toHaveFocus();
    expect(button).toHaveTextContent('제출');
  });

  it('pending 이면 submit 버튼도 폼을 제출하지 않는다', async () => {
    const onSubmit = vi.fn((event: { preventDefault: () => void }) => event.preventDefault());
    render(
      <form onSubmit={onSubmit}>
        <Button type="submit" pending>
          제출
        </Button>
      </form>,
    );
    await userEvent.click(screen.getByRole('button'));
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('pending 이 아니면 aria-busy 가 없다', () => {
    render(<Button>제출</Button>);
    expect(screen.getByRole('button')).not.toHaveAttribute('aria-busy');
  });

  it('disabled 이면 클릭이 실행되지 않는다', async () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        지원하기
      </Button>,
    );
    await userEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('button')).toBeDisabled();
    expect(onClick).not.toHaveBeenCalled();
  });

  it('href 가 있으면 role 을 덧씌우지 않은 <a> 로 그린다', () => {
    render(<Button href="/apply">지원서</Button>);
    const link = screen.getByRole('link', { name: '지원서' });
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', '/apply');
    expect(link).not.toHaveAttribute('role');
    expect(link).not.toHaveAttribute('type');
  });

  it('아이콘은 aria-hidden 이라 접근 가능한 이름에 들어가지 않는다', () => {
    render(
      <Button iconStart={<svg data-testid="start" />} iconEnd={<svg data-testid="end" />}>
        다음
      </Button>,
    );
    expect(screen.getByRole('button', { name: '다음' })).toBeInTheDocument();
    expect(screen.getByTestId('start').parentElement).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByTestId('end').parentElement).toHaveAttribute('aria-hidden', 'true');
  });

  it('아이콘만 있는 버튼은 aria-label 을 이름으로 쓴다', () => {
    render(<Button aria-label="문의하기" iconStart={<svg />} />);
    expect(screen.getByRole('button', { name: '문의하기' })).toBeInTheDocument();
  });

  it('ref 가 button·a 요소를 가리킨다', () => {
    const buttonRef = createRef<HTMLButtonElement>();
    const linkRef = createRef<HTMLAnchorElement>();
    render(
      <>
        <Button ref={buttonRef}>a</Button>
        <Button ref={linkRef} href="/a">
          b
        </Button>
      </>,
    );
    expect(buttonRef.current).toBeInstanceOf(HTMLButtonElement);
    expect(linkRef.current).toBeInstanceOf(HTMLAnchorElement);
  });

  it('className 은 모듈 클래스에 더해진다', () => {
    render(<Button className="extra">a</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('extra');
    expect(button.className.split(' ').length).toBe(2);
  });

  it('링크에도 aria-label 이 전달된다', () => {
    render(
      <Button href="/a" aria-label="지원서로 이동">
        지원
      </Button>,
    );
    expect(screen.getByRole('link', { name: '지원서로 이동' })).toBeInTheDocument();
  });

  it('잘못된 조합은 타입 오류다', () => {
    // 이 함수는 실행하지 않는다. tsc(npm run typecheck)가 아래 @ts-expect-error 가 실제로 오류인지 확인한다.
    const typeChecks = () => (
      <>
        {/* 아래 다섯 개는 올바른 조합이라 오류가 없어야 한다 */}
        <Button variant="neutral" size="neutral-lg">
          x
        </Button>
        <Button aria-labelledby="label-id" iconStart={<svg />} />
        <Button ref={createRef<HTMLButtonElement>()}>x</Button>
        <Button href="/a" ref={createRef<HTMLAnchorElement>()}>
          x
        </Button>
        <Button variant="destructive">x</Button>
        {/* @ts-expect-error 아이콘만 있으면 aria-label 이 필요하다 */}
        <Button iconStart={<svg />} />
        {/* @ts-expect-error neutral 에 brand size 를 쓸 수 없다 */}
        <Button variant="neutral" size="brand-small">
          x
        </Button>
        {/* @ts-expect-error glass 는 size 가 없다 */}
        <Button variant="glass" size="brand-small">
          x
        </Button>
        {/* @ts-expect-error destructive 는 size 가 없다 */}
        <Button variant="destructive" size="brand-small">
          x
        </Button>
        {/* @ts-expect-error text-link 는 size 가 없다 */}
        <Button variant="text-link" size="brand-small">
          x
        </Button>
        {/* @ts-expect-error outlined 는 size 가 없다 */}
        <Button variant="outlined" size="brand-small">
          x
        </Button>
        {/* @ts-expect-error 링크는 type 을 받지 않는다 */}
        <Button href="/a" type="submit">
          x
        </Button>
        {/* @ts-expect-error 링크는 pending 을 받지 않는다 */}
        <Button href="/a" pending>
          x
        </Button>
        {/* @ts-expect-error 링크는 disabled 를 받지 않는다 */}
        <Button href="/a" disabled>
          x
        </Button>
      </>
    );
    expect(typeChecks).toBeTypeOf('function');
  });
});
