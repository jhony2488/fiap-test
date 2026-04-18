// jest.setup.ts
import '@testing-library/jest-dom'; // import correto (adiciona os matchers)
import 'whatwg-fetch';

// Mock next/image para testes (retorna <img>)
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

// Mock next/script como no-op
jest.mock('next/script', () => (props: any) => null);

// Mock next/navigation se necessário
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn(), replace: jest.fn(), prefetch: jest.fn().mockResolvedValue(undefined), pathname: '/' }),
}));

// Minimal IntersectionObserver mock
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

// Basic matchMedia mock (tests can override)
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