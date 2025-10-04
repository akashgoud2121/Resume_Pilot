
'use client';

import { useRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { useClientIntersection } from '@/hooks/use-client-intersection';

type Animation =
  | 'scroll-reveal-up'
  | 'scroll-reveal-left'
  | 'scroll-reveal-right'
  | 'scroll-reveal-scale';

interface AnimationOptions {
  delay?: number;
  duration?: number;
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
    '--reveal-delay': delay ? `${delay}ms` : '0ms',
    '--reveal-duration': duration ? `${duration}ms` : '800ms',
  } as React.CSSProperties;

  return (
    <div
      ref={ref}
      className={cn(
        'scroll-reveal',
        animation,
        !isVisible && 'initial-hidden',
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
}
