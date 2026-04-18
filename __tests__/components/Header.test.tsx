import React from 'react';
import { render, screen } from '@testing-library/react';
import { Header } from '@/components/Header';

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
    useIsDesktop.mockImplementation((bp?: number) => {
      if (bp === 1900) return false; 
      return false;
    });

    const { asFragment } = render(<Header progress={42.3} />);
    expect(screen.getByRole('banner')).toBeInTheDocument();

    const img = screen.getByRole('img', { name: /FIAP/i });
    expect(img).toBeInTheDocument();

    const progress = screen.getByRole('progressbar');
    expect(progress).toHaveAttribute('aria-valuenow', String(Math.round(42.3)));
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders larger logo when desktop / long-desktop returned by hook', () => {
    useIsDesktop.mockImplementation((bp?: number) => {
      if (bp === 1900) return true; 
      return true;
    });

    const { asFragment } = render(<Header progress={12} />);
    const img = screen.getByRole('img', { name: /FIAP/i });
    expect(img).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});