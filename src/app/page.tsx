'use client';

import { useState, useRef, useTransition } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FileText,
  Upload,
  Loader2,
  FilePenLine,
  Trash2,
  PlusCircle,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  GraduationCap,
  Briefcase,
  Lightbulb,
  Trophy,
  Award,
  User,
  ClipboardPaste,
  Printer,
  Edit,
  TestTube2,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { ResumePreview } from '@/components/resume-preview';
import { templates } from '@/lib/templates';
import type { ResumeData } from '@/lib/types';
import { extractResumeTextAction, extractResumeDataAction } from './actions';
import { resumeSchema } from '@/lib/types';
import { cn } from '@/lib/utils';


const testData: ResumeData = {
  name: 'E Akash Goud',
  email: 'letsmail.akashgoud@gmail.com',
  mobileNumber: '8125824741',
  githubLink: 'https://github.com/akashgoud2121',
  linkedinLink: 'https://linkedin.com/in/akashgoud',
  professionalSummary:
    'Results-driven AI/ML Engineer and Python Software Developer with experience in building and deploying machine learning models, full-stack applications, and automation solutions. Skilled in developing end-to-end projects across healthcare, finance, and productivity domains, achieving measurable accuracy improvements and performance optimization. Proficient in Python, ML/DL frameworks, APIs, Django and cloud platforms (AWS).',
  coreSkills: [
    'Programming & Development: Python, Java, SQL, Jupyter Notebooks (.ipynb), Django, FastAPI, Streamlit',
    'Machine Learning, AI & Deep Learning: Kaggle, Scikit-learn, TensorFlow, PyTorch, Keras, Transformers (e.g., ChatGPT, Gemini)',
    'Research & Publications: Conference & Scopus Papers, Research Thesis, Paper & Code Explanation',
    'Cloud: AWS, Git, Vercel',
    'Additional Skills: Word, Excel (for data analysis, documentation, and reporting)',
  ],
  education: [
    {
      institution: 'Malla Reddy College of Engineering and Technology',
      degree: 'Bachelor of Technology, Computer Science (AI&ML)',
      dates: 'Jun 2025',
    },
    {
      institution: 'SriGayatri Junior College',
      degree: 'Telangana Board of Intermediate Education (XII)',
      dates: 'Jun 2019 - Nov 2021',
    },
  ],
  experience: [
    {
      title: 'Python AI&ML Engineer',
      company: 'Incline Inventions',
      dates: 'May 2025 - Present',
      description:
        '• Developed 10+ machine learning and deep learning models for real-world datasets, enhancing baseline Kaggle codes for higher accuracy and originality.\n• Contributed to 4 Conference Papers, 2 Scopus Papers, and 6+ SCI/other papers, handling dataset curation, plagiarism reduction (<10%), and drafting complete documentation.\n• Delivered 15+ explanatory videos explaining code and paper pipelines for clients and internal teams.\n• Built a Speech Analysis Assistant evaluating speech on 15+ criteria, providing actionable insights for improvement.\n• Supported the delivery of AI training modules to partner institutes.\n• Strengthened skills in Python, TensorFlow, PyTorch, NLP, data preprocessing, and model optimization, while improving ability to communicate technical work effectively.',
    },
  ],
  projects: [
    {
      name: 'Speech Analysis Assistant – Internal Project / Startup',
      description:
        '• Built an Al-powered speech analysis tool evaluating 15+ metrics including fluency, filler words, clarity, pace, and grammar.\n• Provided actionable insights for improving communication skills.\n• Developed ML/NLP pipelines and interactive UI for seamless user experience.\n• Skills: Python, NLP, SpeechRecognition, Streamlit, Machine Learning, Data Visualization',
    },
    {
      name: 'OfficeZenith – Workplace Wellness Assistant – Internal Project / Startup',
      description:
        '• Developed a Django-based web app enabling reminders for water intake, screen breaks, exercises, meditation, and custom alerts.\n• Implemented backend models, database logging, and a clean front-end UI to improve employee productivity and wellness.\n• Skills Used: Django, Python, HTML, CSS, JavaScript, SQLite, Full-Stack Development',
    },
    {
      name: 'Beverage Detection App (YOLOv8) – Internal Project / Startup',
      description:
        '• Developed a computer vision application to detect beverages (Pepsi, Coca-Cola, Mirinda, Mountain Dew) and display nutritional facts.\n• Integrated WHO sugar limit checks, health alerts, and personalized tips for users.\n• Deployed on Streamlit Cloud with model upload/download functionality for real-world usability.\n• Skills: Python, YOLOv8, Streamlit, Pandas, Matplotlib, Computer Vision, Full-Stack Deployment',
    },
  ],
  achievements: [],
  certifications: [
      { value: 'Salesforce Developer Virtual Internship May 2024 – Jun 2024' },
      { value: 'Salesforce Super Badges: Apex Specialist, Process Automation Specialist, Developer Super Set' },
      { value: 'Smart India Hackathon- Internal Hackathon Aug 2023 - Sep 2023' },
  ]
};

