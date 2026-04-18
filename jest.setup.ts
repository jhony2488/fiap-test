import '@testing-library/jest-dom'; 
import 'whatwg-fetch';

jest.mock('next/image', () => {
  const React = require('react');
  return function Image(props: any) {
    const src = typeof props.src === 'string' ? props.src : props.src?.src ?? '';
    const { alt, width, height, style, className } = props;
    return React.createElement('img', {
      src,
      alt,
      width,
      height,
      style,
      className,
      'data-next-image-mock': true,
    });
  };
});

jest.mock('next/script', () => (props: any) => null);

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn(), replace: jest.fn(), prefetch: jest.fn().mockResolvedValue(undefined), pathname: '/' }),
}));

class IntersectionObserverMock {
  cb?: IntersectionObserverCallback;
  constructor(cb?: IntersectionObserverCallback) {
    this.cb = cb;
  }
  observe() { return null; }
  unobserve() { return null; }
  disconnect() { return null; }
}
Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: IntersectionObserverMock,
});
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  } as unknown as MediaQueryList),
});