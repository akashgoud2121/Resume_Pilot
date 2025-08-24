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
    // A4 aspect ratio is 1/1.414
    const a4width = 800; // Large base width for quality
    const a4height = a4width * 1.414;

    return (
       <div 
        className="w-full h-full relative overflow-hidden bg-white"
        style={{
            // This container will have the aspect ratio of A4 paper
            aspectRatio: '1 / 1.414'
        }}
      >
        <div 
          className="origin-top-left absolute"
          style={{
            width: `${a4width}px`,
            height: `${a4height}px`,
            // Scale the content down to fit the container width
            // The container's width is 100% of its parent in the grid
            transform: `scale(calc(100% / ${a4width}))`,
          }}
        >
          {renderTemplate()}
        </div>
      </div>
    );
  }

  return (
    <div className="printable-resume bg-white shadow-lg" style={{ width: '210mm', height: '297mm', minHeight: '297mm' }}>
      {renderTemplate()}
    </div>
  );
}
