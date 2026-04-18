// tests/components/Footer.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Footer } from '@/components/Footer';

describe('Footer', () => {
  it('renders footer content and matches snapshot', () => {
    const { asFragment } = render(<Footer />);
    const footer = screen.getByRole('contentinfo') || screen.getByTestId?.('footer');
    expect(footer).toBeTruthy(); 
    expect(asFragment()).toMatchSnapshot();
  });
});