

'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import {
  ArrowRight,
  Award,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  ClipboardPaste,
  Download,
  FileText,
  MousePointerClick,
  Sparkles,
  Twitter,
  Linkedin,
  Github,
  Upload,
  Cpu,
  Gauge,
  LayoutTemplate,
  Mail,
  Phone,
  GraduationCap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel';
import { templates } from '@/lib/templates';
import { cn } from '@/lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import ScrollAnimation from '@/components/ui/scroll-animation';
import { Header3d } from '@/components/header-3d';
import type { ResumeData } from '@/lib/types';
import { ResumePreview } from '@/components/resume-preview';
import { User } from 'lucide-react';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Pie, PieChart } from 'recharts';


const testimonials = [
  {
    name: 'Sarah J.',
    title: 'Software Engineer',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    text: "Resume Pilot's AI parsing is a game-changer. It extracted everything from my old PDF perfectly, saving me hours of work. The templates are clean, modern, and professional.",
  },
  {
    name: 'Michael B.',
    title: 'Product Manager',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705d',
    text: 'I was struggling to get my resume noticed. The ATS-friendly templates from Resume Pilot made a huge difference. I landed three interviews in the first week!',
  },
  {
    name: 'Jessica L.',
    title: 'UX Designer',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706d',
    text: 'As a designer, aesthetics are important to me. Resume Pilot offers a great balance of beautiful design and functionality. The "Creative" template is my favorite.',
  },
  {
    name: 'David R.',
    title: 'Data Scientist',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026707d',
    text: 'The process was incredibly simple and fast. From upload to download, it took less than 10 minutes to have a polished, professional resume ready to go. Highly recommended!',
  },
];


const faqItems = [
  {
    question: "How does the AI parsing work?",
    answer: "Our AI is trained to understand the structure of a resume. It intelligently extracts key information like your contact details, work experience, skills, and education, and automatically populates it into our system, saving you time and effort."
  },
  {
    question: "Are the templates ATS-friendly?",
    answer: "Yes! All of our templates are designed with Applicant Tracking Systems (ATS) in mind. They use clean, parsable structures to ensure your resume gets past the bots and in front of human recruiters."
  },
  {
    question: "Can I customize the templates?",
    answer: "While the core structure is optimized for ATS, you can easily input your own information and see it reflected in the chosen template. We handle the formatting to ensure it remains professional and effective."
  },
  {
    question: "What file formats can I upload?",
    answer: "Currently, our system is optimized for PDF, DOC, and DOCX files. For best results, we recommend uploading a PDF file to ensure accurate text extraction."
  }
];

