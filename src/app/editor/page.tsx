
'use client';

import { useState, useEffect, useLayoutEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, ArrowLeft, Download, Palette } from 'lucide-react';
import { ResumeEditorForm } from '@/components/resume-editor-form';
import { ResumePreview } from '@/components/resume-preview';
import { SidebarProvider, Sidebar, SidebarTrigger, SidebarContent, SidebarHeader, SidebarInset } from '@/components/ui/sidebar';
import type { ResumeData } from '@/lib/types';
import { resumeSchema } from '@/lib/types';
import { templates } from '@/lib/templates';
import { useToast } from '@/hooks/use-toast';
import { DUMMY_RESUME_DATA } from '@/lib/dummy-data';
import { ScrollArea } from '@/components/ui/scroll-area';


export default function EditorPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const [isDownloading, setIsDownloading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>(templates[0].id);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

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
  }, []);

  useEffect(() => {
    const validatedData = resumeSchema.safeParse(watchedData);
    if(validatedData.success && Object.keys(validatedData.data).length > 0){
        sessionStorage.setItem('resumeData', JSON.stringify(validatedData.data));
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

  if (!isClient) {
    return (
      <div className="flex h-screen items-center justify-center bg-muted/40">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background text-foreground">
        <Sidebar collapsible="icon">
          <SidebarHeader>
             <div className="flex items-center justify-between">
                <Button variant="ghost" size="icon" onClick={() => router.push('/')}>
                    <ArrowLeft />
                </Button>
                <h2 className="font-semibold text-lg">Editor</h2>
                <SidebarTrigger />
             </div>
          </SidebarHeader>
          <ScrollArea className="flex-1">
             <SidebarContent>
                <ResumeEditorForm form={form} />
             </SidebarContent>
          </ScrollArea>
        </Sidebar>
        
        <FormProvider {...form}>
            <SidebarInset className="bg-muted/40 p-4 flex flex-col">
                <header className="bg-background/80 backdrop-blur-sm rounded-lg p-2 mb-4 border flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-2">
                        <Palette className="text-primary"/>
                        <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                        <SelectTrigger className="w-[180px]">
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
                            onClick={handleDownload}
                            disabled={isDownloading}
                        >
                            {isDownloading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Download className="mr-2 h-4 w-4" />
                            )}
                            Download PDF
                        </Button>
                    </div>
                </header>

                <ScrollArea className="flex-1 rounded-lg">
                <div className="flex items-start justify-center p-4">
                    <ResumePreview resumeData={watchedData} templateId={selectedTemplate} />
                </div>
                </ScrollArea>
            </SidebarInset>
        </FormProvider>
      </div>
    </SidebarProvider>
  );
}
