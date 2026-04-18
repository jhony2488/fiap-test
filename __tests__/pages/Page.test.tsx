import React from 'react';
import { render, screen } from '@testing-library/react';
import Page from '@/app/page';

jest.mock('@/components', () => {
  const React = require('react');
  return {
    Header: (props: any) => <header data-testid="header">Header</header>,
    Footer: () => <footer data-testid="footer">Footer</footer>,
    ContactSection: () => <div data-testid="contact">Contact</div>,
    HeroImageBoxSection: (props: any) => <div data-testid="hero-image">HeroImage</div>,
    HeroApresentationSection: () => <div data-testid="hero-ap">HeroAp</div>,
    WaterScrollAnimation: () => <div data-testid="water">Water</div>,
    CoursesSection: (props: any) => <div data-testid="courses">Courses</div>,
    FaqSection: (props: any) => <div data-testid="faq">FAQ</div>,
  };
});

describe('Page integration', () => {
  it('renders top-level sections and matches snapshot', () => {
    const { asFragment } = render(<Page />);
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('hero-ap')).toBeInTheDocument();
    expect(screen.getByTestId('hero-image')).toBeInTheDocument();
    expect(screen.getByTestId('water')).toBeInTheDocument();
    expect(screen.getByTestId('courses')).toBeInTheDocument();
    expect(screen.getByTestId('faq')).toBeInTheDocument();
    expect(screen.getByTestId('contact')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});