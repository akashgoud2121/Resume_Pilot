
'use client';

import { useState } from 'react';
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
  User,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { templates } from '@/lib/templates';
import { cn } from '@/lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import ScrollAnimation from '@/components/ui/scroll-animation';
import { Header3d } from '@/components/header-3d';
import type { ResumeData } from '@/lib/types';
import { ResumePreview } from '@/components/resume-preview';


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
    professionalSummary: 'Innovative Software Engineer with 5+ years of experience in developing and deploying scalable web applications. Passionate about creating elegant, efficient code and working in collaborative, agile environments to solve complex problems.',
    coreSkills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker', 'AWS', 'TDD', 'CI/CD'],
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
        description: 'Lead developer for the flagship SaaS product. Architected and implemented a new microservices-based backend, resulting in a 40% performance increase. Mentored junior developers and championed best practices in code reviews.',
      },
      {
        title: 'Software Engineer',
        company: 'CodeCrafters Inc.',
        dates: '2018 - 2020',
        description: 'Developed and maintained full-stack features for a high-traffic e-commerce platform using React and Node.js. Collaborated with designers to create a seamless user experience.',
      },
    ],
    projects: [
      {
        name: 'Open Source Contributor',
        description: 'Active contributor to a popular open-source UI library, focusing on accessibility improvements.',
      },
    ],
    achievements: [{ value: 'Awarded "Innovator of the Year" 2022' }],
    certifications: [{ value: 'AWS Certified Developer' }],
  };

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

            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredTemplates.map((template, index) => (
                 <ScrollAnimation animation="animate-scaleIn" animationOptions={{ delay: index * 100 }} key={template.id}>
                    <div className="group relative overflow-hidden rounded-lg bg-card shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-primary/20">
                       <ResumePreview resumeData={sampleResumeData} templateId={template.id} isPreview />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-4">
                        <h3 className="font-bold text-white">{template.name}</h3>
                        <p className="text-xs text-muted-foreground">{template.category}</p>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button variant="secondary">
                          Preview <ChevronRight className="ml-2" />
                        </Button>
                      </div>
                    </div>
                </ScrollAnimation>
              ))}
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
                    Your next career move is just a click away. Once you've perfected your resume, download it instantly as a high-quality, universally compatible PDF file. No watermarks, no delays. Just a professional, job-ready resume in your hands, ready to be sent to your dream company.
                  </p>
                  <Button size="lg" className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90 transition-transform hover:scale-105">
                     Create Your Resume Now <ArrowRight className="ml-2" />
                  </Button>
                </div>
            </ScrollAnimation>
            <ScrollAnimation animation="animate-slideInFromRight">
               <Image
                    src="https://picsum.photos/seed/download/600/400"
                    alt="Person downloading a resume"
                    width={600}
                    height={400}
                    className="rounded-xl shadow-2xl"
                    data-ai-hint="success document"
                  />
            </ScrollAnimation>
          </div>
        </section>

        {/* ATS Score Section */}
        <section id="ats-score" className="py-20 md:py-28 px-4 bg-gray-900/50">
          <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
            <ScrollAnimation animation="animate-slideInFromLeft">
               <Image
                    src="https://picsum.photos/seed/ats/600/450"
                    alt="ATS Score Dashboard"
                    width={600}
                    height={450}
                    className="rounded-xl shadow-2xl"
                    data-ai-hint="dashboard chart"
                  />
            </ScrollAnimation>
            <ScrollAnimation animation="animate-slideInFromRight">
                <div className="pl-8">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary">
                            <Gauge className="h-6 w-6" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white">Optimize with an ATS Score</h2>
                    </div>
                  <p className="mt-4 text-muted-foreground">
                    Over 90% of large companies use Applicant Tracking Systems (ATS) to screen resumes. Our AI analyzes your resume against common ATS criteria, providing a real-time score and actionable feedback. Ensure your resume gets past the bots and into human hands.
                  </p>
                  <ul className="mt-6 space-y-4">
                    <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                        <p className="text-muted-foreground">Get a score from 0-100 based on keywords, formatting, and structure.</p>
                    </li>
                    <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                        <p className="text-muted-foreground">Receive specific, AI-driven suggestions for improvement.</p>
                    </li>
                     <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                        <p className="text-muted-foreground">Maximize your chances of landing an interview.</p>
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
