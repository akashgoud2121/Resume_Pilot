
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Download, PenSquare, Expand } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { ResumeData } from '@/lib/types';
import { templates } from '@/lib/templates';
import { ResumePreview } from '@/components/resume-preview';
import { DUMMY_RESUME_DATA } from '@/lib/dummy-data';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function PreviewTemplatesPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState<string | null>(null);

  useEffect(() => {
    try {
        const stateFromHistory = history.state as { resumeData?: ResumeData };
        if (stateFromHistory?.resumeData && Object.keys(stateFromHistory.resumeData).length > 2) {
            setResumeData(stateFromHistory.resumeData);
        } else {
            const storedData = sessionStorage.getItem('resumeData');
            if (storedData) {
                setResumeData(JSON.parse(storedData));
            } else {
                setResumeData(DUMMY_RESUME_DATA);
                toast({
                    title: "No Resume Data Found",
                    description: "Displaying sample data. Please upload your resume to see personalized previews.",
                });
            }
        }
    } catch (error) {
        console.error("Failed to load resume data:", error);
        setResumeData(DUMMY_RESUME_DATA); // Fallback
        toast({
            title: "Error Loading Data",
            description: "Could not load your resume data. Displaying sample data instead.",
            variant: "destructive",
        });
    } finally {
        setIsLoading(false);
    }
  }, [toast]);

  const handleEdit = (templateId: string) => {
    history.pushState({ resumeData }, '', `/editor?template=${templateId}`);
    router.push(`/editor?template=${templateId}`);
  };

  const handleDownload = async (templateId: string) => {
    setIsDownloading(templateId);

    const printableArea = document.createElement('div');
    printableArea.id = `printable-area-temp-${templateId}`;
    // Position it off-screen
    printableArea.style.position = 'absolute';
    printableArea.style.left = '-9999px';
    printableArea.style.top = '-9999px';
    // Set it to the exact A4 dimensions in pixels (at 96 DPI)
    printableArea.style.width = '794px';
    printableArea.style.height = '1123px';
    printableArea.style.background = 'white';
    document.body.appendChild(printableArea);

    const tempRoot = (await import('react-dom/client')).createRoot(printableArea);
    tempRoot.render(<ResumePreview resumeData={resumeData!} templateId={templateId} />);
    
    await new Promise(resolve => setTimeout(resolve, 500));

    const canvas = await html2canvas(printableArea, {
        scale: 2, // Higher scale for better quality
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
    pdf.save(`resume-${templateId}.pdf`);

    // Cleanup
    tempRoot.unmount();
    document.body.removeChild(printableArea);
    
    setIsDownloading(null);
  };

  if (isLoading || !resumeData) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-4 text-lg">Generating Previews...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 md:p-8">
        <header className="text-center mb-8 md:mb-12 max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground animate-fadeInUp">Choose Your Template</h1>
            <p className="mt-2 text-muted-foreground animate-fadeInUp animation-delay-300">
                Your resume is ready. Select a design you love, then download or edit it to perfection.
            </p>
        </header>
        
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {templates.map((template) => (
                <Card key={template.id} className="flex flex-col animate-fadeInUp animation-delay-500 overflow-hidden">
                    <Dialog>
                       <DialogTrigger asChild>
                         <CardContent className="p-4 bg-muted/30 aspect-[210/297] cursor-pointer group relative">
                            <div className="w-[794px] h-[1123px] origin-top-left bg-white transform scale-[0.3]">
                                <ResumePreview resumeData={resumeData} templateId={template.id} />
                            </div>
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Expand className="text-white h-12 w-12" />
                            </div>
                         </CardContent>
                       </DialogTrigger>
                       <DialogContent className="max-w-4xl h-[90vh]">
                          <DialogHeader>
                            <DialogTitle>{template.name} Template</DialogTitle>
                          </DialogHeader>
                          <ScrollArea className="h-full">
                            <div className="w-[794px] h-[1123px] origin-top-left bg-white transform scale-[0.9] -translate-x-10 -translate-y-10">
                                <ResumePreview resumeData={resumeData} templateId={template.id} />
                            </div>
                          </ScrollArea>
                       </DialogContent>
                    </Dialog>

                    <CardFooter className="flex-col items-start p-4 mt-auto">
                        <h3 className="font-semibold">{template.name}</h3>
                        <p className="text-xs text-muted-foreground">{template.category}</p>
                        <div className="flex gap-2 mt-4 w-full">
                             <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => handleDownload(template.id)}
                                disabled={isDownloading === template.id}
                            >
                                {isDownloading === template.id ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <Download className="mr-2 h-4 w-4" />
                                )}
                                Download
                            </Button>
                            <Button 
                                className="w-full"
                                onClick={() => handleEdit(template.id)}
                                disabled={!!isDownloading}
                            >
                                <PenSquare className="mr-2 h-4 w-4" />
                                Edit
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            ))}
        </main>
    </div>
  );
}
