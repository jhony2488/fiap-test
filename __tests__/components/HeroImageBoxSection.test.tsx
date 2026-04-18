import React from 'react';
import { render, screen } from '@testing-library/react';
import { HeroImageBoxSection } from '@/components/HeroImageBoxSection';

describe('HeroImageBoxSection', () => {
  it('renders with provided width78Porcent prop and matches snapshot', () => {
    const { asFragment } = render(<HeroImageBoxSection width78Porcent={1200} />);
    const img = screen.queryByRole('img');
    expect(img).toBeTruthy();
    expect(asFragment()).toMatchSnapshot();
  });
});