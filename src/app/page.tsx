'use client';

import { useState, useRef, useTransition } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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
  Github,
  Linkedin,
  Mail,
  Phone,
  User,
  ExternalLink,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ResumePreview } from '@/components/resume-preview';
import { templates } from '@/lib/templates';
import type { ResumeData, AtsResult } from '@/lib/types';
import { extractResumeDataAction, calculateAtsScoreAction, getDetailedFeedbackAction } from './actions';
import { resumeSchema } from '@/lib/types';

type LoadingState = 'idle' | 'extracting' | 'analyzing' | 'feedback';

export default function Home() {
  const [step, setStep] = useState<'landing' | 'editor' | 'results'>('landing');
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const [resumeData, setResumeData] = useState<Partial<ResumeData> | null>(null);
  const [atsResult, setAtsResult] = useState<AtsResult | null>(null);
  const [isPending, startTransition] = useTransition();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof resumeSchema>>({
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
      setLoadingState('extracting');
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        startTransition(async () => {
          try {
            const dataUri = reader.result as string;
            const extractedData = await extractResumeDataAction(dataUri);
            setResumeData(extractedData);
            form.reset(extractedData);
            setStep('editor');
          } catch (error) {
            toast({
              variant: 'destructive',
              title: 'Extraction Failed',
              description: 'Could not extract data from the resume. Please try again or enter details manually.',
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
    setResumeData({});
    form.reset();
    setStep('editor');
  };

  const onSubmit = (values: z.infer<typeof resumeSchema>) => {
    setLoadingState('analyzing');
    startTransition(async () => {
      try {
        const fullResumeData = values as ResumeData;
        const result = await calculateAtsScoreAction(fullResumeData);
        setAtsResult(result);
        setResumeData(fullResumeData);
        setStep('results');
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Analysis Failed',
          description: 'Could not analyze your resume. Please check the details and try again.',
        });
      } finally {
        setLoadingState('idle');
      }
    });
  };

  const handleGetDetailedFeedback = () => {
    if (!resumeData || !atsResult) return;
    setLoadingState('feedback');
    startTransition(async () => {
      try {
        const resumeText = Object.values(resumeData).flat().join(' ');
        const { feedback } = await getDetailedFeedbackAction(resumeText, atsResult.atsScore);
        setAtsResult(prev => prev ? { ...prev, detailedFeedback: feedback } : null);
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Feedback Failed',
          description: 'Could not generate detailed feedback. Please try again later.',
        });
      } finally {
        setLoadingState('idle');
      }
    });
  };

  const renderLandingPage = () => (
    <div className="text-center">
      <Sparkles className="mx-auto h-16 w-16 text-primary" />
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
        ResumePilot
      </h1>
      <p className="mt-6 text-lg leading-8 text-muted-foreground">
        Craft your perfect resume with AI-powered ATS scoring and professional templates.
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Button size="lg" onClick={() => fileInputRef.current?.click()} disabled={loadingState !== 'idle'}>
          {loadingState === 'extracting' ? <Loader2 className="animate-spin" /> : <Upload />}
          Upload Resume
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

  const renderEditorPage = () => {
    const { fields: eduFields, append: appendEdu, remove: removeEdu } = useFieldArray({ control: form.control, name: 'education' });
    const { fields: expFields, append: appendExp, remove: removeExp } = useFieldArray({ control: form.control, name: 'experience' });
    const { fields: projFields, append: appendProj, remove: removeProj } = useFieldArray({ control: form.control, name: 'projects' });
    const { fields: achieveFields, append: appendAchieve, remove: removeAchieve } = useFieldArray({ control: form.control, name: 'achievements' });
    const { fields: certFields, append: appendCert, remove: removeCert } = useFieldArray({ control: form.control, name: 'certifications' });
    
    return (
      <Card className="w-full max-w-4xl mx-auto shadow-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Button variant="ghost" size="icon" onClick={() => setStep('landing')}><ChevronLeft /></Button>
            Resume Editor
          </CardTitle>
          <CardDescription>Fill in your details to get started. All fields are optional but recommended.</CardDescription>
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
                {loadingState === 'analyzing' ? <Loader2 className="animate-spin" /> : <Sparkles className="mr-2" />}
                Analyze My Resume
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    );
  };

  const renderResultsPage = () => {
    if (!atsResult || !resumeData) return null;
    const scoreColor = atsResult.atsScore >= 80 ? 'text-green-500' : atsResult.atsScore >= 50 ? 'text-yellow-500' : 'text-red-500';
  
    return (
      <div className="w-full max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
            <Button variant="outline" onClick={() => setStep('editor')}>
                <ChevronLeft className="mr-2" />
                Back to Editor
            </Button>
            <h1 className="text-3xl font-bold text-center">Your Results</h1>
            <div className="w-36"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-1 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle>ATS Score</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <div className="relative h-40 w-40">
                <svg className="h-full w-full" viewBox="0 0 100 100">
                  <circle className="text-border" strokeWidth="10" stroke="currentColor" fill="transparent" r="45" cx="50" cy="50" />
                  <circle
                    className={scoreColor}
                    strokeWidth="10"
                    strokeDasharray={2 * Math.PI * 45}
                    strokeDashoffset={2 * Math.PI * 45 * (1 - atsResult.atsScore / 100)}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="45"
                    cx="50"
                    cy="50"
                    style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
                  />
                </svg>
                <div className={`absolute inset-0 flex items-center justify-center text-4xl font-bold ${scoreColor}`}>
                  {atsResult.atsScore}
                </div>
              </div>
              <Progress value={atsResult.atsScore} className="w-full" />
              <p className="text-muted-foreground text-center">This score predicts how well your resume will pass through automated screening systems.</p>
            </CardContent>
          </Card>
  
          <Card className="lg:col-span-2 shadow-lg">
            <CardHeader>
              <CardTitle>AI Feedback</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold">Initial Suggestions</h4>
                <p className="text-muted-foreground">{atsResult.feedback}</p>
              </div>
              {atsResult.atsScore < 80 && (
                <div>
                  {atsResult.detailedFeedback ? (
                    <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                       <h4 className="font-semibold">Detailed Improvements</h4>
                       <p className="text-muted-foreground whitespace-pre-wrap">{atsResult.detailedFeedback}</p>
                    </div>
                  ) : (
                    <Button onClick={handleGetDetailedFeedback} disabled={loadingState !== 'idle'}>
                      {loadingState === 'feedback' ? <Loader2 className="animate-spin" /> : <Sparkles className="mr-2" />}
                      Get Detailed Improvement Plan
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
  
        <div>
          <h2 className="text-2xl font-bold text-center mb-6">Choose Your Template</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {templates.map(template => (
              <Dialog key={template.id}>
                <DialogTrigger asChild>
                  <Card className="cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-transform duration-300 group">
                    <CardContent className="p-0">
                      <img
                        src={template.image}
                        alt={template.name}
                        width={400}
                        height={565}
                        className="rounded-t-lg aspect-[1/1.414] object-cover"
                        data-ai-hint="resume template"
                      />
                    </CardContent>
                    <CardHeader>
                      <CardTitle>{template.name}</CardTitle>
                      <Badge variant="outline">{template.category}</Badge>
                    </CardHeader>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
                  <DialogHeader>
                    <DialogTitle>{template.name} Template Preview</DialogTitle>
                  </DialogHeader>
                  <div className="flex-grow overflow-auto bg-gray-200 p-4 rounded-md">
                    <ResumePreview resumeData={resumeData as ResumeData} templateId={template.id} />
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-12 lg:p-24">
      {step === 'landing' && renderLandingPage()}
      {step === 'editor' && renderEditorPage()}
      {step === 'results' && renderResultsPage()}
    </main>
  );
}
