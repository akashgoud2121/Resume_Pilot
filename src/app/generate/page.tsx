
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { extractResumeDataAction } from '../actions';
import type { ResumeData } from '@/lib/types';

export default function GeneratePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [resumeText, setResumeText] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      const stateFromHistory = history.state as { resumeText?: string };
      if (stateFromHistory?.resumeText) {
        setResumeText(stateFromHistory.resumeText);
      } else {
        const storedText = sessionStorage.getItem('resumeText');
        if (storedText) {
          setResumeText(storedText);
        } else {
          toast({
            title: 'No resume text found',
            description: 'Please go back and upload your resume again.',
            variant: 'destructive',
          });
          router.push('/');
        }
      }
    } catch (error) {
      console.error("Failed to load resume text:", error);
      toast({
        title: "Error Loading Data",
        description: "Could not load your resume text. Please try again.",
        variant: "destructive",
      });
      router.push('/');
    }
  }, [router, toast]);

  const handleGenerateResume = async () => {
    if (!resumeText.trim()) {
      toast({
        title: 'Empty Text',
        description: 'The resume text is empty and cannot be processed.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      const resumeData: ResumeData = await extractResumeDataAction(resumeText);
      sessionStorage.setItem('resumeData', JSON.stringify(resumeData));
      history.pushState({ resumeData }, '', '/preview-templates');
      router.push('/preview-templates');
    } catch (e: any) {
      console.error("Failed to generate resume data:", e);
      toast({
        title: 'Generation Failed',
        description: "We couldn't generate a resume from the provided text. Please try again.",
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4 sm:p-6 md:p-8">
      <Card className="w-full max-w-4xl shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-bold text-center">Verify Extracted Text</CardTitle>
          <CardDescription className="text-muted-foreground text-center max-w-2xl mx-auto pt-2">
            Our AI has extracted the text from your resume. Please review it below. You can make edits if needed. When you're ready, click "Generate Resume" to proceed.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            className="w-full h-96 min-h-[24rem] text-sm font-mono bg-muted/50"
            placeholder="Extracted resume text will appear here..."
          />
          <div className="flex justify-end">
            <Button
              onClick={handleGenerateResume}
              disabled={isLoading || !resumeText}
              size="lg"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <ArrowRight className="mr-2 h-5 w-5" />
              )}
              {isLoading ? 'Generating...' : 'Generate Resume'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
