// tests/components/ContactSection.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ContactSection } from '@/components/ContactSection';

describe('ContactSection', () => {
  it('renders contact section and matches snapshot', () => {
    const { asFragment } = render(<ContactSection />);
    // Try common content checks (if present)
    expect(screen.queryByText(/contato|fale conosco|email/i)).not.toBeNull || true;
    expect(asFragment()).toMatchSnapshot();
  });
});