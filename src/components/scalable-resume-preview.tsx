
'use client';

import type { ResumeData } from '@/lib/types';
import { ResumePreview } from './resume-preview';

interface ScalableResumePreviewProps {
    resumeData: ResumeData;
    templateId: string;
}

export function ScalableResumePreview({ resumeData, templateId }: ScalableResumePreviewProps) {
    return (
        <div className="w-full h-full relative">
            <div
                className="absolute top-0 left-0 w-[794px] h-[1123px] origin-top-left bg-white"
                style={{
                    transform: 'scale(var(--scale-factor))',
                    transformOrigin: '0 0',
                }}
            >
                <ResumePreview resumeData={resumeData} templateId={templateId} />
            </div>
            <style jsx>{`
                .relative {
                    --scale-factor: calc(100% / 794px);
                }
                .w-full.h-full.relative {
                    overflow: hidden;
                }
            `}</style>
        </div>
    );
}
