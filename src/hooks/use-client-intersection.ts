
'use client';

import { useState, useEffect, type RefObject } from 'react';

interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  triggerOnce?: boolean;
}

export function useClientIntersection(
  ref: RefObject<Element>,
  options: IntersectionObserverOptions = {}
): boolean {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // IntersectionObserver is a browser API. It's not available on the server.
    if (typeof window.IntersectionObserver === 'undefined') {
      // Fallback for server-side rendering or old browsers
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (options.triggerOnce) {
            observer.unobserve(entry.target);
          }
        } else {
            if (!options.triggerOnce) {
                setIsVisible(false);
            }
        }
      },
      {
        root: options.root,
        rootMargin: options.rootMargin,
        threshold: options.threshold,
      }
    );

    const currentElement = ref.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [ref, options]);

  return isVisible;
}

    