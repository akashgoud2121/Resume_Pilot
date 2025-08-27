// This is a placeholder for the resume editor page.
// The actual resume data will be passed via router state or fetched.
'use client';

import { useLayoutEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { ResumeData } from '@/lib/types';
import { Button } from '@/components/ui/button';

export default function EditorPage() {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const router = useRouter();

  useLayoutEffect(() => {
    // This is a temporary solution to get the data from router state.
    // In a real app, you might pass an ID and fetch or use a state manager.
    const state = history.state as { resumeData?: ResumeData };
    if (state?.resumeData) {
      setResumeData(state.resumeData);
    } else {
      // If no data, it's a "Start from Scratch" case or direct navigation.
      // For now, we can initialize with empty data.
      setResumeData({ name: '', email: '' });
    }
  }, []);

  const handleGoBack = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Resume Editor</h1>
            <Button onClick={handleGoBack}>Back to Home</Button>
        </div>
        
        {resumeData ? (
          <div>
            <h2 className="text-xl font-semibold mb-4">Extracted Data (Placeholder)</h2>
            <pre className="bg-card p-4 rounded-lg text-card-foreground text-sm overflow-auto">
              {JSON.stringify(resumeData, null, 2)}
            </pre>
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground">Loading editor...</p>
          </div>
        )}
      </div>
    </div>
  );
}
