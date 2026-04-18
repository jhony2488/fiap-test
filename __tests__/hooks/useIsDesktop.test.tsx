// tests/hooks/useIsDesktop.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import useIsDesktop from '@/hooks/useIsDesktop';

function TestComp(props: { bp?: number; defaultValue?: boolean; minVal?: number }) {
  const isDesktop = useIsDesktop(props.bp ?? 900, props.defaultValue ?? false, props.minVal);
  return <div data-testid="d">{isDesktop ? 'desktop' : 'not'}</div>;
}

describe('useIsDesktop', () => {
  const originalMatchMedia = window.matchMedia;

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
    jest.restoreAllMocks();
  });

  it('returns true when matchMedia matches and innerWidth meets minValue', () => {
    window.matchMedia = (q: string) => ({ matches: true, addEventListener: jest.fn(), removeEventListener: jest.fn() } as any);
    (window as any).innerWidth = 1200;
    const { getByTestId } = render(<TestComp bp={900} minVal={1000} />);
    expect(getByTestId('d').textContent).toBe('desktop');
  });

  it('returns false when matchMedia false', () => {
    window.matchMedia = (q: string) => ({ matches: false, addEventListener: jest.fn(), removeEventListener: jest.fn() } as any);
    (window as any).innerWidth = 1400;
    const { getByTestId } = render(<TestComp bp={900} minVal={1000} />);
    expect(getByTestId('d').textContent).toBe('not');
  });
});