const ParsedDataItem = ({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) => (
  <div>
    <p className="text-xs text-muted-foreground font-semibold flex items-center gap-1.5">
      {icon}
      {label}
    </p>
    <p className="text-sm text-foreground mt-0.5">{value}</p>
  </div>
);

const ShineEffect = ({ x, y }: { x: number; y: number }) => (
  <div
    className="pointer-events-none absolute inset-0 z-20 rounded-xl transition-opacity duration-500 group-hover:opacity-80"
    style={{
      background: `radial-gradient(
        200px circle at ${x}px ${y}px,
        rgba(255, 255, 255, 0.2),
        transparent
      )`,
      opacity: x > 0 && y > 0 ? 1 : 0,
      transition: 'opacity 0.2s ease-out',
    }}
  />
);


export default function Home() {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Professional', 'Modern & Clean', 'Structured', 'Elegant & Stylish', 'Simple & To-the-point', 'Bold & Visual', 'Experience-focused', 'Fresh & Contemporary'];
  
  const filteredTemplates = templates.filter(
    (template) => filter === 'All' || template.category === filter
  );

  const sampleResumeData: ResumeData = {
    name: 'Alexandria Quill',
    email: 'alex.quill@email.com',
    mobileNumber: '555-123-4567',
    githubLink: 'https://github.com/alexquill',
    linkedinLink: 'https://linkedin.com/in/alexquill',
    professionalSummary: 'Innovative and results-driven Software Engineer with over 5 years of experience in designing, developing, and deploying scalable and efficient web applications. Proficient in full-stack development with a strong emphasis on front-end technologies and user experience. Passionate about creating elegant, maintainable code and working in collaborative, agile environments to solve complex problems and deliver high-quality software. Proven ability in leading projects, mentoring junior developers, and driving technical excellence to achieve business goals.',
    coreSkills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker', 'AWS', 'TDD', 'CI/CD', 'GraphQL', 'Kubernetes', 'Next.js', 'System Design', 'Microservices', 'Agile Methodologies'],
    education: [
      {
        institution: 'University of Technology',
        degree: 'B.S. in Computer Science',
        dates: '2014 - 2018',
      },
    ],
    experience: [
      {
        title: 'Senior Software Engineer',
        company: 'Innovatech Solutions',
        dates: '2020 - Present',
        description: 'Lead developer for the flagship SaaS product, responsible for the architecture, implementation, and maintenance of new features.\n- Architected and implemented a new microservices-based backend using Node.js and Docker, resulting in a 40% performance increase and improved scalability to handle a 200% growth in user traffic.\n- Mentored a team of 4 junior developers, fostering a culture of growth and best practices through code reviews, pair programming, and weekly knowledge-sharing sessions.\n- Championed the adoption of Test-Driven Development (TDD) with Jest and React Testing Library, which increased code coverage by 30% and reduced critical bugs in production by 50%.',
      },
      {
        title: 'Software Engineer',
        company: 'CodeCrafters Inc.',
        dates: '2018 - 2020',
        description: 'Developed and maintained full-stack features for a high-traffic e-commerce platform using React and Node.js.\n- Collaborated with UX/UI designers to create a seamless and responsive user experience, boosting user engagement by 15% and decreasing bounce rate.\n- Implemented a new payment gateway integration (Stripe), which expanded customer payment options and increased conversion rates by 5%.\n- Optimized application performance by identifying and fixing memory leaks, which reduced server response times by 20%.',
      },
    ],
    projects: [
      {
        name: 'Open Source Contributor - React-Query',
        description: 'Active contributor to a popular open-source data-fetching library. Focused on improving accessibility by implementing ARIA standards and enhancing documentation for new users.',
      },
      {
        name: 'Personal Portfolio Website',
        description: 'Designed and built a personal portfolio using Next.js and Tailwind CSS, showcasing various projects and skills. Deployed on Vercel with a CI/CD pipeline.',
      },
       {
        name: 'Real-time Chat Application',
        description: 'Developed a real-time chat application using WebSockets, Node.js, and React, allowing users to communicate instantly in public or private chat rooms.',
      },
    ],
    achievements: [
      { value: 'Awarded "Innovator of the Year" at Innovatech Solutions, 2022' },
      { value: 'Speaker at "React Forward" Conference 2021 on Modern Frontend Architectures' },
      { value: 'Published an article on "Scalable State Management with Redux" in a well-known tech blog.' },
    ],
    certifications: [
      { value: 'AWS Certified Developer - Associate' },
      { value: 'Certified Kubernetes Application Developer (CKAD)' },
      { value: 'Professional Scrum Master I (PSM I)'},
    ],
  };

  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [selectedSnap, setSelectedSnap] = useState(0);

  const onSelect = useCallback((api: CarouselApi) => {
    if (!api) return;
    setSelectedSnap(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!carouselApi) return;
    onSelect(carouselApi);
    carouselApi.on('select', onSelect);
    return () => {
      carouselApi.off('select', onSelect);
    };
  }, [carouselApi, onSelect]);

  const [mousePos, setMousePos] = useState({ x: -1, y: -1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };
  const handleMouseLeave = () => {
    setMousePos({ x: -1, y: -1 });
  };

  const [score, setScore] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => setScore(96), 500);
    return () => clearTimeout(timer);
  }, []);

  const chartConfig = {
    score: { label: 'Score', color: 'hsl(var(--primary))' },
    rest: { label: 'Rest' },
  } satisfies ChartConfig;

  const chartData = [
    { name: 'score', value: score, fill: 'var(--color-score)' },
    { name: 'rest', value: 100 - score, fill: 'hsl(var(--primary) / 0.1)' },
  ];


  return (
    <div className="dark bg-background text-foreground min-h-screen">
      <main className="overflow-x-hidden">
        {/* 3D Header Section */}
        <Header3d />

        {/* Unlock Your Potential Section */}
        <section className="py-20 md:py-28 px-4 bg-gray-900/50">
            <div className="container mx-auto max-w-6xl">
                <ScrollAnimation animation="animate-fadeInUp" className="text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">Unlock Your Career Potential</h2>
                    <p className="mt-4 text-muted-foreground max-w-3xl mx-auto">
                        Don't just build a resume—build your future. Resume Pilot combines cutting-edge AI with professional design to give you the ultimate advantage in today's competitive job market.
                    </p>
                </ScrollAnimation>
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <ScrollAnimation animation="animate-fadeInUp" animationOptions={{delay: 200}}>
                        <Card className="bg-card/50 border-white/10 h-full transition-all duration-300 hover:scale-105 hover:border-blue-400/50">
                            <CardContent className="p-8">
                                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-500/10 text-blue-400 mb-6 mx-auto">
                                    <Sparkles className="h-8 w-8" />
                                </div>
                                <h3 className="text-xl font-semibold text-white">Craft with AI</h3>
                                <p className="mt-2 text-muted-foreground">Let our intelligent tools parse, score, and optimize your resume content for maximum impact.</p>
                            </CardContent>
                        </Card>
                    </ScrollAnimation>
                    <ScrollAnimation animation="animate-fadeInUp" animationOptions={{delay: 400}}>
                        <Card className="bg-card/50 border-white/10 h-full transition-all duration-300 hover:scale-105 hover:border-teal-400/50">
                             <CardContent className="p-8">
                                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-teal-500/10 text-teal-400 mb-6 mx-auto">
                                    <LayoutTemplate className="h-8 w-8" />
                                </div>
                                <h3 className="text-xl font-semibold text-white">Impress with Design</h3>
                                <p className="mt-2 text-muted-foreground">Choose from a library of ATS-friendly templates designed by professionals.</p>
                            </CardContent>
                        </Card>
                    </ScrollAnimation>
                    <ScrollAnimation animation="animate-fadeInUp" animationOptions={{delay: 600}}>
                         <Card className="bg-card/50 border-white/10 h-full transition-all duration-300 hover:scale-105 hover:border-violet-400/50">
                            <CardContent className="p-8">
                                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-violet-500/10 text-violet-400 mb-6 mx-auto">
                                    <Award className="h-8 w-8" />
                                </div>
                                <h3 className="text-xl font-semibold text-white">Succeed with Strategy</h3>
                                <p className="mt-2 text-muted-foreground">Get the insights you need to beat automated filters and land more interviews.</p>
                            </CardContent>
                        </Card>
                    </ScrollAnimation>
                </div>
            </div>
        </section>

        {/* AI-Powered Parsing Section */}
        <section id="ai-parsing" className="py-20 md:py-28 px-4">
          <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
            <ScrollAnimation animation="animate-slideInFromLeft">
                <div className="pr-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary">
                        <Cpu className="h-6 w-6" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white">AI-Powered Parsing</h2>
                  </div>
                  <p className="mt-4 text-muted-foreground">
                    Don't waste time with manual data entry. Upload your existing resume, and our intelligent AI will instantly read, understand, and extract key information. From contact details to complex work histories, we accurately parse your data, laying the foundation for a perfect resume in seconds.
                  </p>
                  <ul className="mt-6 space-y-4">
                    <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                        <p className="text-muted-foreground">Supports PDF, DOC, and DOCX formats for flexible uploads.</p>
                    </li>
                    <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                        <p className="text-muted-foreground">Accurately identifies and categorizes experience, skills, and education.</p>
                    </li>
                     <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                        <p className="text-muted-foreground">Saves you hours of tedious typing and formatting.</p>
                    </li>
                  </ul>
                </div>
            </ScrollAnimation>
            <ScrollAnimation animation="animate-slideInFromRight">
              <Card className="bg-card/70 border-white/10 backdrop-blur-sm shadow-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-primary/20">
                <CardContent className="p-6 grid grid-cols-2 gap-6 items-start">
                  {/* Left Column: Raw Text */}
                  <div className="col-span-1">
                    <CardTitle className="text-lg mb-4 text-muted-foreground">Raw Text</CardTitle>
                    <div className="text-xs text-muted-foreground/80 font-mono space-y-2 leading-relaxed">
                      <p>Alexandria Quill</p>
                      <p>alex.quill@email.com</p>
                      <p>555-123-4567</p>
                      <p>Software Engineer</p>
                      <p>...</p>
                      <p>University of Tech</p>
                      <p>B.S. Computer Science</p>
                      <p>2018 - 2022</p>
                      <p>Skills: React, Node.js</p>
                    </div>
                  </div>
                  {/* Right Column: Parsed Data */}
                  <div className="col-span-1 bg-background/50 p-4 rounded-lg border border-white/10">
                    <CardTitle className="text-lg mb-4 text-primary">Parsed Data</CardTitle>
                    <div className="space-y-3">
                       <ParsedDataItem label="Name" value="Alexandria Quill" icon={<User size={14} />} />
                       <ParsedDataItem label="Email" value="alex.quill@email.com" icon={<Mail size={14} />} />
                       <ParsedDataItem label="Phone" value="555-123-4567" icon={<Phone size={14} />} />
                       <ParsedDataItem label="Education" value="B.S. Computer Science" icon={<GraduationCap size={14} />} />
                       <div className="pt-2 border-t border-white/10">
                        <p className="text-xs text-muted-foreground font-semibold mb-2">Skills</p>
                        <div className="flex flex-wrap gap-1.5">
                            <span className="bg-primary/10 text-primary text-[10px] font-semibold px-2 py-0.5 rounded">React</span>
                            <span className="bg-primary/10 text-primary text-[10px] font-semibold px-2 py-0.5 rounded">Node.js</span>
                        </div>
                       </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollAnimation>
          </div>
        </section>

        {/* Template Selection Section */}
        <section id="templates" className="py-20 md:py-28 px-4 bg-gray-900/50">
          <div className="container mx-auto">
            <ScrollAnimation animation="animate-fadeInUp" className="text-center">
                <div className="flex items-center justify-center gap-4 mb-4">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary">
                        <LayoutTemplate className="h-6 w-6" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white">ATS-Friendly Templates</h2>
                </div>
                <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
                    Beat the bots with professionally designed templates. Browse our library of templates designed for various industries and roles, all optimized to be parsed correctly by applicant tracking systems.
                </p>
            </ScrollAnimation>

            <ScrollAnimation animation="animate-fadeInUp" animationOptions={{ delay: 300 }}>
              <div className="mt-12 flex justify-center flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={filter === category ? 'default' : 'outline'}
                    onClick={() => setFilter(category)}
                    className={cn(
                      "transition-all",
                      filter === category ? 'bg-primary text-primary-foreground' : 'text-muted-foreground border-white/20 hover:bg-white/10'
                    )}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </ScrollAnimation>
            
            <div className="relative mt-16">
              <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-gray-900/50 via-transparent to-gray-900/50" />
              <Carousel 
                opts={{ align: "center", loop: true }}
                setApi={setCarouselApi}
                className="w-full"
              >
                <CarouselContent className="-ml-4">
                  {filteredTemplates.map((template, index) => (
                    <CarouselItem key={template.id} className="pl-4 md:basis-1/2 lg:basis-1/3 group">
                      <div className="flex flex-col gap-4 items-center">
                        <div className={cn(
                          "transition-all duration-500 ease-in-out w-[300px] flex items-center justify-center",
                          selectedSnap === index ? 'opacity-100 scale-100' : 'opacity-50 scale-85 filter blur-sm'
                        )}>
                           <div className="aspect-[1/1.414] w-full overflow-hidden rounded-lg shadow-2xl bg-white">
                            <ResumePreview
                                resumeData={sampleResumeData}
                                templateId={template.id}
                                isPreview={true}
                            />
                          </div>
                        </div>
                        <div className="text-center">
                          <h3 className="font-bold text-white">{template.name}</h3>
                          <p className="text-sm text-muted-foreground">{template.category}</p>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="text-white hidden md:flex left-8"/>
                <CarouselNext className="text-white hidden md:flex right-8"/>
              </Carousel>
            </div>

          </div>
        </section>
        
        {/* Instant Download Section */}
        <section id="instant-download" className="py-20 md:py-28 px-4">
          <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
            <ScrollAnimation animation="animate-slideInFromLeft">
              <div className="pr-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary">
                    <Download className="h-6 w-6" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white">Instant Download</h2>
                </div>
                <p className="mt-4 text-muted-foreground">
                  Your next career move is just a click away. Once you've perfected your resume, download it instantly as a high-quality, universally compatible PDF file.
                </p>
                <ul className="mt-6 space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <p className="text-muted-foreground">Instant PDF download, ready for application.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <p className="text-muted-foreground">High-quality, professional-grade output.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <p className="text-muted-foreground">No watermarks. Ever.</p>
                  </li>
                </ul>
              </div>
            </ScrollAnimation>
            <ScrollAnimation animation="animate-slideInFromRight">
              <div
                className="relative w-full max-w-md mx-auto group"
                style={{ perspective: '1000px' }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <div className="absolute w-full h-full bg-white/10 rounded-xl -bottom-4 -right-4 transform-gpu rotate-6 transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2 group-hover:rotate-3" />
                <div className="absolute w-full h-full bg-white/10 rounded-xl -bottom-2 -right-2 transform-gpu rotate-3 transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:rotate-1" />

                <div className="relative w-full h-full rounded-xl bg-gradient-to-br from-card/70 to-card/90 border border-white/10 backdrop-blur-sm p-8 text-center shadow-2xl transition-transform group-hover:scale-105">
                  <ShineEffect x={mousePos.x} y={mousePos.y} />
                  <div className="relative z-10 flex flex-col items-center justify-center h-full">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-6 transition-transform group-hover:scale-110">
                      <FileText className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Ready to Go?</h3>
                    <p className="text-muted-foreground mt-2 mb-6">Your professionally crafted resume is just one click away.</p>
                    <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 transition-transform hover:scale-105 shadow-lg shadow-primary/20">
                      Create Your Resume Now <ArrowRight className="ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </section>

        {/* Beat the Bots Section */}
        <section id="ats-score" className="py-20 md:py-28 px-4 bg-gray-900/50">
          <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
            <ScrollAnimation animation="animate-slideInFromLeft">
              <a href="#templates" className="block group">
                <Card className="bg-card/70 border-white/10 backdrop-blur-sm shadow-2xl transform transition-all duration-500 group-hover:scale-105 group-hover:shadow-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <span>ATS Compatibility Check</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-6 items-center">
                    <div className="col-span-1">
                      <ChartContainer config={chartConfig} className="w-full aspect-square h-[180px] mx-auto">
                        <PieChart>
                          <defs>
                            <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="var(--color-score)" stopOpacity={0.8} />
                              <stop offset="95%" stopColor="var(--color-score)" stopOpacity={0.2} />
                            </linearGradient>
                            <linearGradient id="scoreStrokeGradient" x1="0" y1="0" x2="0" y2="1">
                               <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={1} />
                               <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                            </linearGradient>
                          </defs>
                          <ChartTooltip content={<ChartTooltipContent hideLabel hideIndicator />} />
                          <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} startAngle={90} endAngle={90 + (score / 100) * 360} cornerRadius={5} paddingAngle={-10}>
                            <cell key="score" fill="url(#scoreGradient)" stroke="url(#scoreStrokeGradient)" />
                            <cell key="rest" fill="transparent" stroke="transparent" />
                          </Pie>
                          <Pie data={[{ value: 100 }]} dataKey="value" cx="50%" cy="50%" innerRadius={60} outerRadius={80} startAngle={90} endAngle={450} stroke="hsla(var(--primary) / 0.1)" strokeWidth={2} fill="transparent" />
                          <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="fill-white text-4xl font-bold transition-all duration-1000" style={{ transform: 'translateZ(0)' }}>
                            {score}
                          </text>
                        </PieChart>
                      </ChartContainer>
                    </div>
                    <div className="col-span-1 space-y-3">
                      <div className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-primary flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-muted-foreground">Keyword Optimization</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-primary flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-muted-foreground">Standard Formatting</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-primary flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-muted-foreground">Parsable Layout</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-primary flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-muted-foreground">Clear Section Headers</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </a>
            </ScrollAnimation>
            <ScrollAnimation animation="animate-slideInFromRight">
              <div className="pl-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white">Beat the Bots with ATS-Friendly Design</h2>
                </div>
                <p className="mt-4 text-muted-foreground">
                  Over 90% of large companies use Applicant Tracking Systems (ATS) to screen resumes. Our templates are designed from the ground up with the latest ATS guidelines in mind, ensuring your resume gets past the automated filters and into human hands.
                </p>
                <ul className="mt-6 space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <p className="text-muted-foreground">Optimized for keyword matching and content parsing.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <p className="text-muted-foreground">Built with clean, standard formatting recruiters prefer.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <p className="text-muted-foreground">Increases your visibility and chances of landing an interview.</p>
                  </li>
                </ul>
              </div>
            </ScrollAnimation>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 md:py-28 px-4">
          <div className="container mx-auto">
            <ScrollAnimation animation="animate-fadeInUp" className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white">Get Your Resume in 3 Simple Steps</h2>
              <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
                From upload to a polished, job-winning document in minutes.
              </p>
            </ScrollAnimation>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              <ScrollAnimation animation="animate-slideInFromLeft" className="text-center flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-6">
                  <ClipboardPaste className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-white">1. Provide Your Data</h3>
                <p className="mt-2 text-muted-foreground">Upload your current resume or simply paste the raw text. Our AI will handle the rest.</p>
              </ScrollAnimation>
              <ScrollAnimation animation="animate-fadeInUp" className="text-center flex flex-col items-center animation-delay-300">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-6">
                  <MousePointerClick className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-white">2. Choose a Template</h3>
                <p className="mt-2 text-muted-foreground">Select from our library of professionally designed and ATS-friendly templates.</p>
              </ScrollAnimation>
              <ScrollAnimation animation="animate-slideInFromRight" className="text-center flex flex-col items-center animation-delay-600">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-6">
                  <Download className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-white">3. Download & Apply</h3>
                <p className="mt-2 text-muted-foreground">Download your new, polished resume in PDF format and start applying for jobs with confidence.</p>
              </ScrollAnimation>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 md:py-28 px-4 bg-gray-900/50">
          <div className="container mx-auto">
            <ScrollAnimation animation="animate-fadeInUp" className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white">Loved by Professionals</h2>
                <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
                Don't just take our word for it. Here's what our users are saying.
                </p>
            </ScrollAnimation>
            <ScrollAnimation animation="animate-fadeInUp" animationOptions={{ delay: 300 }}>
                <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full max-w-4xl mx-auto mt-16"
                >
                <CarouselContent>
                    {testimonials.map((testimonial, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                        <div className="p-1">
                        <Card className="h-full bg-card/50 border-white/10">
                            <CardContent className="p-6 flex flex-col justify-between h-full">
                            <p className="text-muted-foreground italic">"{testimonial.text}"</p>
                            <div className="flex items-center gap-4 mt-6 pt-6 border-t border-white/10">
                                <Avatar>
                                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold text-white">{testimonial.name}</p>
                                    <p className="text-xs text-muted-foreground">{testimonial.title}</p>
                                </div>
                            </div>
                            </CardContent>
                        </Card>
                        </div>
                    </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="text-white"/>
                <CarouselNext className="text-white"/>
                </Carousel>
            </ScrollAnimation>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section id="faq" className="py-20 md:py-28 px-4">
          <div className="container mx-auto max-w-3xl">
              <ScrollAnimation animation="animate-fadeInUp" className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white">Frequently Asked Questions</h2>
                <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
                    Have questions? We've got answers.
                </p>
              </ScrollAnimation>
              <ScrollAnimation animation="animate-fadeInUp" animationOptions={{ delay: 300 }}>
                <Accordion type="single" collapsible className="w-full mt-12">
                    {faqItems.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border-white/10">
                        <AccordionTrigger className="text-white text-left hover:no-underline">
                        {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                        {item.answer}
                        </AccordionContent>
                    </AccordionItem>
                    ))}
                </Accordion>
              </ScrollAnimation>
          </div>
        </section>


        {/* Footer */}
        <footer className="py-12 px-4 bg-black/50">
         <ScrollAnimation animation="animate-fadeInUp" animationOptions={{ delay: 300 }}>
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-8">
            <div className="max-w-md">
              <h3 className="text-2xl text-white">Resume Pilot</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Resume Pilot is an AI-powered platform designed to help you create professional, ATS-friendly resumes effortlessly. Our tools analyze, score, and help you craft the perfect resume to land your dream job.
              </p>
              <p className="text-xs text-muted-foreground/50 mt-4">&copy; {new Date().getFullYear()} Resume Pilot. All rights reserved.</p>
            </div>
            <div className="flex flex-col gap-4">
                <div className="flex gap-4 text-muted-foreground justify-center md:justify-start">
                    <a href="#" className="hover:text-primary transition-colors"><Twitter /></a>
                    <a href="#" className="hover:text-primary transition-colors"><Linkedin /></a>
                    <a href="#" className="hover:text-primary transition-colors"><Github /></a>
                </div>
                <nav className="flex flex-col sm:flex-row gap-4 md:gap-6 text-sm text-muted-foreground justify-center md:justify-start">
                  <a href="#" className="hover:text-primary transition-colors">Terms & Conditions</a>
                  <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                  <a href="#" className="hover:text-primary transition-colors">Contact Us</a>
                </nav>
            </div>
          </div>
          </ScrollAnimation>
        </footer>
      </main>
    </div>
  );
}
