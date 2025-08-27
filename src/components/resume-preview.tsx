
'use client';

import React from 'react';
import type { ResumeData } from '@/lib/types';
import { cn } from '@/lib/utils';
import { DefaultTemplate } from './resume-templates/default-template';
import { ModernTemplate } from './resume-templates/modern-template';
import { CreativeTemplate } from './resume-templates/creative-template';
import { MinimalTemplate } from './resume-templates/minimal-template';
import { DoubleColumnTemplate } from './resume-templates/double-column-template';
import { StylishTemplate } from './resume-templates/stylish-template';
import { TimelineTemplate } from './resume-templates/timeline-template';
import { ContemporaryTemplate } from './resume-templates/contemporary-template';

interface ResumePreviewProps {
  resumeData: ResumeData;
  templateId: string;
  isPreview?: boolean;
  className?: string;
}

export function ResumePreview({ resumeData, templateId, isPreview = false, className }: ResumePreviewProps) {

  const renderTemplate = () => {
    switch (templateId) {
      case 'modern':
        return <ModernTemplate data={resumeData} />;
      case 'creative':
        return <CreativeTemplate data={resumeData} />;
      case 'minimal':
        return <MinimalTemplate data={resumeData} />;
      case 'double-column':
        return <DoubleColumnTemplate data={resumeData} />;
      case 'stylish':
        return <StylishTemplate data={resumeData} />;
      case 'timeline':
        return <TimelineTemplate data={resumeData} />;
      case 'contemporary':
        return <ContemporaryTemplate data={resumeData} />;
      default:
        return <DefaultTemplate data={resumeData} />;
    }
  };
  
  if (isPreview) {
    return (
      <div 
        className={cn(
          "absolute inset-0 transform scale-[0.3] origin-top-left",
          className
        )}
      >
        <div id={!isPreview ? "printable-area" : undefined} className="bg-white shadow-lg w-[210mm] min-h-[297mm]">
          {renderTemplate()}
        </div>
      </div>
    );
  }

  return (
    <div 
      id="printable-area"
      className={cn(
        "bg-white shadow-lg w-[210mm] min-h-[297mm]",
        className
      )}
    >
      {renderTemplate()}
    </div>
  );
}
