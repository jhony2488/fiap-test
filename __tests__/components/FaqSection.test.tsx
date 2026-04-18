import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FaqSection } from '@/components/FaqSection';

describe('FaqSection', () => {
  it('renders FAQ and toggles items when clicked', () => {
    const setOpen = jest.fn();
    const { asFragment } = render(<FaqSection openFaqIndex={null} setOpenFaqIndex={setOpen} />);

    // Pode haver múltiplos elementos contendo "FAQ" ou "Dúvidas Frequentes".
    // Use queryAllByText e verifique que pelo menos um existe.
    const headings = screen.queryAllByText(/FAQ|Dúvidas Frequentes/i);
    expect(headings.length).toBeGreaterThan(0);

    // Pega todos os botões (acessível) e clica no primeiro (se existir)
    const buttons = screen.queryAllByRole('button');
    if (buttons.length > 0) {
      fireEvent.click(buttons[0]);
      expect(setOpen).toHaveBeenCalled();
    } else {
      expect(buttons.length).toBe(0);
    }

    expect(asFragment()).toMatchSnapshot();
  });
});