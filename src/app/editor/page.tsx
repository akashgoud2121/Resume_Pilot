
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
    // The defaultValues are now set in useLayoutEffect, guaranteeing they are fully formed.
  });

  const watchedData = form.watch();

  useLayoutEffect(() => {
    let initialData: ResumeData | null = null;
    const isNew = searchParams.get('new') === 'true';

    if (isNew) {
      // For a new resume, create a fully defaulted object.
      initialData = resumeSchema.parse({});
    } else {
        try {
          // Prioritize data from navigation state
          const stateFromHistory = history.state as { resumeData?: ResumeData };
          if (stateFromHistory?.resumeData && Object.keys(stateFromHistory.resumeData).length > 2) {
             initialData = stateFromHistory.resumeData;
          } else {
             // Fallback to session storage
             const storedData = sessionStorage.getItem('resumeData');
             if(storedData) {
                initialData = JSON.parse(storedData);
             }
          }
        } catch (error) {
          console.error("Failed to load or parse resume data:", error);
          toast({
            title: "Error Loading Data",
            description: "Could not load your resume data. Please try again.",
            variant: "destructive",
          });
        }
    }
    
    // If we have any data (from history, storage, or new), validate and set it.
    if (initialData) {
      try {
        // Use parse to rigorously validate and apply all defaults from the schema.
        // This is the key to preventing the uncontrolled-to-controlled error.
        const validatedData = resumeSchema.parse(initialData);
        form.reset(validatedData);
      } catch (error) {
        console.error("Validation failed for initial data:", error);
        toast({
          title: "Data Validation Failed",
          description: "There was an issue with the resume data format. Loading a blank editor.",
          variant: "destructive",
        });
        // Fallback to a known good, fully defaulted state on error
        form.reset(resumeSchema.parse({}));
      }
    } else if (!isNew) {
      // If not creating a new resume and no data could be found, redirect to home.
      router.push('/');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on mount

  useEffect(() => {
    // Only stringify and set item if watchedData is not empty and valid
    if (Object.keys(watchedData).length > 0) {
      const validatedData = resumeSchema.safeParse(watchedData);
      if(validatedData.success){
          sessionStorage.setItem('resumeData', JSON.stringify(validatedData.data));
      }
    }
  }, [watchedData]);


  const handleDownload = async () => {
    setIsDownloading(true);
    
    const printableArea = document.createElement('div');
    printableArea.id = 'printable-area-for-download-temp';
    printableArea.style.position = 'absolute';
    printableArea.style.left = '-9999px';
    printableArea.style.top = '0';
    printableArea.style.width = '210mm';
    printableArea.style.height = '297mm';
    printableArea.style.background = 'white';
    document.body.appendChild(printableArea);

    const { createRoot } = await import('react-dom/client');
    const tempRoot = createRoot(printableArea);
    
    tempRoot.render(<ResumePreview resumeData={watchedData} templateId={selectedTemplate} />);
    
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
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
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight > pdf.internal.pageSize.getHeight() ? pdf.internal.pageSize.getHeight() : pdfHeight);
        pdf.save('resume.pdf');

    } catch(error) {
        console.error("Error generating PDF", error);
        toast({
            title: "Download Failed",
            description: "There was an error generating the PDF. Please try again.",
            variant: "destructive"
        })
    } finally {
        tempRoot.unmount();
        document.body.removeChild(printableArea);
        setIsDownloading(false);
    }
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
