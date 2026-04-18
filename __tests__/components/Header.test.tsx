// tests/components/Header.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Header } from '@/components/Header';

// Mock the hook module so we control breakpoints
jest.mock('@/hooks/useIsDesktop', () => ({
  useIsDesktop: jest.fn(),
}));

const { useIsDesktop } = require('@/hooks/useIsDesktop') as {
  useIsDesktop: jest.Mock;
};

describe('Header', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders logo and progress bar (mobile size)', () => {
    // Simulate mobile: isDesktop = false, isLongDesktop(false)
    useIsDesktop.mockImplementation((bp?: number) => {
      if (bp === 1900) return false; // isLongDesktop
      return false; // isDesktop
    });

    const { asFragment } = render(<Header progress={42.3} />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
    // the mocked next/image renders an <img> due to jest.setup
    const img = screen.getByRole('img', { name: /FIAP/i });
    expect(img).toBeInTheDocument();
    // progressbar
    const progress = screen.getByRole('progressbar');
    expect(progress).toHaveAttribute('aria-valuenow', String(Math.round(42.3)));
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders larger logo when desktop / long-desktop returned by hook', () => {
    // Simulate desktop and long-desktop
    useIsDesktop.mockImplementation((bp?: number) => {
      if (bp === 1900) return true; // long desktop
      return true; // desktop
    });

    const { asFragment } = render(<Header progress={12} />);
    const img = screen.getByRole('img', { name: /FIAP/i });
    expect(img).toBeInTheDocument();
    // snapshot for desktop
    expect(asFragment()).toMatchSnapshot();
  });
});