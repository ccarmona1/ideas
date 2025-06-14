import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Hermanos from './Hermanos';

describe('Hermanos Component', () => {
  it('should render without crashing', async () => {
    render(<Hermanos></Hermanos>);
    screen.debug();

    const button = screen.getByText('Enviar a B');
    expect(button).toBeInTheDocument();
    await userEvent.click(button);

    screen.debug();

    expect(
      screen.getByText((content) => content.includes('Enviar a B'))
    ).toBeInTheDocument();
  });
});
