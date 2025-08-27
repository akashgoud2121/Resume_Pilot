'use client';

import { useState, useLayoutEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { ResumeData } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Download, ArrowLeft, Loader2, Palette, Printer } from 'lucide-react';
import { ResumePreview } from '@/components/resume-preview';
import { ResumeEditorForm } from '@/components/resume-editor-form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { templates } from '@/lib/templates';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { DUMMY_RESUME_DATA } from '@/lib/dummy-data';

export default function EditorPage() {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [template, setTemplate] = useState('default');
  const [isPrinting, setIsPrinting] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  useLayoutEffect(() => {
    try {
      const stateFromHistory = history.state as { resumeData?: ResumeData };
      if (stateFromHistory?.resumeData && Object.keys(stateFromHistory.resumeData).length > 2) { // More than name/email
        setResumeData(stateFromHistory.resumeData);
        return;
      }

      // Fallback for direct navigation or empty state
      const fromScratch = searchParams.get('new') === 'true';
      if(fromScratch) {
        setResumeData(DUMMY_RESUME_DATA);
      } else if (sessionStorage.getItem('resumeData')) {
        setResumeData(JSON.parse(sessionStorage.getItem('resumeData')!));
      } else {
        setResumeData(DUMMY_RESUME_DATA);
      }
    } catch (error) {
      console.error("Failed to load resume data:", error);
      setResumeData(DUMMY_RESUME_DATA); // Load dummy data on error
      toast({
        title: "Error Loading Data",
        description: "Could not load your resume data. Starting with a sample.",
        variant: "destructive",
      });
    }
  }, [searchParams, toast]);
  
  const handleFormChange = useCallback((data: ResumeData) => {
    setResumeData(data);
    sessionStorage.setItem('resumeData', JSON.stringify(data));
  }, []);

  const handleDownloadPdf = async () => {
    setIsPrinting(true);
    try {
      const { default: html2canvas } = await import('html2canvas');
      const { default: jsPDF } = await import('jspdf');

      const element = document.getElementById('printable-area');
      if (!element) return;
      
      const canvas = await html2canvas(element, {
        scale: 4, // Higher scale for better quality
        useCORS: true,
        logging: false,
      });
      
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${resumeData?.name?.replace(' ', '_') ?? 'resume'}_${template}.pdf`);

    } catch (error) {
      console.error("Failed to generate PDF:", error);
      toast({
        title: "PDF Generation Failed",
        description: "There was an error creating the PDF. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsPrinting(false);
    }
  };

  return (
    <div className="flex h-screen bg-muted/40">
      {/* Left Panel: Editor Form */}
      <aside className="w-1/2 h-screen flex flex-col">
        <div className="p-4 border-b bg-background flex justify-between items-center">
            <Button variant="outline" onClick={() => router.push('/')}>
                <ArrowLeft className="mr-2" /> Back to Home
            </Button>
            <h1 className="text-xl font-bold">Resume Editor</h1>
        </div>
        <ScrollArea className="flex-1">
            {resumeData ? (
                <ResumeEditorForm
                    initialData={resumeData}
                    onFormChange={handleFormChange}
                />
            ) : (
                 <div className="flex justify-center items-center h-full">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                 </div>
            )}
        </ScrollArea>
      </aside>

      {/* Right Panel: Preview */}
      <main className="w-1/2 h-screen flex flex-col bg-gray-800/5">
        <div className="p-4 border-b bg-background flex justify-end items-center gap-4">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                        <Palette className="mr-2" />
                        <span>{templates.find(t => t.id === template)?.name ?? 'Select Template'}</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Resume Templates</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={template} onValueChange={setTemplate}>
                        {templates.map(t => (
                            <DropdownMenuRadioItem key={t.id} value={t.id}>{t.name}</DropdownMenuRadioItem>
                        ))}
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>

            <Button onClick={handleDownloadPdf} disabled={isPrinting}>
                {isPrinting ? <Loader2 className="mr-2 animate-spin" /> : <Download className="mr-2" />}
                {isPrinting ? 'Generating...' : 'Download PDF'}
            </Button>
        </div>
        <ScrollArea className="flex-1 p-8">
            <div className="flex justify-center">
                {resumeData ? (
                    <ResumePreview resumeData={resumeData} templateId={template} />
                ) : (
                    <div className="w-[210mm] h-[297mm] bg-white shadow-lg flex justify-center items-center">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                )}
            </div>
        </ScrollArea>
      </main>
    </div>
  );
}
