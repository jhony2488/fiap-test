export function pad(num: number, size = 3): string {
  const isNegative = num < 0 || Object.is(num, -0);
  let s = String(Math.abs(num));

  const target = isNegative ? Math.max(0, size - 1) : size;

  while (s.length < target) s = '0' + s;

  return isNegative ? '-' + s : s;
}