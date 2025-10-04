
'use client';

import { useState, useEffect, useLayoutEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
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
    defaultValues: resumeSchema.parse({}),
  });

  const watchedData = form.watch();

  useLayoutEffect(() => {
    let initialData: ResumeData | null = null;
    const isNew = searchParams.get('new') === 'true';

    if (isNew) {
      initialData = resumeSchema.parse({});
    } else {
        try {
          const stateFromHistory = history.state as { resumeData?: ResumeData };
          if (stateFromHistory?.resumeData && Object.keys(stateFromHistory.resumeData).length > 0) {
             initialData = stateFromHistory.resumeData;
          } else {
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
        const validatedData = resumeSchema.parse(initialData);
        form.reset(validatedData);
      } catch (error) {
        console.error("Validation failed for initial data:", error);
        toast({
          title: "Data Validation Failed",
          description: "There was an issue with the resume data format. Loading sample data as a fallback.",
          variant: "destructive",
        });
        form.reset(DUMMY_RESUME_DATA);
      }
    } else if (!isNew) {
      toast({
        title: "No Resume Data",
        description: "No resume data found. Redirecting to homepage.",
        variant: "destructive",
      });
      router.push('/');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (Object.keys(watchedData).length > 0) {
      const validatedData = resumeSchema.safeParse(watchedData);
      if(validatedData.success){
          sessionStorage.setItem('resumeData', JSON.stringify(validatedData.data));
      }
    }
  }, [watchedData]);


  const handleDownload = async () => {
    setIsDownloading(true);

    setTimeout(async () => {
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'absolute';
      tempContainer.style.left = '-9999px';
      tempContainer.style.top = '0';
      tempContainer.style.width = '210mm';
      document.body.appendChild(tempContainer);

      const { createRoot } = await import('react-dom/client');
      const tempRoot = createRoot(tempContainer);

      tempRoot.render(
          <div className="bg-white w-full h-full">
              <ResumePreview resumeData={watchedData} templateId={selectedTemplate} />
          </div>
      );
      
      await new Promise(resolve => setTimeout(resolve, 1000));

      try {
          const canvas = await html2canvas(tempContainer, {
              scale: 3,
              useCORS: true,
              logging: false,
              windowWidth: tempContainer.scrollWidth,
              windowHeight: tempContainer.scrollHeight,
          });

          const imgData = canvas.toDataURL('image/jpeg', 0.9);
          const pdf = new jsPDF({
              orientation: 'portrait',
              unit: 'mm',
              format: 'a4',
          });

          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = pdf.internal.pageSize.getHeight();
          const canvasWidth = canvas.width;
          const canvasHeight = canvas.height;
          const ratio = canvasWidth / canvasHeight;

          const imgWidth = pdfWidth;
          const imgHeight = imgWidth / ratio;
          
          let heightLeft = imgHeight;
          let position = 0;

          pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
          heightLeft -= pdfHeight;

          while (heightLeft > 0) {
              position = heightLeft - imgHeight;
              pdf.addPage();
              pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
              heightLeft -= pdfHeight;
          }

          pdf.save(`resume-${selectedTemplate}.pdf`);

      } catch (error) {
          console.error("Error generating PDF:", error);
          toast({
              title: "Download Failed",
              description: "There was an error generating the PDF. Please try again.",
              variant: "destructive"
          });
      } finally {
          tempRoot.unmount();
          document.body.removeChild(tempContainer);
          setIsDownloading(false);
      }
    }, 0);
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
                     <div id="printable-area" className="w-[210mm] min-h-[297mm] shadow-2xl bg-white">
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
