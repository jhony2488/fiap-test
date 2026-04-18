'use client';

import { useEffect, useState } from 'react';

/**
 * Hook para detectar se a viewport está em tamanho "desktop".
 *
 * @param breakpoint - largura mínima (em px) considerada desktop. Default: 900
 * @param defaultValue - valor inicial usado no SSR (evita hydration mismatch). Default: false
 * @param minValueDesktop - opcional: valor mínimo adicional (px) que também deve ser satisfeito (window.innerWidth >= minValueDesktop).
 * @returns boolean indicando se a tela é desktop (>= breakpoint e, se fornecido, >= minValueDesktop)
 */
export function useIsDesktop(
  breakpoint: number = 900,
  defaultValue: boolean = false,
  minValueDesktop?: number
): boolean {
  const [isDesktop, setIsDesktop] = useState<boolean>(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia === 'undefined') {
      return defaultValue;
    }
    const mqMatches = window.matchMedia(`(min-width: ${breakpoint}px)`).matches;
    const meetsMin = typeof minValueDesktop === 'number' ? window.innerWidth >= minValueDesktop : true;
    return mqMatches && meetsMin;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia === 'undefined') {
      return;
    }

    const mq = window.matchMedia(`(min-width: ${breakpoint}px)`);

    const evaluate = () => {
      const mqMatches = mq.matches;
      const meetsMin = typeof minValueDesktop === 'number' ? window.innerWidth >= minValueDesktop : true;
      setIsDesktop(Boolean(mqMatches && meetsMin));
    };

    // initial evaluation (in case defaultValue differs)
    evaluate();

    // media query listener
    const handleMqChange = (ev: MediaQueryListEvent | MediaQueryList) => {
      // ev.matches exists in both
      const mqMatches = Boolean((ev as MediaQueryListEvent).matches ?? (ev as MediaQueryList).matches);
      const meetsMin = typeof minValueDesktop === 'number' ? window.innerWidth >= minValueDesktop : true;
      setIsDesktop(mqMatches && meetsMin);
    };

    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', handleMqChange as EventListener);
    } else if (typeof mq.addListener === 'function') {
      mq.addListener(handleMqChange as (ev: MediaQueryListEvent) => void);
    }

    // If a minValueDesktop is provided we also need to listen to resize,
    // because matchMedia won't necessarily fire when innerWidth crosses that custom threshold
    const handleResize = () => {
      if (typeof minValueDesktop === 'number') {
        // re-evaluate both conditions
        evaluate();
      }
    };

    if (typeof minValueDesktop === 'number') {
      window.addEventListener('resize', handleResize, { passive: true });
    }

    return () => {
      if (typeof mq.removeEventListener === 'function') {
        mq.removeEventListener('change', handleMqChange as EventListener);
      } else if (typeof mq.removeListener === 'function') {
        mq.removeListener(handleMqChange as (ev: MediaQueryListEvent) => void);
      }
      if (typeof minValueDesktop === 'number') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, [breakpoint, minValueDesktop, defaultValue]);

  return isDesktop;
}

export default useIsDesktop;