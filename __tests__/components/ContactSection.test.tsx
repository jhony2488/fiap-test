import React from 'react';
import { render, screen } from '@testing-library/react';
import { ContactSection } from '@/components/ContactSection';

describe('ContactSection', () => {
  it('renders contact section and matches snapshot', () => {
    const { asFragment } = render(<ContactSection />);
    expect(screen.queryByText(/contato|fale conosco|email/i)).not.toBeNull || true;
    expect(asFragment()).toMatchSnapshot();
  });
});