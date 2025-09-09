
'use client';

import { useState, useEffect, useLayoutEffect, Suspense } from 'react';
import { useRouter, useSearchParams, type NextRouter } from 'next/navigation';
import { useForm, FormProvider, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, ArrowLeft, Download, Palette, Menu } from 'lucide-react';
import { ResumeEditorForm } from '@/components/resume-editor-form';
import { ResumePreview } from '@/components/resume-preview';
import type { ResumeData } from '@/lib/types';
import { resumeSchema } from '@/lib/types';
import { templates } from '@/lib/templates';
import { useToast } from '@/hooks/use-toast';
import { DUMMY_RESUME_DATA } from '@/lib/dummy-data';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';


// Moved EditorSidebar outside of EditorPageContent to prevent re-creation on every render
const EditorSidebar = ({ form, router, setIsSidebarOpen }: { form: UseFormReturn<ResumeData>, router: NextRouter, setIsSidebarOpen: (isOpen: boolean) => void }) => (
    <div className="flex flex-col h-full bg-card border-r border-border">
        <header className="flex items-center justify-between p-4 border-b border-border">
             <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => router.back()} className="h-8 w-8">
                    <ArrowLeft />
                </Button>
                <h2 className="font-semibold text-lg">Editor</h2>
             </div>
             <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)} className="h-8 w-8 hidden lg:flex">
                 <ArrowLeft />
             </Button>
        </header>
        <ScrollArea className="flex-1">
            <ResumeEditorForm form={form} />
        </ScrollArea>
    </div>
);

function EditorPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const [isDownloading, setIsDownloading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>(templates[0].id);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
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
      const validated = resumeSchema.safeParse(initialData);
      if (validated.success) {
        form.reset(validated.data);
      } else {
        console.error("Validation failed for initial data:", validated.error);
        form.reset(DUMMY_RESUME_DATA);
        toast({
          title: "Data Validation Failed",
          description: "There was an issue with the resume data format. Loading sample data instead.",
          variant: "destructive",
        });
      }
    } else if (!isNew) {
      router.push('/');
      return;
    } else {
       form.reset(DUMMY_RESUME_DATA);
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
    setIsDownloading(false);
  };

  return (
    <div className="flex h-screen bg-background text-foreground">
        {/* Mobile Sidebar */}
         <Sheet open={isSidebarOpen && window.innerWidth < 1024} onOpenChange={setIsSidebarOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50 lg:hidden bg-background/50 backdrop-blur-sm">
                    <Menu/>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-80">
                <EditorSidebar form={form} router={router} setIsSidebarOpen={setIsSidebarOpen} />
            </SheetContent>
        </Sheet>
        
        {/* Desktop Sidebar */}
        <aside className={cn(
            "hidden lg:block transition-all duration-300 ease-in-out",
            isSidebarOpen ? "w-96" : "w-0"
        )}>
           {isSidebarOpen && <EditorSidebar form={form} router={router} setIsSidebarOpen={setIsSidebarOpen} />}
        </aside>

        {/* Main Content */}
        <FormProvider {...form}>
            <div className="flex-1 flex flex-col bg-muted/40">
                <header className="bg-background/80 backdrop-blur-sm rounded-lg p-2 m-4 border flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-2">
                        {!isSidebarOpen && (
                             <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(true)} className="h-8 w-8 hidden lg:flex">
                                 <Menu />
                             </Button>
                        )}
                        <Palette className="text-primary hidden sm:block"/>
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
                </header>

                <ScrollArea className="flex-1">
                    <div className="flex items-start justify-center p-4 lg:p-8">
                       <div id="printable-area" className="w-[210mm] h-[297mm] shadow-2xl bg-white">
                         <ResumePreview resumeData={watchedData} templateId={selectedTemplate} />
                       </div>
                    </div>
                </ScrollArea>
            </div>
        </FormProvider>
      </div>
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
