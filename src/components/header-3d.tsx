
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, ArrowRight, CheckCircle, FileText, Download, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { ChartContainer, ChartConfig, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Pie, PieChart, Cell } from 'recharts';

const chartConfig = {
  score: {
    label: 'ATS Score',
    color: 'hsl(var(--primary))'
  },
  rest: {
    label: 'Remaining',
  },
} satisfies ChartConfig;

const SkillBar = ({ skill, percentage }: { skill: string, percentage: string }) => (
  <div className="w-full">
    <p className="text-xs text-left text-gray-400 mb-1">{skill}</p>
    <div className="h-1.5 w-full bg-gray-200 rounded-full">
      <div className="h-1.5 bg-teal-400 rounded-full" style={{ width: percentage }}></div>
    </div>
  </div>
);

export function Header3d() {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const headerRef = useRef<HTMLElement>(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setScore(88), 500);
    return () => clearTimeout(timer);
  }, []);

  const chartData = [
    { name: 'score', value: score, fill: 'var(--color-score)' },
    { name: 'rest', value: 100 - score, fill: 'hsl(var(--primary) / 0.1)' },
  ];

  const onMouseMove = (e: MouseEvent) => {
    const currentRef = headerRef.current;
    if (!currentRef) return;
    
    const rect = currentRef.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const x = (mouseY / height - 0.5) * -20;
    const y = (mouseX / width - 0.5) * 20;
    
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
        className="relative min-h-screen flex items-center justify-center text-center p-4 overflow-hidden"
    >
      <div className="absolute inset-0 bg-slate-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] -z-20"></div>
      
      <div className="relative z-10 w-full flex flex-col items-center justify-center max-w-7xl mx-auto py-16">
        
        <div className="text-center mb-12">
          <div className="initial-hidden animate-dropIn">
            <h1 className="text-5xl md:text-6xl font-heading font-bold tracking-tight text-white inline-flex items-center gap-3">
              ResumePilot
            </h1>
          </div>
          <div className="initial-hidden animate-fadeInUp animation-delay-300">
            <h2 className="mt-2 text-xl md:text-2xl font-medium tracking-tight text-white/80">
              Create the Perfect Resume with Ease
            </h2>
          </div>
        </div>
        
        <div className="w-full flex flex-col lg:flex-row items-center justify-around gap-8">

          {/* Left Content */}
          <div className="w-full lg:w-1/4 initial-hidden animate-slideInFromLeft animation-delay-500 text-left">
            <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-full text-primary"><Sparkles size={20}/></div>
                  <div>
                    <h3 className="font-semibold text-white">AI-Powered Parsing</h3>
                    <p className="text-muted-foreground text-sm">Instantly extract data from any resume format.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-full text-primary"><FileText size={20}/></div>
                  <div>
                    <h3 className="font-semibold text-white">ATS-Friendly Templates</h3>
                    <p className="text-muted-foreground text-sm">Beat the bots with professionally designed templates.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-full text-primary"><Download size={20}/></div>
                  <div>
                    <h3 className="font-semibold text-white">Instant Download</h3>
                    <p className="text-muted-foreground text-sm">Get your job-ready resume in PDF format in seconds.</p>
                  </div>
                </li>
            </ul>
             <div className="mt-12 initial-hidden animate-fadeInUp animation-delay-700">
              <div className="flex flex-col sm:flex-row items-center justify-start gap-4">
                <Button size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 transition-transform hover:scale-105">
                  <Upload className="mr-2" /> Upload Resume
                </Button>
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-white border-white/50 hover:bg-white/10 hover:text-white transition-transform hover:scale-105">
                  Enter Manually <ArrowRight className="ml-2" />
                </Button>
              </div>
            </div>
          </div>

          {/* Middle: 3D Resume */}
          <div 
            className="w-full max-w-[350px] flex-shrink-0 flex items-center justify-center order-first lg:order-none my-8 lg:my-0"
            style={{ perspective: '1000px' }}
          >
              <div 
                  className="relative w-[300px] h-[420px] md:w-[350px] md:h-[490px] transition-transform duration-300 ease-out [transform-style:preserve-3d] animate-float group"
                  style={{ transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)` }}
              >
                  {/* Front Side */}
                  <div className="absolute w-full h-full bg-white rounded-lg border border-gray-200 shadow-2xl p-6 text-left transition-transform duration-700 [backface-visibility:hidden] group-hover:[transform:rotateY(180deg)]">
                    <div className="text-center border-b border-gray-200 pb-3">
                      <h3 className="text-4xl font-heading font-bold text-gray-800">Alexandria Quill</h3>
                      <p className="text-teal-500">Software Engineer</p>
                    </div>
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold text-gray-600 mb-2">SUMMARY</h4>
                      <p className="text-xs text-gray-500">Creative and detail-oriented Software Engineer with a passion for developing innovative solutions.</p>
                    </div>
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold text-gray-600 mb-3">SKILLS</h4>
                      <div className="space-y-3">
                        <SkillBar skill="JavaScript & React" percentage="90%" />
                        <SkillBar skill="Node.js & Express" percentage="85%" />
                        <SkillBar skill="UI/UX Design" percentage="75%" />
                      </div>
                    </div>
                     <p className="text-center text-xs text-gray-400 absolute bottom-4 left-1/2 -translate-x-1/2">Hover to flip</p>
                  </div>

                  {/* Back Side */}
                  <div className="absolute w-full h-full bg-white rounded-lg border border-gray-200 shadow-2xl p-6 text-left transition-transform duration-700 [backface-visibility:hidden] [transform:rotateY(180deg)] group-hover:[transform:rotateY(0deg)]">
                    <div className="text-center border-b border-gray-200 pb-3">
                      <h3 className="text-2xl font-bold text-gray-800">Key Sections</h3>
                    </div>
                     <ul className="space-y-3 text-sm text-gray-600 mt-4">
                        <li className="flex items-center gap-3 text-gray-700"><CheckCircle size={16} className="text-teal-500"/> Professional Summary</li>
                        <li className="flex items-center gap-3 text-gray-700"><CheckCircle size={16} className="text-teal-500"/> Skills & Keywords</li>
                        <li className="flex items-center gap-3 text-gray-700"><CheckCircle size={16} className="text-teal-500"/> Work Experience</li>
                        <li className="flex items-center gap-3 text-gray-700"><CheckCircle size={16} className="text-teal-500"/> Education</li>
                        <li className="flex items-center gap-3 text-gray-700"><CheckCircle size={16} className="text-teal-500"/> Projects & Achievements</li>
                    </ul>
                  </div>
              </div>
          </div>

          {/* Right Content */}
          <div className="w-full lg:w-1/4 initial-hidden animate-slideInFromRight animation-delay-500 text-left">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-6">
                    <h4 className="font-semibold text-white text-center mb-2">ATS Score</h4>
                     <ChartContainer config={chartConfig} className="w-full aspect-square h-[180px] mx-auto">
                            <PieChart>
                                <defs>
                                  <linearGradient id="gradientFill" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--color-score)" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="var(--color-score)" stopOpacity={0.2}/>
                                  </linearGradient>
                                </defs>
                                <ChartTooltip content={<ChartTooltipContent hideLabel hideIndicator />} />
                                <Pie 
                                    data={chartData} 
                                    dataKey="value" 
                                    nameKey="name"
                                    cx="50%" 
                                    cy="50%" 
                                    innerRadius={60} 
                                    outerRadius={80} 
                                    startAngle={90}
                                    endAngle={90 + (score / 100) * 360}
                                    cornerRadius={5}
                                    paddingAngle={-10}
                                >
                                     <Cell key="score" fill="url(#gradientFill)" stroke="var(--color-score)" />
                                     <Cell key="rest" className="fill-transparent stroke-transparent" />
                                </Pie>
                                <Pie 
                                    data={[{value: 100}]}
                                    dataKey="value"
                                    cx="50%" 
                                    cy="50%" 
                                    innerRadius={60} 
                                    outerRadius={80} 
                                    startAngle={90}
                                    endAngle={450}
                                    stroke="hsla(var(--primary) / 0.1)"
                                    strokeWidth={2}
                                    fill="transparent"
                                />
                            </PieChart>
                            <div className="absolute inset-0 flex flex-col items-center justify-center" aria-hidden="true">
                                <span className="text-4xl font-bold text-white transition-all duration-1000">{score}</span>
                                <span className="text-xs text-muted-foreground">Excellent</span>
                            </div>
                        </ChartContainer>
                        <p className="text-xs text-center text-muted-foreground mt-2">This resume is highly optimized for Applicant Tracking Systems.</p>
                </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
