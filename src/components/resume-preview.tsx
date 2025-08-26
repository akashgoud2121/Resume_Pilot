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
import { cn } from '@/lib/utils';

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
      <div
        className="w-[280px] h-[396px] overflow-hidden bg-white shadow-lg"
      >
        <div
          className="origin-top-left"
          style={{
            transform: 'scale(0.333)',
            width: '210mm',
            height: '297mm',
          }}
          >
          {renderTemplate()}
        </div>
      </div>
    );
  }

  return (
    <div id="printable-area" className="bg-white shadow-lg" style={{ width: '210mm', minHeight: '297mm' }}>
      {renderTemplate()}
    </div>
  );
}
