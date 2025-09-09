
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
import ScrollAnimation from '@/components/ui/scroll-animation';

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

    // Create a hidden element to render the full-size resume for PDF generation
    const printableArea = document.createElement('div');
    printableArea.id = `printable-area-temp-${templateId}`;
    printableArea.style.position = 'absolute';
    printableArea.style.left = '-9999px';
    printableArea.style.top = '-9999px';
    printableArea.style.width = '794px'; 
    printableArea.style.height = '1123px';
    printableArea.style.background = 'white';
    document.body.appendChild(printableArea);

    const { createRoot } = await import('react-dom/client');
    const tempRoot = createRoot(printableArea);
    tempRoot.render(<ResumePreview resumeData={resumeData!} templateId={templateId} />);
    
    // Wait for the render to complete
    await new Promise(resolve => setTimeout(resolve, 500));

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
    pdf.save(`resume-${templateId}.pdf`);

    // Clean up the temporary element
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
             <ScrollAnimation animation="animate-fadeInUp">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">Choose Your Template</h1>
            </ScrollAnimation>
             <ScrollAnimation animation="animate-fadeInUp" animationOptions={{delay: 200}}>
                <p className="mt-2 text-muted-foreground">
                    Your resume data is ready. Select a design you love, then download it or continue to the editor to make final adjustments.
                </p>
            </ScrollAnimation>
        </header>
        
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {templates.map((template, index) => (
                 <ScrollAnimation 
                    key={template.id}
                    animation="animate-fadeInUp"
                    animationOptions={{ delay: 300 + index * 100 }}
                 >
                    <Card className="flex flex-col bg-card/50 border-white/10 overflow-hidden h-full transition-all duration-300 hover:border-primary/50 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/10">
                       <Dialog>
                            <CardHeader className="flex-row items-center justify-between p-4">
                               <div>
                                <CardTitle className="text-base">{template.name}</CardTitle>
                                <p className="text-xs text-muted-foreground">{template.category}</p>
                               </div>
                                <DialogTrigger asChild>
                                    <Button variant="outline" size="icon">
                                        <Expand className="h-4 w-4" />
                                    </Button>
                                </DialogTrigger>
                            </CardHeader>
                            <CardContent className="p-2 bg-muted/30 h-full max-h-[400px] overflow-hidden">
                               <div className="w-full h-full overflow-hidden border rounded-md">
                                    <div className="w-[794px] h-[1123px] origin-top-left bg-white" style={{ transform: 'scale(0.38) translate(-8px, -8px)' }}>
                                        <ResumePreview resumeData={resumeData} templateId={template.id} />
                                    </div>
                               </div>
                            </CardContent>
                            <DialogContent className="max-w-4xl h-[90vh]">
                                <DialogHeader>
                                    <DialogTitle>{template.name} Template</DialogTitle>
                                </DialogHeader>
                                <ScrollArea className="h-full mt-4 pr-4">
                                    <div className="w-[794px] h-[1123px] bg-white shadow-lg mx-auto">
                                        <ResumePreview resumeData={resumeData} templateId={template.id} />
                                    </div>
                                </ScrollArea>
                            </DialogContent>
                       </Dialog>
                        <CardFooter className="flex gap-2 p-4 mt-auto bg-card">
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
                        </CardFooter>
                    </Card>
                 </ScrollAnimation>
            ))}
        </main>
    </div>
  );
}
