
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
                    --scale-factor: calc(100% / 1123px);
                }
                @media (min-width: 640px) {
                    .relative {
                       --scale-factor: calc(100% / 1123px);
                    }
                }
                @media (min-width: 768px) {
                    .relative {
                        --scale-factor: calc(100% / 1123px);
                    }
                }
                @media (min-width: 1024px) {
                     .relative {
                        --scale-factor: calc(100% / 1123px);
                    }
                }
                 @media (min-width: 1280px) {
                     .relative {
                        --scale-factor: calc(100% / 1123px);
                    }
                }
                @media (min-width: 1536px) {
                     .relative {
                        --scale-factor: calc(100% / 1123px);
                    }
                }
                
                .w-full.h-full.relative{
                    overflow: hidden;
                }

                .absolute {
                    width: 794px;
                    height: 1123px;
                }
            `}</style>
        </div>
    );
}
