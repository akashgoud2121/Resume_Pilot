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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { templates } from '@/lib/templates';
import { cn } from '@/lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import ScrollAnimation from '@/components/ui/scroll-animation';

const testimonials = [
  {
    name: 'Sarah J.',
    title: 'Software Engineer',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    text: "ResumePilot's AI parsing is a game-changer. It extracted everything from my old PDF perfectly, saving me hours of work. The templates are clean, modern, and professional.",
  },
  {
    name: 'Michael B.',
    title: 'Product Manager',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705d',
    text: 'I was struggling to get my resume noticed. The ATS-friendly templates from ResumePilot made a huge difference. I landed three interviews in the first week!',
  },
  {
    name: 'Jessica L.',
    title: 'UX Designer',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706d',
    text: 'As a designer, aesthetics are important to me. ResumePilot offers a great balance of beautiful design and functionality. The "Creative" template is my favorite.',
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

export default function Home() {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Professional', 'Modern & Clean', 'Structured', 'Elegant & Stylish', 'Simple & To-the-point', 'Bold & Visual', 'Experience-focused', 'Fresh & Contemporary'];
  
  const filteredTemplates = templates.filter(
    (template) => filter === 'All' || template.category === filter
  );

  return (
    <div className="dark bg-background text-foreground min-h-screen">
      <main className="overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center text-center px-4">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900/50 -z-10"></div>
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-5 -z-10"></div>
          
          <ScrollAnimation animation="animate-fadeInUp" className="relative z-10 w-full">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white">
              ResumePilot
            </h1>
            <p className="mt-4 md:mt-6 text-lg md:text-xl max-w-2xl mx-auto text-muted-foreground animation-delay-300">
              Craft your perfect resume with AI-powered scoring and professional templates.
            </p>
            <div className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animation-delay-600">
              <Button size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 transition-transform hover:scale-105">
                <Upload className="mr-2" /> Upload Resume
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-white border-white/50 hover:bg-white/10 hover:text-white transition-transform hover:scale-105">
                Enter Manually <ArrowRight className="ml-2" />
              </Button>
            </div>
          </ScrollAnimation>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 md:py-28 px-4 bg-gray-900/50">
          <div className="container mx-auto">
            <ScrollAnimation animation="animate-fadeInUp" className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white">How It Works</h2>
              <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
                Get a job-ready resume in three simple steps.
              </p>
            </ScrollAnimation>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              <ScrollAnimation animation="animate-slideInFromLeft" className="text-center flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-6">
                  <ClipboardPaste className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-white">Step 1: Provide Your Data</h3>
                <p className="mt-2 text-muted-foreground">Upload your current resume or simply paste the raw text. Our AI will handle the rest.</p>
              </ScrollAnimation>
              <ScrollAnimation animation="animate-fadeInUp" className="text-center flex flex-col items-center animation-delay-300">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-6">
                  <MousePointerClick className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-white">Step 2: Choose Template</h3>
                <p className="mt-2 text-muted-foreground">Select from our library of professionally designed and ATS-friendly templates.</p>
              </ScrollAnimation>
              <ScrollAnimation animation="animate-slideInFromRight" className="text-center flex flex-col items-center animation-delay-600">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-6">
                  <Download className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-white">Step 3: Download & Apply</h3>
                <p className="mt-2 text-muted-foreground">Download your new, polished resume in PDF format and start applying for jobs with confidence.</p>
              </ScrollAnimation>
            </div>
          </div>
        </section>

        {/* Template Selection Section */}
        <section id="templates" className="py-20 md:py-28 px-4">
          <div className="container mx-auto">
            <ScrollAnimation animation="animate-fadeInUp" className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white">Find Your Perfect Template</h2>
                <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
                Browse our library of templates designed for various industries and roles.
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
                      <Image
                        src={template.image}
                        alt={template.name}
                        width={400}
                        height={565}
                        className="w-full object-cover object-top transition-transform duration-300 group-hover:opacity-80"
                        data-ai-hint="resume professional"
                      />
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

        {/* Why Choose Us Section */}
        <section id="features" className="py-20 md:py-28 px-4 bg-gray-900/50">
          <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
            <ScrollAnimation animation="animate-slideInFromLeft">
               <Image
                    src="https://picsum.photos/600/500"
                    alt="AI in action"
                    width={600}
                    height={500}
                    className="rounded-xl shadow-2xl"
                    data-ai-hint="technology abstract"
                  />
            </ScrollAnimation>
            <ScrollAnimation animation="animate-slideInFromRight">
              <h2 className="text-3xl md:text-4xl font-bold text-white">Why Choose ResumePilot?</h2>
              <p className="mt-4 text-muted-foreground">
                We combine powerful technology with sleek design to give you an unbeatable advantage.
              </p>
              <ul className="mt-8 space-y-6">
                <li className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white">AI-Powered Text Extraction</h3>
                    <p className="text-muted-foreground">Our smart AI accurately parses your existing resume, saving you from tedious manual entry.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white">Customizable, ATS-Friendly Templates</h3>
                    <p className="text-muted-foreground">Choose from a variety of templates that are not only beautiful but also optimized for applicant tracking systems.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white">Intuitive & Fast Interface</h3>
                    <p className="text-muted-foreground">Our easy-to-use platform allows you to create a professional resume in minutes, not hours.</p>
                  </div>
                </li>
              </ul>
            </ScrollAnimation>
          </div>
        </section>


        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 md:py-28 px-4">
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
        <section id="faq" className="py-20 md:py-28 px-4 bg-gray-900/50">
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
            <div>
              <h3 className="text-2xl font-bold text-white">ResumePilot</h3>
              <p className="text-sm text-muted-foreground mt-2">&copy; {new Date().getFullYear()} ResumePilot. All rights reserved.</p>
            </div>
            <div className="flex gap-4 text-muted-foreground">
                <a href="#" className="hover:text-primary transition-colors"><Twitter /></a>
                <a href="#" className="hover:text-primary transition-colors"><Linkedin /></a>
                <a href="#" className="hover:text-primary transition-colors"><Github /></a>
            </div>
            <nav className="flex flex-col sm:flex-row gap-4 md:gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Terms & Conditions</a>
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Contact Us</a>
            </nav>
          </div>
          </ScrollAnimation>
        </footer>
      </main>
    </div>
  );
}