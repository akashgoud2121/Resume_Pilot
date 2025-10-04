
"use client";

import { useRef, useEffect, useState, useMemo } from 'react';
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

  const animationClass = useMemo(() => {
    if (isVisible) {
      return animation;
    }
    // Only apply initial-hidden if not visible. Once visible, it stays that way.
    return 'initial-hidden';
  }, [isVisible, animation]);
  
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
