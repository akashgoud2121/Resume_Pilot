'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, ArrowRight } from 'lucide-react';
import ScrollAnimation from './ui/scroll-animation';
import { cn } from '@/lib/utils';

export function Header3d() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (event.clientX - rect.left - rect.width / 2) / (rect.width / 2);
        const y = (event.clientY - rect.top - rect.height / 2) / (rect.height / 2);
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const resumeStyle = {
    transform: `rotateY(${mousePosition.x * 20}deg) rotateX(${-mousePosition.y * 20}deg) translateZ(0)`,
  };

  return (
    <section 
        ref={containerRef}
        className="relative h-[90vh] min-h-[700px] flex items-center justify-center text-center p-4 overflow-hidden"
        style={{ perspective: '1000px' }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 animate-gradient-xy bg-[200%_auto]"></div>
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-5"></div>
      
      <div className="relative z-10 w-full flex flex-col-reverse lg:flex-row items-center justify-center lg:justify-between max-w-6xl mx-auto">
        {/* Left: Text Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left mt-8 lg:mt-0">
          <ScrollAnimation animation="animate-fadeInUp">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
              Create the Perfect Resume with Ease
            </h1>
          </ScrollAnimation>
          <ScrollAnimation animation="animate-fadeInUp" animationOptions={{ delay: 300 }}>
            <p className="mt-4 md:mt-6 text-lg md:text-xl max-w-2xl text-muted-foreground mx-auto lg:mx-0">
              Choose from 8 professional templates, upload your resume, or enter your details manually.
            </p>
          </ScrollAnimation>
          <ScrollAnimation animation="animate-fadeInUp" animationOptions={{ delay: 600 }}>
            <div className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Button size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 transition-transform hover:scale-105">
                <Upload className="mr-2" /> Upload Resume
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-white border-white/50 hover:bg-white/10 hover:text-white transition-transform hover:scale-105">
                Enter Manually <ArrowRight className="ml-2" />
              </Button>
            </div>
          </ScrollAnimation>
        </div>
        
        {/* Right: 3D Resume */}
        <div className="w-full lg:w-1/2 flex items-center justify-center">
            <div 
                className="relative w-[300px] h-[420px] md:w-[350px] md:h-[490px] transition-transform duration-300 ease-out" 
                style={{ transformStyle: 'preserve-3d', ...resumeStyle }}
            >
                <div 
                    className={cn(
                        "w-full h-full bg-white/5 rounded-lg border border-white/10 shadow-2xl shadow-blue-500/10 backdrop-blur-md",
                        "transition-all duration-300 ease-out",
                        "animate-[float_6s_ease-in-out_infinite]" // CSS animation
                    )}
                >
                    {/* Fake Resume Content */}
                    <div className="p-6 md:p-8 text-left">
                        <div className="w-2/4 h-5 bg-white/20 rounded-sm"></div>
                        <div className="w-3/4 h-3 bg-white/10 rounded-sm mt-3"></div>
                        <div className="w-full h-2 bg-white/10 rounded-sm mt-8"></div>
                        <div className="w-full h-2 bg-white/10 rounded-sm mt-2"></div>
                        <div className="w-3/4 h-2 bg-white/10 rounded-sm mt-2"></div>
                        <div className="w-1/2 h-2 bg-white/10 rounded-sm mt-2"></div>

                        <div className="w-1/3 h-3 bg-white/10 rounded-sm mt-10"></div>
                        <div className="w-full h-2 bg-white/10 rounded-sm mt-4"></div>
                        <div className="w-3/4 h-2 bg-white/10 rounded-sm mt-2"></div>
                        <div className="w-full h-2 bg-white/10 rounded-sm mt-2"></div>

                        <div className="w-1/3 h-3 bg-white/10 rounded-sm mt-10"></div>
                        <div className="w-full h-2 bg-white/10 rounded-sm mt-4"></div>
                        <div className="w-3/4 h-2 bg-white/10 rounded-sm mt-2"></div>

                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
