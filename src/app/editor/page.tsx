
'use client';

import { useState, useEffect, useLayoutEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Download, Eye, Code } from 'lucide-react';
import { ResumeEditorForm } from '@/components/resume-editor-form';
import { ResumePreview } from '@/components/resume-preview';
import type { ResumeData } from '@/lib/types';
import { resumeSchema } from '@/lib/types';
import { templates } from '@/lib/templates';
import { useToast } from '@/hooks/use-toast';
import { DUMMY_RESUME_DATA } from '@/lib/dummy-data';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent } from '@/components/ui/dialog';

function EditorPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const [isDownloading, setIsDownloading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>(templates[0].id);
  const [mode, setMode] = useState<'edit' | 'preview'>('edit');

  useEffect(() => {
    const templateId = searchParams.get('template');
    if (templateId && templates.some(t => t.id === templateId)) {
        setSelectedTemplate(templateId);
    }
  }, [searchParams]);

  const form = useForm<ResumeData>({
    resolver: zodResolver(resumeSchema),
    mode: 'onChange',
  });

  const watchedData = form.watch();

  useLayoutEffect(() => {
    let initialData: ResumeData | null = null;
    const isNew = searchParams.get('new') === 'true';

    if (isNew) {
      initialData = DUMMY_RESUME_DATA;
    } else {
        try {
          const stateFromHistory = history.state as { resumeData?: ResumeData };
          if (stateFromHistory?.resumeData && Object.keys(stateFromHistory.resumeData).length > 2) {
             initialData = stateFromHistory.resumeData;
          } else {
             const storedData = sessionStorage.getItem('resumeData');
             if(storedData) {
                initialData = JSON.parse(storedData);
             }
          }
        } catch (error) {
          console.error("Failed to load resume data:", error);
          toast({
            title: "Error Loading Data",
            description: "Could not load your resume data. Please try again.",
            variant: "destructive",
          });
        }
    }
    
    if (initialData) {
      // Use parse to apply defaults and ensure all fields are defined
      const validated = resumeSchema.safeParse(initialData);
      if (validated.success) {
        form.reset(validated.data);
      } else {
        console.error("Validation failed for initial data:", validated.error);
        // Fallback to a known good state
        const defaultValidated = resumeSchema.parse({});
        form.reset(defaultValidated);
        toast({
          title: "Data Validation Failed",
          description: "There was an issue with the resume data format. Loading a blank editor.",
          variant: "destructive",
        });
      }
    } else if (!isNew) {
      router.push('/');
      return;
    } else {
       // For a new resume, ensure it's a fully defaulted object
       const defaultValidated = resumeSchema.parse(DUMMY_RESUME_DATA);
       form.reset(defaultValidated);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Only stringify and set item if watchedData is not empty
    if (Object.keys(watchedData).length > 0) {
      const validatedData = resumeSchema.safeParse(watchedData);
      if(validatedData.success){
          sessionStorage.setItem('resumeData', JSON.stringify(validatedData.data));
      }
    }
  }, [watchedData]);


  const handleDownload = async () => {
    setIsDownloading(true);
    
    // Temporarily switch to preview mode to render the component for download
    setMode('preview');
    // Allow a moment for the preview to render
    await new Promise(resolve => setTimeout(resolve, 50)); 
    
    const printableArea = document.getElementById('printable-area');

    if (printableArea) {
      const canvas = await html2canvas(printableArea, {
        scale: 2, 
        useCORS: true,
        logging: false,
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('resume.pdf');
    }
    
    // Switch back to edit mode after download
    setMode('edit');
    setIsDownloading(false);
  };


  return (
    <FormProvider {...form}>
        <div className="flex flex-col h-screen bg-background text-foreground">
            {/* Header */}
            <header className="bg-card/80 backdrop-blur-sm border-b p-2 flex items-center justify-between shadow-sm z-10">
                <div className="flex items-center gap-2">
                    <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                    <SelectTrigger className="w-[150px] sm:w-[180px]">
                        <SelectValue placeholder="Select a template" />
                    </SelectTrigger>
                    <SelectContent>
                        {templates.map(template => (
                        <SelectItem key={template.id} value={template.id}>
                            {template.name}
                        </SelectItem>
                        ))}
                    </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setMode(mode === 'edit' ? 'preview' : 'edit')}
                    >
                      {mode === 'edit' ? <Eye className="mr-2" /> : <Code className="mr-2" />}
                      {mode === 'edit' ? 'Preview' : 'Editor'}
                    </Button>
                    <Button
                        onClick={handleDownload}
                        disabled={isDownloading}
                        className="flex-shrink-0"
                    >
                        {isDownloading ? (
                            <Loader2 className="mr-0 sm:mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Download className="mr-0 sm:mr-2 h-4 w-4" />
                        )}
                        <span className="hidden sm:inline">Download PDF</span>
                    </Button>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto bg-muted/40">
                {mode === 'edit' ? (
                  <ScrollArea className="h-full">
                      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
                        <ResumeEditorForm form={form} />
                      </div>
                  </ScrollArea>
                ) : (
                  <div className="flex items-start justify-center p-4 lg:p-8">
                     <div id="printable-area" className="w-[210mm] h-[297mm] shadow-2xl bg-white">
                       <ResumePreview resumeData={watchedData} templateId={selectedTemplate} />
                     </div>
                  </div>
                )}
            </div>

            {/* This Dialog is used only for the PDF generation of the hidden preview */}
            <Dialog open={isDownloading}>
              <DialogContent className="p-0 border-0 bg-transparent w-auto h-auto shadow-none" onOpenAutoFocus={(e) => e.preventDefault()}>
                  <div id="printable-area-for-download" className="w-[210mm] h-[297mm] bg-white absolute -left-[9999px] -top-[9999px]">
                    <ResumePreview resumeData={watchedData} templateId={selectedTemplate} />
                  </div>
              </DialogContent>
            </Dialog>
        </div>
    </FormProvider>
  );
}

export default function EditorPage() {
    return (
        <Suspense fallback={
            <div className="flex h-screen items-center justify-center bg-muted/40">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        }>
            <EditorPageContent />
        </Suspense>
    )
}

    