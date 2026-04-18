import React from 'react';
import { render, screen } from '@testing-library/react';
import { HeroApresentationSection } from '@/components/HeroApresentationSection';

describe('HeroApresentationSection', () => {
  it('renders hero presentation and matches snapshot', () => {
    const { asFragment } = render(<HeroApresentationSection />);
    const heading = screen.queryByRole('heading') || screen.queryByText(/FIAP|Cursos|Landing/i);
    expect(heading).toBeTruthy();
    expect(asFragment()).toMatchSnapshot();
  });
});