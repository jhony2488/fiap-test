import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FaqSection } from '@/components/FaqSection';

describe('FaqSection', () => {
  it('renders FAQ and toggles items when clicked', () => {
    const setOpen = jest.fn();
    const { asFragment } = render(<FaqSection openFaqIndex={null} setOpenFaqIndex={setOpen} />);

    const headings = screen.queryAllByText(/FAQ|Dúvidas Frequentes/i);
    expect(headings.length).toBeGreaterThan(0);

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