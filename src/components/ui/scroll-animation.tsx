
"use client";

import { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

type Animation = 
  | 'animate-fadeInUp' 
  | 'animate-slideInFromLeft' 
  | 'animate-slideInFromRight' 
  | 'animate-scaleIn'
  | 'animate-dropIn';


interface ScrollAnimationProps {
  children: React.ReactNode;
  animation: Animation;
  className?: string;
  animationOptions?: {
    delay?: number;
    threshold?: number;
    triggerOnce?: boolean;
  };
}

const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  animation,
  className,
  animationOptions = {},
}) => {
  const { delay = 0, threshold = 0.1, triggerOnce = true } = animationOptions;
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, triggerOnce]);

  return (
    <div
      ref={ref}
      className={cn(className, isVisible ? animation : 'initial-hidden')}
      style={isVisible && delay > 0 ? { animationDelay: `${delay}ms` } : {}}
    >
      {children}
    </div>
  );
};

export default ScrollAnimation;
