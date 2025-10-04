
'use client';

import { useRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { useClientIntersection } from '@/hooks/use-client-intersection';

type Animation =
  | 'animate-fadeInUp'
  | 'animate-slideInFromLeft'
  | 'animate-slideInFromRight'
  | 'animate-scaleIn'
  | 'animate-dropIn';

interface AnimationOptions {
  delay?: number;
  duration?: number;
  triggerOnce?: boolean;
}

interface ScrollAnimationProps {
  children: ReactNode;
  animation: Animation;
  animationOptions?: AnimationOptions;
  className?: string;
}

export default function ScrollAnimation({
  children,
  animation,
  animationOptions = {},
  className,
}: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { delay, duration } = animationOptions;

  const isVisible = useClientIntersection(ref, {
    threshold: 0.1,
    triggerOnce: true,
  });

  const style = {
    '--animation-delay': delay ? `${delay}ms` : '0ms',
    '--animation-duration': duration ? `${duration}ms` : '800ms',
  } as React.CSSProperties;

  return (
    <div
      ref={ref}
      className={cn(
        'transition-opacity duration-1000',
        isVisible ? animation : 'opacity-0',
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
}

    