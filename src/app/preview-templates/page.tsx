
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Download, PenSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { ResumeData } from '@/lib/types';
import { templates } from '@/lib/templates';
import { ResumePreview } from '@/components/resume-preview';
import { DUMMY_RESUME_DATA } from '@/lib/dummy-data';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import Autoplay from "embla-carousel-autoplay"


export default function PreviewTemplatesPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState<string | null>(null);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()
  const [selectedSnap, setSelectedSnap] = useState(0)

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
  
  const onSelect = useCallback((api: CarouselApi) => {
    if (!api) return;
    setSelectedSnap(api.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!carouselApi) return;
    
    onSelect(carouselApi);
    carouselApi.on("select", onSelect);

    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi, onSelect]);

  const handleEdit = () => {
    const templateId = templates[selectedSnap].id;
    history.pushState({ resumeData }, '', `/editor?template=${templateId}`);
    router.push(`/editor?template=${templateId}`);
  };

  const handleDownload = async () => {
    const templateId = templates[selectedSnap].id;
    setIsDownloading(templateId);
    
    const printableArea = document.createElement('div');
    printableArea.id = `printable-area-temp-${templateId}`;
    printableArea.className = "w-[210mm] h-[297mm] bg-white absolute -top-[9999px] -left-[9999px]";
    document.body.appendChild(printableArea);

    const tempRoot = (await import('react-dom/client')).createRoot(printableArea);
    tempRoot.render(<ResumePreview resumeData={resumeData!} templateId={templateId} />);
    
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
    <div className="min-h-screen bg-background p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center">
        <header className="text-center mb-8 md:mb-12 max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground animate-fadeInUp">Choose Your Template</h1>
            <p className="mt-2 text-muted-foreground animate-fadeInUp animation-delay-300">
                Your resume is ready. Select a design you love, then download or edit it to perfection.
            </p>
        </header>
        
        <main className="w-full max-w-5xl flex flex-col items-center gap-8">
            <Carousel
                setApi={setCarouselApi}
                opts={{
                    align: "center",
                    loop: true,
                }}
                plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
                className="w-full max-w-lg animate-scaleIn"
            >
                <CarouselContent>
                    {templates.map((template, index) => (
                        <CarouselItem key={template.id}>
                           <div className="w-full h-full overflow-hidden rounded-lg shadow-2xl bg-white aspect-[210/297]">
                                <div className="w-[794px] h-[1123px] origin-top-left bg-white transform scale-[var(--scale-factor)]" style={{ '--scale-factor': 'calc(100% / 794px)' } as React.CSSProperties}>
                                    <ResumePreview
                                        resumeData={resumeData}
                                        templateId={template.id}
                                    />
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="text-white -left-12"/>
                <CarouselNext className="text-white -right-12"/>
            </Carousel>

            <div className="flex flex-col items-center gap-4 w-full animate-fadeInUp animation-delay-500">
                <h3 className="text-xl font-semibold">{templates[selectedSnap]?.name}</h3>
                <div className="flex space-x-2">
                  {templates.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => carouselApi?.scrollTo(index)}
                      className={cn(
                        "h-2 w-2 rounded-full transition-all duration-300",
                        selectedSnap === index ? "bg-primary w-6" : "bg-muted"
                      )}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>

                <div className="flex gap-4 mt-4">
                    <Button
                        variant="outline"
                        size="lg"
                        className="w-40"
                        onClick={handleDownload}
                        disabled={!!isDownloading}
                    >
                        {isDownloading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Download className="mr-2 h-4 w-4" />
                        )}
                        Download
                    </Button>
                    <Button 
                        size="lg"
                        className="w-40"
                        onClick={handleEdit}
                        disabled={!!isDownloading}
                    >
                        <PenSquare className="mr-2 h-4 w-4" />
                        Edit & Finalize
                    </Button>
                </div>
            </div>
        </main>
    </div>
  );
}
