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


type LoadingState = 'idle' | 'extracting-text' | 'extracting-data' | 'processing';

export default function Home() {
  const [step, setStep] = useState<'landing' | 'text-review' | 'paste-text' | 'editor' | 'results'>('landing');
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [extractedText, setExtractedText] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
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

  const handlePrint = (templateId: string) => {
    setSelectedTemplate(templateId);
    setTimeout(() => {
        window.print();
        setSelectedTemplate(null);
    }, 100);
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

    if (selectedTemplate) {
      return (
          <div id="printable-area" className="w-full h-full">
              <ResumePreview resumeData={resumeData} templateId={selectedTemplate} />
          </div>
      );
    }
  
    return (
      <div className="w-full max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center no-print">
            <Button variant="outline" onClick={() => setStep('editor')}>
                <ChevronLeft className="mr-2" />
                Back to Editor
            </Button>
            <h1 className="text-3xl font-bold text-center">Choose Your Template</h1>
            <div className="w-36"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {templates.map(template => (
            <div key={template.id} className="space-y-4">
              <Card className="transform-gpu transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl">
                 <CardHeader>
                    <CardTitle>{template.name}</CardTitle>
                    <CardDescription>{template.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="w-full aspect-[1/1.414] overflow-hidden rounded-lg border bg-white shadow-inner">
                    <div className="w-[794px] h-[1123px] origin-top-left -translate-x-[42.5%] -translate-y-[42.5%] scale-[0.15]">
                      <ResumePreview resumeData={resumeData} templateId={template.id} isPreview />
                    </div>
                  </div>
                </CardContent>
                <div className="p-6 pt-0">
                  <Button className="w-full" onClick={() => handlePrint(template.id)}>
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

  return (
    <main className={cn(
        "flex min-h-screen flex-col items-center justify-center p-4 md:p-12 lg:p-24",
        selectedTemplate && "p-0 bg-transparent shadow-none"
    )}>
      {step === 'landing' && <div className="no-print">{renderLandingPage()}</div>}
      {step === 'text-review' && <div className="no-print">{renderTextReviewPage()}</div>}
      {step === 'paste-text' && <div className="no-print">{renderPasteTextPage()}</div>}
      {step === 'editor' && <div className="no-print">{renderEditorPage()}</div>}
      {step === 'results' && renderResultsPage()}
    </main>
  );
}
