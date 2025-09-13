
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
import jsPDF from 'jspdf';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import ScrollAnimation from '@/components/ui/scroll-animation';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PdfTemplate } from '@/components/resume-templates/pdf-template';

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
    if (!resumeData) return;
    setIsDownloading(templateId);

    const printableArea = document.createElement('div');
    printableArea.id = 'pdf-render-area';
    printableArea.style.position = 'absolute';
    printableArea.style.left = '-9999px';
    printableArea.style.top = '0';
    printableArea.style.width = '210mm'; // A4 width
    printableArea.style.background = 'white';
    printableArea.style.fontFamily = 'Arial, sans-serif';
    document.body.appendChild(printableArea);

    const { createRoot } = await import('react-dom/client');
    const tempRoot = createRoot(printableArea);
    
    // Always use the dedicated PDF template for downloading
    tempRoot.render(<PdfTemplate data={resumeData} />);
    
    // Allow time for rendering
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
        });
        
        await pdf.html(printableArea, {
            callback: function (doc) {
                doc.save(`resume-${templateId}.pdf`);
            },
            html2canvas: {
              scale: 0.5,
            },
            autoPaging: 'text',
            margin: [15, 15, 15, 15],
            width: 180, // 210mm A4 width - 15mm margin on each side
            windowWidth: 794 // Corresponds to 210mm at 96dpi
        });
        
    } catch (error) {
        console.error("Error generating PDF:", error);
        toast({
            title: "Download Failed",
            description: "Could not generate the PDF. Please try again.",
            variant: "destructive",
        });
    } finally {
        tempRoot.unmount();
        document.body.removeChild(printableArea);
        setIsDownloading(null);
    }
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
                    <Dialog>
                        <Card className="flex flex-col bg-card/50 border-white/10 overflow-hidden h-full transition-all duration-300 hover:border-primary/50 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/10">
                            <CardHeader className="flex-row items-center justify-between p-4">
                                <div>
                                <CardTitle className="text-base">{template.name}</CardTitle>
                                <p className="text-xs text-muted-foreground">{template.category}</p>
                                </div>
                                <DialogTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                                        <Expand className="h-4 w-4" />
                                    </Button>
                                </DialogTrigger>
                            </CardHeader>
                            <CardContent className="p-2 bg-muted/30 flex-1 flex items-center justify-center cursor-pointer min-h-[300px] group"
                                style={{
                                    backgroundImage: 'url(https://www.transparenttextures.com/patterns/carbon-fibre.png)',
                                    backgroundSize: '100px',
                                    backgroundColor: 'hsl(var(--card))'
                                }}
                            >
                                <DialogTrigger className="w-full h-full flex items-center justify-center">
                                    <div className="w-[300px] h-[424px] overflow-hidden rounded-lg shadow-2xl bg-white">
                                        <div className="transform scale-[0.38] origin-top-left w-[789px] h-[1116px]">
                                            <ResumePreview resumeData={resumeData} templateId={template.id} />
                                        </div>
                                    </div>
                                </DialogTrigger>
                            </CardContent>
                            <DialogContent className="w-full max-w-[95vw] md:max-w-4xl lg:max-w-5xl h-[95vh] p-4 flex flex-col">
                                <DialogHeader>
                                    <DialogTitle>{template.name} Template Preview</DialogTitle>
                                </DialogHeader>
                                <div className="flex-1 min-h-0 flex items-center justify-center bg-muted/20 rounded-lg">
                                    <ScrollArea className="w-full h-full">
                                         <div className="w-[calc(90vh*0.707)] h-[90vh] mx-auto my-4 origin-center">
                                            <div 
                                                className="bg-white shadow-lg"
                                                style={{
                                                    width: '210mm',
                                                    height: '297mm',
                                                    transformOrigin: 'top left',
                                                    transform: 'scale(calc(90vh / 297mm))',
                                                }}
                                            >
                                                <ResumePreview resumeData={resumeData} templateId={template.id} />
                                            </div>
                                        </div>
                                    </ScrollArea>
                                </div>
                            </DialogContent>
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
                    </Dialog>
                 </ScrollAnimation>
            ))}
        </main>
    </div>
  );
}
