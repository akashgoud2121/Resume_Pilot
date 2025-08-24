'use client';

import React from 'react';
import type { ResumeData } from '@/lib/types';
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
}

export function ResumePreview({ resumeData, templateId, isPreview = false }: ResumePreviewProps) {

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
      <div className="bg-white shadow-lg" style={{ 
        width: '210mm', 
        height: '297mm', 
        transform: 'scale(0.23)', // Adjust scale to fit in the preview box
        transformOrigin: 'top left',
        minHeight: '0',
      }}>
        {renderTemplate()}
      </div>
    );
  }

  return (
    <div className="printable-resume bg-white shadow-lg" style={{ width: '210mm', minHeight: '297mm' }}>
      {renderTemplate()}
    </div>
  );
}
