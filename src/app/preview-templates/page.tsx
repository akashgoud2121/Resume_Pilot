
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
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
    const printableArea = document.getElementById(`printable-area-${templateId}`);

    if (printableArea) {
      const canvas = await html2canvas(printableArea, {
        scale: 2,
        useCORS: true,
        logging: false,
        width: printableArea.scrollWidth,
        height: printableArea.scrollHeight,
        windowWidth: printableArea.scrollWidth,
        windowHeight: printableArea.scrollHeight,
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
    } else {
        toast({
            title: "Download Failed",
            description: "Could not find the resume content to download.",
            variant: "destructive",
        });
    }
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
    <div className="min-h-screen bg-muted/40 p-4 sm:p-6 md:p-8">
        <header className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Choose Your Template</h1>
            <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
                Your resume data has been populated into our templates. Select a design you like to download it, edit it, or click the expand icon to get a closer look.
            </p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template) => (
              <Dialog key={template.id}>
                <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
                    <CardContent className="p-4 flex-grow relative group">
                       <div className="aspect-[210/297] w-full overflow-hidden border rounded-lg bg-white cursor-pointer">
                          <DialogTrigger asChild>
                            <div>
                              <div className="transform scale-[0.27] origin-top-left w-[777px] h-[1100px] pointer-events-none">
                                <ResumePreview
                                    resumeData={resumeData}
                                    templateId={template.id}
                                    isGallery={true}
                                />
                              </div>
                              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Expand className="h-12 w-12 text-white" />
                              </div>
                            </div>
                          </DialogTrigger>
                       </div>
                    </CardContent>
                    <CardFooter className="bg-background/50 p-3 flex flex-col items-stretch gap-2 border-t">
                        <h3 className="font-semibold text-center">{template.name}</h3>
                        <div className="flex gap-2 w-full">
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => handleDownload(template.id)}
                                disabled={!!isDownloading}
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
                <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
                  <DialogHeader>
                    <DialogTitle>{template.name} Template Preview</DialogTitle>
                  </DialogHeader>
                  <ScrollArea className="flex-1 -mx-6">
                    <div className="flex items-start justify-center p-4">
                      <ResumePreview
                        resumeData={resumeData}
                        templateId={template.id}
                      />
                    </div>
                  </ScrollArea>
                </DialogContent>
              </Dialog>
            ))}
        </div>
        
        <div className="absolute -left-[9999px] -top-[9999px] opacity-0 pointer-events-none">
            {templates.map(template => (
                 <div key={`pdf-${template.id}`} id={`printable-area-${template.id}`} className="w-[210mm] h-[297mm]">
                    <ResumePreview resumeData={resumeData} templateId={template.id} />
                 </div>
            ))}
        </div>
    </div>
  );
}
