"use client";

import { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

type Animation = 
  | 'animate-fadeInUp' 
  | 'animate-slideInFromLeft' 
  | 'animate-slideInFromRight' 
  | 'animate-scaleIn';

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
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce && ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, triggerOnce]);

  const animationClass = isVisible ? animation : 'initial-hidden';
  const style = isVisible && delay > 0 ? { animationDelay: `${delay}ms` } : {};

  return (
    <div
      ref={ref}
      className={cn(className, animationClass)}
      style={style}
    >
      {children}
    </div>
  );
};

export default ScrollAnimation;
