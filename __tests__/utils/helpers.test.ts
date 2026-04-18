import { pad } from '@/utils/helpers';

describe('helpers.pad', () => {
  it('pads numbers with leading zeros to default size 3', () => {
    expect(pad(1)).toBe('001');
    expect(pad(12)).toBe('012');
    expect(pad(123)).toBe('123');
    expect(pad(1234)).toBe('1234');
  });

  it('pads numbers to custom size', () => {
    expect(pad(5, 1)).toBe('5');
    expect(pad(5, 2)).toBe('05');
    expect(pad(5, 4)).toBe('0005');
  });

  it('handles zero and negative numbers', () => {
    expect(pad(0)).toBe('000');
    expect(pad(-5, 3)).toBe('-05'); 
  });
});