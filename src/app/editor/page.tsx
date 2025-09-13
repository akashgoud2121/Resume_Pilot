
'use client';

import { useState, useEffect, useLayoutEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { PdfTemplate } from '@/components/resume-templates/pdf-template';

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
    // The defaultValues are now set in useLayoutEffect to prevent uncontrolled component errors.
  });

  const watchedData = form.watch();

  useLayoutEffect(() => {
    let initialData: ResumeData | null = null;
    const isNew = searchParams.get('new') === 'true';

    if (isNew) {
      // For a new resume, create a fully defaulted object by parsing an empty object.
      initialData = resumeSchema.parse({});
    } else {
        try {
          // Prioritize data from navigation state first
          const stateFromHistory = history.state as { resumeData?: ResumeData };
          if (stateFromHistory?.resumeData && Object.keys(stateFromHistory.resumeData).length > 0) {
             initialData = stateFromHistory.resumeData;
          } else {
             // Fallback to session storage if history state is empty
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
    
    if (initialData) {
      try {
        // Rigorously parse and apply defaults to the loaded data.
        const validatedData = resumeSchema.parse(initialData);
        form.reset(validatedData);
      } catch (error) {
        console.error("Validation failed for initial data:", error);
        toast({
          title: "Data Validation Failed",
          description: "There was an issue with the resume data format. Loading sample data as a fallback.",
          variant: "destructive",
        });
        // On validation failure, fall back to a known good, fully defaulted state.
        form.reset(DUMMY_RESUME_DATA);
      }
    } else if (!isNew) {
      // If not creating a new resume and no data could be found anywhere, redirect to home.
      toast({
        title: "No Resume Data",
        description: "No resume data found. Redirecting to homepage.",
        variant: "destructive",
      });
      router.push('/');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on mount

  useEffect(() => {
    // Only stringify and set item if watchedData has been initialized.
    if (Object.keys(watchedData).length > 0) {
      // Use safeParse to avoid throwing errors on intermittent invalid states during editing.
      const validatedData = resumeSchema.safeParse(watchedData);
      if(validatedData.success){
          sessionStorage.setItem('resumeData', JSON.stringify(validatedData.data));
      }
    }
  }, [watchedData]);


  const handleDownload = async () => {
    setIsDownloading(true);
    
    const printableArea = document.createElement('div');
    printableArea.id = 'pdf-render-area';
    printableArea.style.position = 'absolute';
    printableArea.style.left = '-9999px';
    printableArea.style.top = '0';
    printableArea.style.width = '210mm'; // A4 width
    printableArea.style.height = 'auto';
    printableArea.style.background = 'white';
    printableArea.style.fontFamily = 'Arial, sans-serif';
    document.body.appendChild(printableArea);

    const { createRoot } = await import('react-dom/client');
    const tempRoot = createRoot(printableArea);
    
    tempRoot.render(<PdfTemplate data={watchedData} />);
    
    // Allow time for rendering to complete before capturing
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
        });
        
        await pdf.html(printableArea, {
            callback: function (doc) {
                doc.save('resume.pdf');
            },
            html2canvas: {
              scale: 1, // Use a higher scale for better quality
              useCORS: true,
            },
            autoPaging: 'text',
            margin: [15, 15, 15, 15],
            width: 180, // 210mm A4 width - 15mm left margin - 15mm right margin
            windowWidth: 794 // Corresponds to 210mm at 96dpi for internal calculations
        });
        
    } catch(error) {
        console.error("Error generating PDF", error);
        toast({
            title: "Download Failed",
            description: "There was an error generating the PDF. Please try again.",
            variant: "destructive"
        })
    } finally {
        tempRoot.unmount();
        if (document.body.contains(printableArea)) {
            document.body.removeChild(printableArea);
        }
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
