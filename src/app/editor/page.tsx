
'use client';

import { useState, useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { ResumeData } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { DUMMY_RESUME_DATA } from '@/lib/dummy-data';
import { resumeSchema } from '@/lib/types';

export default function EditorPage() {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useLayoutEffect(() => {
    let initialData: ResumeData | null = null;
    try {
      const stateFromHistory = history.state as { resumeData?: ResumeData };
      if (stateFromHistory?.resumeData && Object.keys(stateFromHistory.resumeData).length > 2) {
         initialData = stateFromHistory.resumeData;
      } else if (sessionStorage.getItem('resumeData')) {
        initialData = JSON.parse(sessionStorage.getItem('resumeData')!);
      }
    } catch (error) {
      console.error("Failed to load resume data from history or sessionStorage:", error);
      toast({
        title: "Error Loading Data",
        description: "Could not load your resume data.",
        variant: "destructive",
      });
    }

    if (initialData) {
        const validated = resumeSchema.safeParse(initialData);
        if(validated.success){
            setResumeData(validated.data);
        } else {
             console.error("Validation failed for initial data:", validated.error);
             setResumeData(DUMMY_RESUME_DATA); // Fallback to dummy data
             toast({
                title: "Data Validation Failed",
                description: "There was an issue with the resume data format. Showing sample data.",
                variant: "destructive",
            });
        }
    } else {
        // Fallback if no data is found
        setResumeData(DUMMY_RESUME_DATA);
    }
    setLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex h-screen bg-muted/40">
      <div className="w-full h-screen flex flex-col">
        <div className="p-4 border-b bg-background flex justify-between items-center">
            <Button variant="outline" onClick={() => router.push('/')}>
                <ArrowLeft className="mr-2" /> Back to Home
            </Button>
            <h1 className="text-xl font-bold">Parsed Resume Data</h1>
        </div>
        <div className="flex-1 p-8 overflow-auto">
            {loading ? (
                <div className="flex justify-center items-center h-full">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : (
                <pre className="bg-card p-4 rounded-lg text-sm text-card-foreground whitespace-pre-wrap">
                    {JSON.stringify(resumeData, null, 2)}
                </pre>
            )}
        </div>
      </div>
    </div>
  );
}
