import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// 임시: 테스트 환경(jsdom·Testing Library·user-event·jest-dom) 확인용 예시. 컴포넌트 테스트가 생기면 지운다.
describe('테스트 환경', () => {
  it('버튼을 키보드로 누르면 핸들러가 호출된다', async () => {
    const onClick = vi.fn();
    render(<button onClick={onClick}>확인</button>);
    await userEvent.tab();
    expect(screen.getByRole('button', { name: '확인' })).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
