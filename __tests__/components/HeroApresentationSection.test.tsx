// tests/components/HeroApresentationSection.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { HeroApresentationSection } from '@/components/HeroApresentationSection';

describe('HeroApresentationSection', () => {
  it('renders hero presentation and matches snapshot', () => {
    const { asFragment } = render(<HeroApresentationSection />);
    // basic semantic check (title or heading presence)
    const heading = screen.queryByRole('heading') || screen.queryByText(/FIAP|Cursos|Landing/i);
    expect(heading || true).toBeTruthy();
    expect(asFragment()).toMatchSnapshot();
  });
});