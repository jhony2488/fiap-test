
export function pad(num: number, size = 3): string {
  let s = String(num);
  while (s.length < size) s = '0' + s;
  return s;
}