type LoadingState = 'idle' | 'extracting-text' | 'extracting-data' | 'processing' | 'downloading';

export default function Home() {
  const [step, setStep] = useState<'landing' | 'text-review' | 'paste-text' | 'editor' | 'results' | 'preview'>('landing');
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [extractedText, setExtractedText] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('default');
  const [isPending, startTransition] = useTransition();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const form = useForm<ResumeData>({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      name: '',
      email: '',
      mobileNumber: '',
      githubLink: '',
      linkedinLink: '',
      professionalSummary: '',
      coreSkills: [],
      education: [{ institution: '', degree: '', dates: '' }],
      experience: [{ title: '', company: '', dates: '', description: '' }],
      projects: [{ name: '', description: '' }],
      achievements: [{ value: '' }],
      certifications: [{ value: '' }],
    },
  });

  const { fields: eduFields, append: appendEdu, remove: removeEdu } = useFieldArray({ control: form.control, name: 'education' });
  const { fields: expFields, append: appendExp, remove: removeExp } = useFieldArray({ control: form.control, name: 'experience' });
  const { fields: projFields, append: appendProj, remove: removeProj } = useFieldArray({ control: form.control, name: 'projects' });
  const { fields: achieveFields, append: appendAchieve, remove: removeAchieve } = useFieldArray({ control: form.control, name: 'achievements' });
  const { fields: certFields, append: appendCert, remove: removeCert } = useFieldArray({ control: form.control, name: 'certifications' });


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          variant: 'destructive',
          title: 'File too large',
          description: 'Please upload a file smaller than 5MB.',
        });
        return;
      }
      setLoadingState('extracting-text');
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        startTransition(async () => {
          try {
            const dataUri = reader.result as string;
            const text = await extractResumeTextAction(dataUri);
            setExtractedText(text);
            setStep('text-review');
          } catch (error) {
            toast({
              variant: 'destructive',
              title: 'Extraction Failed',
              description: 'Could not extract text from the resume. Please try again or enter details manually.',
            });
          } finally {
            setLoadingState('idle');
          }
        });
      };
      reader.onerror = () => {
        setLoadingState('idle');
        toast({
          variant: 'destructive',
          title: 'Error reading file',
          description: 'There was an issue processing your file.',
        });
      };
    }
  };

  const handleManualEntry = () => {
    form.reset({
      name: '',
      email: '',
      mobileNumber: '',
      githubLink: '',
      linkedinLink: '',
      professionalSummary: '',
      coreSkills: [],
      education: [{ institution: '', degree: '', dates: '' }],
      experience: [{ title: '', company: '', dates: '', description: '' }],
      projects: [{ name: '', description: '' }],
      achievements: [{ value: '' }],
      certifications: [{ value: '' }],
    });
    setStep('editor');
  };

  const handleUseTestData = () => {
    form.reset(testData);
    setStep('editor');
  };
  
  const handleProceedToEditor = () => {
    setLoadingState('extracting-data');
    startTransition(async () => {
      try {
        const extractedData = await extractResumeDataAction(extractedText);
        form.reset(extractedData);
        setStep('editor');
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Data Parsing Failed',
          description: 'Could not parse structured data from the text. Please proceed with manual entry.',
        });
        handleManualEntry(); // Fallback to manual entry
      } finally {
        setLoadingState('idle');
      }
    });
  };

  const handlePasteAndParse = () => {
    setLoadingState('extracting-data');
    startTransition(async () => {
      try {
        const extractedData = await extractResumeDataAction(extractedText);
        setResumeData(extractedData);
        form.reset(extractedData);
        setStep('results');
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Data Parsing Failed',
          description: 'Could not parse structured data from the text. Please check the format or try manual entry.',
        });
      } finally {
        setLoadingState('idle');
      }
    });
  }

  const onSubmit = (values: ResumeData) => {
    setLoadingState('processing');
    startTransition(async () => {
      try {
        setResumeData(values);
        setStep('results');
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Processing Failed',
          description: 'Could not process your resume. Please check the details and try again.',
        });
      } finally {
        setLoadingState('idle');
      }
    });
  };

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
    setStep('preview');
  };

  const handlePrint = () => {
    window.print();
  };

  const renderLandingPage = () => (
    <div className="text-center">
      <Sparkles className="mx-auto h-16 w-16 text-primary" />
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
        ResumePilot
      </h1>
      <p className="mt-6 text-lg leading-8 text-muted-foreground">
        Craft your perfect resume with professional templates.
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Button size="lg" onClick={() => fileInputRef.current?.click()} disabled={loadingState !== 'idle'}>
          {loadingState === 'extracting-text' ? <Loader2 className="animate-spin" /> : <Upload />}
          Upload Resume
        </Button>
        <Button size="lg" variant="outline" onClick={() => setStep('paste-text')} disabled={loadingState !== 'idle'}>
          <ClipboardPaste />
          Paste Raw Text
        </Button>
        <Button size="lg" variant="outline" onClick={handleManualEntry} disabled={loadingState !== 'idle'}>
          <FilePenLine />
          Enter Manually
          <ArrowRight className="ml-2" />
        </Button>
      </div>
       <div className="mt-4">
        <Button size="sm" variant="secondary" onClick={handleUseTestData} disabled={loadingState !== 'idle'}>
          <TestTube2 className="mr-2" />
          Use Test Data
        </Button>
      </div>
      <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".pdf,.doc,.docx" />
    </div>
  );

  const renderTextReviewPage = () => (
    <Card className="w-full max-w-4xl mx-auto shadow-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
           <Button variant="ghost" size="icon" onClick={() => setStep('landing')}><ChevronLeft /></Button>
           Review Extracted Text
        </CardTitle>
        <CardDescription>
          We've extracted the text from your resume. Please review it below and make any necessary corrections before we parse it.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea 
          value={extractedText}
          onChange={(e) => setExtractedText(e.target.value)}
          className="h-96 text-sm"
          placeholder="Extracted text will appear here..."
        />
        <Button onClick={handleProceedToEditor} size="lg" className="w-full" disabled={loadingState !== 'idle' || !extractedText}>
          {loadingState === 'extracting-data' ? <Loader2 className="animate-spin" /> : <Sparkles className="mr-2" />}
          Proceed to Editor
        </Button>
      </CardContent>
    </Card>
  );

  const renderPasteTextPage = () => (
    <Card className="w-full max-w-4xl mx-auto shadow-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
           <Button variant="ghost" size="icon" onClick={() => setStep('landing')}><ChevronLeft /></Button>
           Paste Raw Resume Text
        </CardTitle>
        <CardDescription>
          Paste the entire content of your resume below. We'll parse it and generate your templates.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea 
          value={extractedText}
          onChange={(e) => setExtractedText(e.target.value)}
          className="h-96 text-sm"
          placeholder="Paste your resume content here..."
        />
        <Button onClick={handlePasteAndParse} size="lg" className="w-full" disabled={loadingState !== 'idle' || !extractedText}>
          {loadingState === 'extracting-data' ? <Loader2 className="animate-spin" /> : <Sparkles className="mr-2" />}
          Parse and Generate Templates
        </Button>
      </CardContent>
    </Card>
  );

  const renderEditorPage = () => {
    return (
      <Card className="w-full max-w-4xl mx-auto shadow-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Button variant="ghost" size="icon" onClick={() => extractedText ? setStep('text-review') : setStep('landing')}><ChevronLeft /></Button>
            Resume Editor
          </CardTitle>
          <CardDescription>Fill in your details to generate your resume. All fields are optional but recommended.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Personal Details */}
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2"><User /> Personal Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={form.control} name="name" render={({ field }) => <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>} />
                  <FormField control={form.control} name="email" render={({ field }) => <FormItem><FormLabel>Email</FormLabel><FormControl><Input placeholder="john.doe@example.com" {...field} /></FormControl><FormMessage /></FormItem>} />
                  <FormField control={form.control} name="mobileNumber" render={({ field }) => <FormItem><FormLabel>Mobile Number</FormLabel><FormControl><Input placeholder="+1 234 567 890" {...field} /></FormControl><FormMessage /></FormItem>} />
                  <FormField control={form.control} name="githubLink" render={({ field }) => <FormItem><FormLabel>GitHub Link</FormLabel><FormControl><Input placeholder="https://github.com/johndoe" {...field} /></FormControl><FormMessage /></FormItem>} />
                  <FormField control={form.control} name="linkedinLink" render={({ field }) => <FormItem><FormLabel>LinkedIn Link</FormLabel><FormControl><Input placeholder="https://linkedin.com/in/johndoe" {...field} /></FormControl><FormMessage /></FormItem>} />
                </div>
              </div>

              {/* Professional Summary */}
              <div className="p-4 border rounded-lg">
                 <h3 className="font-semibold text-lg mb-4 flex items-center gap-2"><FileText/> Professional Summary</h3>
                <FormField control={form.control} name="professionalSummary" render={({ field }) => <FormItem><FormControl><Textarea placeholder="A brief summary of your professional background..." {...field} /></FormControl><FormMessage /></FormItem>} />
              </div>

               {/* Core Skills */}
               <div className="p-4 border rounded-lg">
                 <h3 className="font-semibold text-lg mb-4 flex items-center gap-2"><Sparkles/> Core Skills</h3>
                 <FormField control={form.control} name="coreSkills" render={({ field }) => <FormItem><FormControl><Textarea placeholder="JavaScript, React, Node.js, Python..." {...field} onChange={(e) => field.onChange(e.target.value.split(',').map(s => s.trim()))} value={Array.isArray(field.value) ? field.value.join(', ') : ''} /></FormControl><FormMessage /></FormItem>} />
              </div>

              {/* Education */}
              <div className="p-4 border rounded-lg space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2"><GraduationCap /> Education</h3>
                {eduFields.map((field, index) => (
                  <div key={field.id} className="p-4 border rounded-md relative">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField control={form.control} name={`education.${index}.institution`} render={({ field }) => <FormItem><FormLabel>Institution</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
                      <FormField control={form.control} name={`education.${index}.degree`} render={({ field }) => <FormItem><FormLabel>Degree</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
                      <FormField control={form.control} name={`education.${index}.dates`} render={({ field }) => <FormItem><FormLabel>Dates</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
                    </div>
                    <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeEdu(index)}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => appendEdu({ institution: '', degree: '', dates: '' })}><PlusCircle className="mr-2 h-4 w-4" /> Add Education</Button>
              </div>

              {/* Experience */}
              <div className="p-4 border rounded-lg space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2"><Briefcase /> Experience</h3>
                {expFields.map((field, index) => (
                  <div key={field.id} className="p-4 border rounded-md relative space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField control={form.control} name={`experience.${index}.title`} render={({ field }) => <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
                      <FormField control={form.control} name={`experience.${index}.company`} render={({ field }) => <FormItem><FormLabel>Company</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
                      <FormField control={form.control} name={`experience.${index}.dates`} render={({ field }) => <FormItem><FormLabel>Dates</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
                    </div>
                    <FormField control={form.control} name={`experience.${index}.description`} render={({ field }) => <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>} />
                    <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeExp(index)}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => appendExp({ title: '', company: '', dates: '', description: '' })}><PlusCircle className="mr-2 h-4 w-4" /> Add Experience</Button>
              </div>

              {/* Other Sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Projects */}
                  <div className="p-4 border rounded-lg space-y-4">
                      <h3 className="font-semibold text-lg flex items-center gap-2"><Lightbulb /> Projects</h3>
                      {projFields.map((field, index) => (
                        <div key={field.id} className="p-4 border rounded-md relative space-y-2">
                           <FormField control={form.control} name={`projects.${index}.name`} render={({ field }) => <FormItem><FormLabel>Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
                           <FormField control={form.control} name={`projects.${index}.description`} render={({ field }) => <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>} />
                          <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeProj(index)}><Trash2 className="h-4 w-4" /></Button>
                        </div>
                      ))}
                      <Button type="button" variant="outline" size="sm" onClick={() => appendProj({ name: '', description: '' })}><PlusCircle className="mr-2 h-4 w-4" /> Add Project</Button>
                  </div>

                  {/* Achievements/Certs */}
                  <div className="space-y-4">
                     <div className="p-4 border rounded-lg space-y-4">
                        <h3 className="font-semibold text-lg flex items-center gap-2"><Trophy /> Achievements</h3>
                        {achieveFields.map((field, index) => (
                          <div key={field.id} className="flex items-center gap-2">
                            <FormField control={form.control} name={`achievements.${index}.value`} render={({ field }) => <FormItem className="flex-grow"><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
                            <Button type="button" variant="ghost" size="icon" onClick={() => removeAchieve(index)}><Trash2 className="h-4 w-4" /></Button>
                          </div>
                        ))}
                        <Button type="button" variant="outline" size="sm" onClick={() => appendAchieve({ value: '' })}><PlusCircle className="mr-2 h-4 w-4" /> Add Achievement</Button>
                      </div>
                      <div className="p-4 border rounded-lg space-y-4">
                        <h3 className="font-semibold text-lg flex items-center gap-2"><Award /> Certifications</h3>
                        {certFields.map((field, index) => (
                          <div key={field.id} className="flex items-center gap-2">
                            <FormField control={form.control} name={`certifications.${index}.value`} render={({ field }) => <FormItem className="flex-grow"><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
                            <Button type="button" variant="ghost" size="icon" onClick={() => removeCert(index)}><Trash2 className="h-4 w-4" /></Button>
                          </div>
                        ))}
                        <Button type="button" variant="outline" size="sm" onClick={() => appendCert({ value: '' })}><PlusCircle className="mr-2 h-4 w-4" /> Add Certification</Button>
                      </div>
                  </div>
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={loadingState !== 'idle'}>
                {loadingState === 'processing' ? <Loader2 className="animate-spin" /> : <Sparkles className="mr-2" />}
                Generate Resume
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    );
  };

  const renderResultsPage = () => {
    if (!resumeData) return null;
  
    return (
      <div className="w-full max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
            <Button variant="outline" onClick={() => setStep('editor')}>
                <ChevronLeft className="mr-2" />
                Back to Editor
            </Button>
            <h1 className="text-3xl font-bold text-center">Choose Your Template</h1>
            <div className="w-36"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map(template => (
            <div key={template.id} className="space-y-4 flex flex-col">
              <Card className="flex-grow flex flex-col transform-gpu transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                 <CardHeader>
                    <CardTitle>{template.name}</CardTitle>
                    <CardDescription>{template.category}</CardDescription>
                </CardHeader>
                <CardContent className="p-4 flex-grow flex justify-center items-center bg-secondary rounded-b-lg overflow-hidden">
                    <ResumePreview resumeData={resumeData} templateId={template.id} isPreview />
                </CardContent>
                <div className="p-4 border-t">
                  <Button className="w-full" onClick={() => handleSelectTemplate(template.id)}>
                    <Printer className="mr-2" />
                    Use This Template & Print
                  </Button>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  const renderPreviewPage = () => {
    if (!resumeData) return null;

    return (
        <div className="w-full h-full flex flex-col items-center">
            <div className="w-full max-w-4xl flex justify-between items-center my-8 no-print">
                <Button variant="outline" onClick={() => setStep('results')}>
                    <ChevronLeft className="mr-2" />
                    Back to Templates
                </Button>
                <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setStep('editor')}>
                        <Edit className="mr-2" />
                        Edit Details
                    </Button>
                    <Button onClick={handlePrint}>
                        <Printer className="mr-2" />
                        Print Resume
                    </Button>
                </div>
            </div>
            <div id="printable-area" className="bg-background shadow-lg">
                <ResumePreview resumeData={resumeData} templateId={selectedTemplate} />
            </div>
        </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-12 lg:p-24 bg-background">
        {step === 'landing' && renderLandingPage()}
        {step === 'text-review' && renderTextReviewPage()}
        {step === 'paste-text' && renderPasteTextPage()}
        {step === 'editor' && renderEditorPage()}
        {step === 'results' && renderResultsPage()}
        {step === 'preview' && renderPreviewPage()}
    </main>
  );
}
