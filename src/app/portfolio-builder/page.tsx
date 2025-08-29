
'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Loader2, Upload, FileText, FileBadge, Briefcase } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateResumeFromPortfolioAction } from '../actions';
import type { PortfolioDocument } from '@/lib/types';
import { ScrollArea } from '@/components/ui/scroll-area';

interface FileUploadProgress {
  file: File;
  progress: number;
}

const FileUploadArea = ({ 
    title, 
    description, 
    icon, 
    onFilesSelected 
}: { 
    title: string; 
    description: string; 
    icon: React.ReactNode;
    onFilesSelected: (files: File[]) => void;
}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            onFilesSelected(Array.from(event.target.files));
        }
    };
    
    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        if (event.dataTransfer.files) {
            onFilesSelected(Array.from(event.dataTransfer.files));
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };

    return (
        <Card 
            className="text-center p-6 border-dashed hover:border-primary/50 transition-all cursor-pointer"
            onClick={() => inputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
        >
            <div className="flex justify-center items-center h-12 w-12 rounded-full bg-muted text-muted-foreground mb-4 mx-auto">
                {icon}
            </div>
            <h3 className="font-semibold">{title}</h3>
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
            <Input 
                ref={inputRef}
                type="file" 
                className="hidden" 
                multiple 
                onChange={handleFileChange} 
            />
        </Card>
    );
};


export default function PortfolioBuilderPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [academicFiles, setAcademicFiles] = useState<File[]>([]);
  const [projectFiles, setProjectFiles] = useState<File[]>([]);
  const [otherFiles, setOtherFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const allFiles = [...academicFiles, ...projectFiles, ...otherFiles];
  
  const fileToDataUri = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
  }

  const handleGenerate = async () => {
    if (allFiles.length === 0) {
      toast({
        title: 'No files selected',
        description: 'Please upload at least one document to generate a resume.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsLoading(true);

    try {
      const documents: PortfolioDocument[] = await Promise.all([
          ...academicFiles.map(async file => ({ type: 'certificate' as const, fileName: file.name, dataUri: await fileToDataUri(file) })),
          ...projectFiles.map(async file => ({ type: 'project' as const, fileName: file.name, dataUri: await fileToDataUri(file) })),
          ...otherFiles.map(async file => ({ type: 'other' as const, fileName: file.name, dataUri: await fileToDataUri(file) }))
      ]);

      const resumeData = await generateResumeFromPortfolioAction(documents);
      
      const resumeJsonString = JSON.stringify(resumeData, null, 2);
      sessionStorage.setItem('resumeText', resumeJsonString);
      history.pushState({ resumeText: resumeJsonString }, '', '/generate');
      router.push('/generate');

    } catch (e: any) {
        console.error("Failed to generate resume from portfolio:", e);
        toast({
            title: 'Generation Failed',
            description: e.message || "We couldn't generate a resume from the provided documents. Please try again.",
            variant: 'destructive',
        });
    } finally {
        setIsLoading(false);
    }
  };

  const renderFilePreview = (files: File[], setFiles: React.Dispatch<React.SetStateAction<File[]>>, category: string) => {
    const removeFile = (index: number) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    return files.length > 0 && (
        <div className="mt-4 space-y-2">
            <h4 className="font-semibold text-sm">{category} Files:</h4>
            {files.map((file, index) => (
                 <div key={`${category}-${index}`} className="flex items-center justify-between text-xs p-2 bg-muted/50 rounded-md">
                    <span className="truncate pr-2">{file.name}</span>
                    <Button variant="ghost" size="sm" onClick={() => removeFile(index)}>Remove</Button>
                </div>
            ))}
        </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4 sm:p-6 md:p-8">
      <Card className="w-full max-w-4xl shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-bold text-center">Portfolio Resume Builder</CardTitle>
          <CardDescription className="text-muted-foreground text-center max-w-2xl mx-auto pt-2">
            Upload your academic certificates, project reports, and other documents. Our AI will synthesize the information to create a comprehensive resume for you.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
                <FileUploadArea 
                    title="Academic Certificates" 
                    description="e.g., Degree, 10th, 12th"
                    icon={<FileBadge />}
                    onFilesSelected={files => setAcademicFiles(prev => [...prev, ...files])}
                />
                <FileUploadArea 
                    title="Project Documents"
                    description="e.g., Reports, Case Studies"
                    icon={<Briefcase />}
                    onFilesSelected={files => setProjectFiles(prev => [...prev, ...files])}
                />
                <FileUploadArea 
                    title="Other Documents"
                    description="e.g., Articles, Awards"
                    icon={<FileText />}
                    onFilesSelected={files => setOtherFiles(prev => [...prev, ...files])}
                />
            </div>
            
            {allFiles.length > 0 && (
                <Card className="p-4 bg-background max-h-64">
                    <CardHeader className="p-0 pb-4">
                        <CardTitle className="text-lg">Uploaded Files</CardTitle>
                    </CardHeader>
                    <ScrollArea className="h-48 pr-4">
                        <CardContent className="p-0">
                           {renderFilePreview(academicFiles, setAcademicFiles, "Academic")}
                           {renderFilePreview(projectFiles, setProjectFiles, "Project")}
                           {renderFilePreview(otherFiles, setOtherFiles, "Other")}
                        </CardContent>
                    </ScrollArea>
                </Card>
            )}

          <div className="flex justify-end pt-4 border-t">
            <Button
              onClick={handleGenerate}
              disabled={isLoading || allFiles.length === 0}
              size="lg"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Upload className="mr-2 h-5 w-5" />
              )}
              {isLoading ? 'Analyzing...' : 'Generate Resume from Portfolio'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
