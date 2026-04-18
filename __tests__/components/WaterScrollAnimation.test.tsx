import React from 'react';
import { render } from '@testing-library/react';
import { WaterScrollAnimation } from '@/components/WaterScrollAnimation';

describe('WaterScrollAnimation', () => {
  it('renders without crashing and matches snapshot', () => {
    const { asFragment } = render(<WaterScrollAnimation />);
    expect(asFragment()).toMatchSnapshot();
  });
});