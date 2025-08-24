'use client';

import React from 'react';
import type { ResumeData } from '@/lib/types';
import { Button } from './ui/button';
import { Download } from 'lucide-react';
import { DefaultTemplate } from './resume-templates/default-template';
// In a real app, you would import other templates and have a switch here
// import { ModernTemplate } from './resume-templates/modern-template';

interface ResumePreviewProps {
  resumeData: ResumeData;
  templateId: string;
}

export function ResumePreview({ resumeData, templateId }: ResumePreviewProps) {
  const handlePrint = () => {
    window.print();
  };

  const renderTemplate = () => {
    // This is where you would switch between different template components
    switch (templateId) {
      // case 'modern':
      //   return <ModernTemplate data={resumeData} />;
      default:
        return <DefaultTemplate data={resumeData} />;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="no-print mb-4 flex justify-end">
        <Button onClick={handlePrint}>
          <Download className="mr-2 h-4 w-4" />
          Download as PDF
        </Button>
      </div>
      <div id="printable-resume-container" className="flex-grow">
        <div className="printable-resume bg-white shadow-lg mx-auto p-2 md:p-4 lg:p-6" style={{ width: '210mm', minHeight: '297mm' }}>
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
}
