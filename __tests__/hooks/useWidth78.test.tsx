import React from 'react';
import { render, act } from '@testing-library/react';
import { useWidth78 } from '@/hooks/useWidth78';

function TestComp() {
  const val = useWidth78();
  return <div data-testid="w">{val}</div>;
}

describe('useWidth78', () => {
  it('calculates 78% of window.innerWidth and updates on resize', () => {
    (window as any).innerWidth = 1000;
    const { getByTestId } = render(<TestComp />);
    const el = getByTestId('w');
    expect(Number(el.textContent)).toBeCloseTo(1000 * 0.78, 0);

    (window as any).innerWidth = 800;
    act(() => {
      window.dispatchEvent(new Event('resize'));
    });

    expect(Number(el.textContent)).toBeCloseTo(800 * 0.78, 0);
  });
});