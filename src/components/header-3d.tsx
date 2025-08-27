
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, ArrowRight, Briefcase, GraduationCap, Award, Sparkles } from 'lucide-react';
import ScrollAnimation from './ui/scroll-animation';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const SkillBar = ({ skill, percentage }: { skill: string, percentage: string }) => (
  <div className="w-full">
    <p className="text-xs text-left text-white/70 mb-1">{skill}</p>
    <div className="h-1.5 w-full bg-white/10 rounded-full">
      <div className="h-1.5 bg-teal-400 rounded-full" style={{ width: percentage }}></div>
    </div>
  </div>
);

export function Header3d() {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const headerRef = useRef<HTMLElement>(null);

  const onMouseMove = (e: MouseEvent) => {
    if (!headerRef.current) return;
    const rect = headerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const x = (mouseY / height - 0.5) * -30; // Rotate on X-axis
    const y = (mouseX / width - 0.5) * 30;  // Rotate on Y-axis
    setRotate({ x, y });
  };

  const onMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };
  
  useEffect(() => {
    const currentRef = headerRef.current;
    if (currentRef) {
      currentRef.addEventListener('mousemove', onMouseMove);
      currentRef.addEventListener('mouseleave', onMouseLeave);
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('mousemove', onMouseMove);
        currentRef.removeEventListener('mouseleave', onMouseLeave);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section 
        ref={headerRef}
        className="relative min-h-[90vh] lg:min-h-[700px] flex items-center justify-center text-center p-4 overflow-hidden"
    >
      <div className="absolute inset-0 bg-slate-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] -z-20"></div>
      
      <div className="relative z-10 w-full flex flex-col-reverse lg:flex-row items-center justify-center lg:justify-between max-w-6xl mx-auto py-16">
        {/* Left: Text Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left mt-8 lg:mt-0">
          <ScrollAnimation animation="animate-fadeInUp">
            <div className="inline-flex items-center gap-2 mb-4">
              <Sparkles className="text-primary h-6 w-6" />
              <h2 className="text-5xl font-calligraphy text-primary">ResumePilot</h2>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
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
        <div 
          className="w-full lg:w-1/2 flex items-center justify-center group"
          style={{ perspective: '1000px' }}
        >
            <div 
                className="relative w-[300px] h-[420px] md:w-[350px] md:h-[490px] transition-transform duration-300 ease-out [transform-style:preserve-3d] animate-float"
                style={{ transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)` }}
            >
                {/* Front Side */}
                <div className="absolute w-full h-full bg-white/5 rounded-lg border border-white/10 shadow-2xl shadow-blue-500/10 backdrop-blur-md p-6 text-left [backface-visibility:hidden]">
                  <div className="text-center border-b border-white/10 pb-3">
                    <h3 className="text-4xl font-calligraphy font-bold text-white">Alexandria Quill</h3>
                    <p className="text-teal-400">Software Engineer</p>
                  </div>
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold text-white/80 mb-2">SUMMARY</h4>
                    <p className="text-xs text-white/60">Creative and detail-oriented Software Engineer with a passion for developing innovative solutions.</p>
                  </div>
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold text-white/80 mb-3">SKILLS</h4>
                    <div className="space-y-3">
                      <SkillBar skill="JavaScript & React" percentage="90%" />
                      <SkillBar skill="Node.js & Express" percentage="85%" />
                      <SkillBar skill="UI/UX Design" percentage="75%" />
                    </div>
                  </div>
                </div>

                {/* Back Side */}
                <div className="absolute w-full h-full bg-white/10 rounded-lg border border-white/20 shadow-2xl shadow-blue-500/20 backdrop-blur-lg p-6 text-left [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <div className="border-b border-white/10 pb-3">
                    <h4 className="text-lg font-bold text-white flex items-center gap-2"><Briefcase size={18}/> Experience</h4>
                  </div>
                  <div className="mt-3 text-xs space-y-2 text-white/80">
                      <div>
                          <p className="font-semibold">Senior Developer - TechCorp</p>
                          <p className="text-white/50 text-[10px]">2020 - Present</p>
                      </div>
                      <div>
                          <p className="font-semibold">Junior Developer - Innovate LLC</p>
                          <p className="text-white/50 text-[10px]">2018 - 2020</p>
                      </div>
                  </div>
                  <div className="mt-4 border-b border-white/10 pb-3">
                    <h4 className="text-lg font-bold text-white flex items-center gap-2"><GraduationCap size={18}/> Education</h4>
                  </div>
                  <div className="mt-3 text-xs text-white/80">
                      <p className="font-semibold">B.S. in Computer Science</p>
                      <p className="text-white/50 text-[10px]">State University</p>
                  </div>
                  <div className="mt-4 border-b border-white/10 pb-3">
                    <h4 className="text-lg font-bold text-white flex items-center gap-2"><Award size={18}/> Certifications</h4>
                  </div>
                  <div className="mt-3 text-xs text-white/80">
                      <p className="font-semibold">Certified Kubernetes Developer</p>
                  </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
