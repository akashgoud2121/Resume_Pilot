
'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
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
  FileInput,
  PenSquare,
  Loader2,
  Files,
  Briefcase as BriefcaseIcon,
  MessageSquare,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel';
import { templates } from '@/lib/templates';
import { cn } from '@/lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Header3d } from '@/components/header-3d';
import type { ResumeData } from '@/lib/types';
import { ResumePreview } from '@/components/resume-preview';
import { User } from 'lucide-react';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Pie, PieChart } from 'recharts';
import { extractResumeTextAction } from './actions';
import { useToast } from '@/hooks/use-toast';
import Autoplay from "embla-carousel-autoplay"
import { DETAILED_DUMMY_RESUME_DATA, DUMMY_RESUME_DATA } from '@/lib/dummy-data';
import Footer from '@/components/footer';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import ScrollAnimation from '@/components/ui/scroll-animation';


const initialTestimonials = [
  {
    name: 'Sarah J.',
    title: 'Software Engineer',
    text: "Resume Pilot's AI parsing is a game-changer. It extracted everything from my old PDF perfectly, saving me hours of work. The templates are clean, modern, and professional.",
  },
  {
    name: 'Michael B.',
    title: 'Product Manager',
    text: 'I was struggling to get my resume noticed. The ATS-friendly templates from Resume Pilot made a huge difference. I landed three interviews in the first week!',
  },
  {
    name: 'Jessica L.',
    title: 'UX Designer',
    text: 'As a designer, aesthetics are important to me. Resume Pilot offers a great balance of beautiful design and functionality. The "Creative" template is my favorite.',
  },
  {
    name: 'David R.',
    title: 'Data Scientist',
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
  const router = useRouter();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Professional', 'Modern & Clean', 'Structured', 'Elegant & Stylish', 'Simple & To-the-point', 'Bold & Visual', 'Experience-focused', 'Fresh & Contemporary'];
  
  const filteredTemplates = templates.filter(
    (template) => filter === 'All' || template.category === filter
  );

  const sampleResumeData: ResumeData = DUMMY_RESUME_DATA;

  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [selectedSnap, setSelectedSnap] = useState(0);

  const [testimonials, setTestimonials] = useState(initialTestimonials);

  useEffect(() => {
    try {
        const storedTestimonials = localStorage.getItem('testimonials');
        if (storedTestimonials) {
            setTestimonials(JSON.parse(storedTestimonials));
        }
    } catch (error) {
        console.error("Could not parse testimonials from localStorage", error);
        setTestimonials(initialTestimonials);
    }
  }, []);

  const handleAddTestimonial = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newTestimonial = {
        name: formData.get('name') as string,
        title: formData.get('title') as string,
        text: formData.get('text') as string,
    };

    if (newTestimonial.name && newTestimonial.title && newTestimonial.text) {
        const updatedTestimonials = [...testimonials, newTestimonial];
        setTestimonials(updatedTestimonials);
        try {
            localStorage.setItem('testimonials', JSON.stringify(updatedTestimonials));
            toast({
                title: "Review Submitted!",
                description: "Thank you for your feedback.",
            });
            (event.target as HTMLFormElement).reset();
        } catch (error) {
            console.error("Could not save testimonials to localStorage", error);
             toast({
                title: "Submission Error",
                description: "Could not save your review.",
                variant: "destructive",
            });
        }
    }
  };


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

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleStartFromScratch = () => {
    router.push('/editor?new=true');
  };
  
  const handleUseTestData = () => {
    const testData = DETAILED_DUMMY_RESUME_DATA;
    sessionStorage.setItem('resumeData', JSON.stringify(testData));
    history.pushState({ resumeData: testData }, '', '/preview-templates');
    router.push('/preview-templates');
  };
  
  const handlePortfolioBuilder = () => {
    router.push('/portfolio-builder');
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setError(null);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const dataUri = reader.result as string;
        try {
          const resumeText = await extractResumeTextAction(dataUri);
          sessionStorage.setItem('resumeText', resumeText);
          history.pushState({ resumeText }, '', '/generate');
          router.push('/generate');

        } catch (e: any) {
          setError('Failed to process resume. Please try a different file.');
          toast({
            title: 'Processing Error',
            description: "We couldn't extract text from your resume. Please try another file.",
            variant: 'destructive',
          });
        } finally {
          setIsLoading(false);
        }
      };
      reader.onerror = (error) => {
        setError('Failed to read file.');
        toast({
          title: 'File Read Error',
          description: 'There was an issue reading your file. Please try again.',
          variant: 'destructive',
        });
        setIsLoading(false);
      };
    } catch (e: any) {
        setError('An unexpected error occurred.');
        toast({
          title: 'Error',
          description: 'An unexpected error occurred. Please try again.',
          variant: 'destructive',
        });
        setIsLoading(false);
    }
    event.target.value = '';
  };
  
  const JourneyCard = ({ icon, title, description, onClick, ctaText, delay = 200 }: { icon: React.ReactNode; title: string; description: string; onClick: () => void; ctaText: string; delay?: number }) => {
    const [mousePos, setMousePos] = useState({ x: -1, y: -1 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleMouseLeave = () => {
        setMousePos({ x: -1, y: -1 });
    };
    
    return (
        <ScrollAnimation animation="scroll-reveal-up" animationOptions={{ delay }}>
            <div 
                className="relative group w-full h-full"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-teal-500 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
                <Card className="relative bg-card/80 backdrop-blur-md border-white/10 h-full flex flex-col p-6 transition-all duration-300 hover:scale-[1.02]">
                    <ShineEffect x={mousePos.x} y={mousePos.y} />
                    <CardHeader className="p-0 items-center text-center">
                        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4 ring-8 ring-primary/5 transition-transform group-hover:scale-110">
                            {icon}
                        </div>
                        <CardTitle className="text-xl text-white">{title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 flex-1 flex flex-col items-center text-center mt-4">
                        <p className="text-muted-foreground text-sm flex-1">{description}</p>
                        <Button 
                            onClick={onClick}
                            className="w-full mt-6 bg-primary/90 text-primary-foreground hover:bg-primary transition-transform group-hover:scale-105 shadow-lg shadow-primary/20"
                            disabled={isLoading}
                        >
                            {isLoading && title === 'Upload Existing Resume' ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <ArrowRight className="mr-2 h-4 w-4" />
                            )}
                            {isLoading && title === 'Upload Existing Resume' ? 'Processing...' : ctaText}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </ScrollAnimation>
    );
  };


  return (
    <div className="dark bg-background text-foreground min-h-screen">
       <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".pdf,.doc,.docx"
        disabled={isLoading}
      />
      <main className="overflow-x-hidden">
        <Header3d />
        <section className="py-20 md:py-28 px-4 bg-gray-900/50">
            <div className="container mx-auto max-w-6xl">
                <ScrollAnimation animation="scroll-reveal-up">
                    <div className="text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">Unlock Your Career Potential</h2>
                        <p className="mt-4 text-muted-foreground max-w-3xl mx-auto">
                            Don't just build a resume—build your future. Resume Pilot combines cutting-edge AI with professional design to give you the ultimate advantage in today's competitive job market.
                        </p>
                    </div>
                </ScrollAnimation>
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <ScrollAnimation animation="scroll-reveal-up" animationOptions={{ delay: 200 }}>
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
                    <ScrollAnimation animation="scroll-reveal-up" animationOptions={{ delay: 300 }}>
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
                    <ScrollAnimation animation="scroll-reveal-up" animationOptions={{ delay: 400 }}>
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

        <section id="ai-parsing" className="py-20 md:py-28 px-4">
          <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
            <ScrollAnimation animation="scroll-reveal-left">
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
            <ScrollAnimation animation="scroll-reveal-right">
              <Card className="bg-card/70 border-white/10 backdrop-blur-sm shadow-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-primary/20">
                <CardContent className="p-6 grid grid-cols-2 gap-6 items-start">
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

        <section id="templates" className="py-20 md:py-28 px-4 bg-gray-900/50">
          <div className="container mx-auto">
            <ScrollAnimation animation="scroll-reveal-up">
                <div className="text-center">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary">
                            <LayoutTemplate className="h-6 w-6" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white">ATS-Friendly Templates</h2>
                    </div>
                    <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
                        Beat the bots with professionally designed templates. Browse our library of templates designed for various industries and roles, all optimized to be parsed correctly by applicant tracking systems.
                    </p>
                </div>
            </ScrollAnimation>

            <ScrollAnimation animation="scroll-reveal-up" animationOptions={{ delay: 200 }}>
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
            
            <ScrollAnimation animation="scroll-reveal-scale" animationOptions={{ delay: 300 }}>
                <div className="relative mt-16">
                   <div className="absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-gray-900/50 to-transparent pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-gray-900/50 to-transparent pointer-events-none" />
                  <Carousel 
                     plugins={[Autoplay({ delay: 3000, stopOnInteraction: true })]}
                    opts={{ align: "center", loop: true }}
                    setApi={setCarouselApi}
                    className="w-full"
                  >
                    <CarouselContent className="-ml-4">
                      {filteredTemplates.map((template, index) => (
                         <CarouselItem key={template.id} className="pl-4 md:basis-1/2 lg:basis-1/3 group">
                          <div className="flex flex-col gap-4 items-center">
                            <div className={cn(
                              "transition-all duration-500 ease-in-out flex items-center justify-center",
                              selectedSnap === index ? 'opacity-100 scale-100' : 'opacity-50 scale-85'
                            )}>
                              <div className="w-[300px] h-[424px] overflow-hidden rounded-lg shadow-2xl bg-white">
                               <div className="transform scale-[0.38] origin-top-left w-[789px] h-[1116px]">
                                   <ResumePreview
                                        resumeData={sampleResumeData}
                                        templateId={template.id}
                                    />
                               </div>
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
            </ScrollAnimation>

          </div>
        </section>
        
        <section id="instant-download" className="py-20 md:py-28 px-4">
          <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
            <ScrollAnimation animation="scroll-reveal-left">
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
            <ScrollAnimation animation="scroll-reveal-right">
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
                    <a href="#how-it-works">
                      <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 transition-transform hover:scale-105 shadow-lg shadow-primary/20">
                        Create Your Resume Now <ArrowRight className="ml-2" />
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </section>

        <section id="ats-score" className="py-20 md:py-28 px-4 bg-gray-900/50">
          <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
            <ScrollAnimation animation="scroll-reveal-left">
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
                          <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="fill-white text-4xl font-bold transition-all duration-1000" style={{ transform: 'translateZ(0)' }}>
                            {score}
                          </text>
                           <text x="50%" y="65%" textAnchor="middle" dominantBaseline="middle" className="fill-muted-foreground text-sm font-medium transition-all duration-1000">
                            Compatibility
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
            <ScrollAnimation animation="scroll-reveal-right">
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

        <section id="how-it-works" className="py-20 md:py-28 px-4">
            <div className="container mx-auto">
                <ScrollAnimation animation="scroll-reveal-up">
                    <div className="text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">Your Journey Starts Here</h2>
                        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                            How do you want to create your masterpiece? We offer multiple paths to fit your needs, whether you're updating an old resume or crafting a new one from scratch.
                        </p>
                    </div>
                </ScrollAnimation>
                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
                    <JourneyCard 
                        icon={<FileInput className="w-10 h-10" />}
                        title="Upload Existing Resume"
                        description="Have a resume already? Let our AI parse it and do the heavy lifting for you."
                        onClick={handleUploadClick}
                        ctaText="Upload & Parse"
                        delay={200}
                    />
                    <JourneyCard 
                        icon={<PenSquare className="w-10 h-10" />}
                        title="Start From Scratch"
                        description="A blank canvas for your career story. Build your resume section by section with our guided editor."
                        onClick={handleStartFromScratch}
                        ctaText="Start Editing"
                        delay={300}
                    />
                    <JourneyCard 
                        icon={<Files className="w-10 h-10" />}
                        title="Test with Detailed Data"
                        description="Want to see the full power of our templates? Use our pre-filled, detailed sample data to explore."
                        onClick={handleUseTestData}
                        ctaText="Use Sample Data"
                        delay={400}
                    />
                    <JourneyCard 
                        icon={<BriefcaseIcon className="w-10 h-10" />}
                        title="Build from Portfolio"
                        description="Have project reports or certificates? Our AI can synthesize them into a complete resume."
                        onClick={handlePortfolioBuilder}
                        ctaText="Build from Docs"
                        delay={500}
                    />
                </div>
            </div>
        </section>


        <section id="testimonials" className="py-20 md:py-28 px-4 bg-gray-900/50">
          <div className="container mx-auto">
            <ScrollAnimation animation="scroll-reveal-up">
                <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">Loved by Professionals</h2>
                    <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
                    Don't just take our word for it. Here's what our users are saying.
                    </p>
                </div>
            </ScrollAnimation>
            <ScrollAnimation animation="scroll-reveal-up" animationOptions={{ delay: 200 }}>
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
            <ScrollAnimation animation="scroll-reveal-up" animationOptions={{ delay: 300 }}>
                <Card className="max-w-2xl mx-auto mt-16 bg-card/50 border-white/10">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                            <MessageSquare className="text-primary"/>
                            Share Your Experience
                        </CardTitle>
                        <CardDescription>
                            We'd love to hear your feedback! Your review will help others and inspire our team.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4" onSubmit={handleAddTestimonial}>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <Input name="name" placeholder="Your Name" required/>
                                <Input name="title" placeholder="Your Title (e.g., Software Engineer)" required/>
                            </div>
                            <Textarea name="text" placeholder="Write your review here..." required rows={4}/>
                            <div className="flex justify-end">
                                <Button type="submit">Submit Review</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </ScrollAnimation>
          </div>
        </section>
        
        <section id="faq" className="py-20 md:py-28 px-4">
          <div className="container mx-auto max-w-3xl">
              <ScrollAnimation animation="scroll-reveal-up">
                <div className="text-center">
                  <h2 className="text-3xl md:text-4xl font-bold text-white">Frequently Asked Questions</h2>
                  <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
                      Have questions? We've got answers.
                  </p>
                </div>
              </ScrollAnimation>
              <ScrollAnimation animation="scroll-reveal-up" animationOptions={{ delay: 200 }}>
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
        <Footer />
      </main>
    </div>
  );
}

    

    