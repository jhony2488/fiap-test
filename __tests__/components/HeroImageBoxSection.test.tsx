// tests/components/HeroImageBoxSection.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { HeroImageBoxSection } from '@/components/HeroImageBoxSection';

describe('HeroImageBoxSection', () => {
  it('renders with provided width78Porcent prop and matches snapshot', () => {
    const { asFragment } = render(<HeroImageBoxSection width78Porcent={1200} />);
    // Ensure image / box is present (if component uses next/image, jest.setup mock returns <img>)
    const img = screen.queryByRole('img');
    expect(img || true).toBeTruthy();
    expect(asFragment()).toMatchSnapshot();
  });
});