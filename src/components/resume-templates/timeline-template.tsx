'use client';

import type { ResumeData } from '@/lib/types';
import { Github, Linkedin, Mail, Phone, GraduationCap, Briefcase, Lightbulb, Trophy, Award } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

const TimelineItem: React.FC<{ icon: React.ReactNode; children: React.ReactNode; isLast?: boolean }> = ({ icon, children, isLast }) => (
    <div className="relative pl-8">
        {!isLast && <div className="absolute left-[7px] top-5 h-full w-px bg-gray-300"></div>}
        <div className="absolute left-0 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-white">
            {icon}
        </div>
        <div className="ml-4 pb-6">
            {children}
        </div>
    </div>
);

export function TimelineTemplate({ data }: TemplateProps) {
  const timelineEvents = [
    ...(data.experience || []).map(item => ({ type: 'experience', ...item })),
    ...(data.education || []).map(item => ({ type: 'education', ...item })),
  ].sort((a, b) => {
    const aYear = parseInt(a.dates.slice(-4));
    const bYear = parseInt(b.dates.slice(-4));
    return bYear - aYear;
  });

  return (
    <div className="p-8 bg-white text-gray-800 font-sans">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900">{data.name}</h1>
        <div className="flex items-center justify-center gap-x-4 gap-y-1 mt-2 text-xs text-gray-600 flex-wrap">
          {data.email && <a href={`mailto:${data.email}`} className="flex items-center gap-1.5 hover:text-blue-600 break-all"><Mail size={14} /> {data.email}</a>}
          {data.mobileNumber && <span className="flex items-center gap-1.5"><Phone size={14} /> {data.mobileNumber}</span>}
          {data.linkedinLink && <a href={data.linkedinLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-blue-600"><Linkedin size={14} /> LinkedIn</a>}
          {data.githubLink && <a href={data.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-blue-600"><Github size={14} /> GitHub</a>}
        </div>
      </header>

      <div className="grid grid-cols-12 gap-8">
        {/* Left Column for static info */}
        <aside className="col-span-5">
          {data.professionalSummary && (
            <section className="mb-6">
              <h2 className="text-sm font-bold uppercase text-blue-600 tracking-wider mb-2">Summary</h2>
              <p className="text-xs text-gray-600 leading-relaxed">{data.professionalSummary}</p>
            </section>
          )}
          {data.coreSkills && data.coreSkills.length > 0 && (
            <section className="mb-6">
              <h2 className="text-sm font-bold uppercase text-blue-600 tracking-wider mb-2">Skills</h2>
              <div className="flex flex-wrap gap-1.5">
                {data.coreSkills.map((skill, index) => (
                  <span key={index} className="bg-gray-200 text-gray-800 text-[10px] font-medium px-2 py-1 rounded">{skill}</span>
                ))}
              </div>
            </section>
          )}
          {data.projects && data.projects.length > 0 && (
            <section className="mb-6">
              <h2 className="text-sm font-bold uppercase text-blue-600 tracking-wider mb-2">Projects</h2>
              <div className="space-y-3">
                {data.projects.map((proj, index) => (
                  <div key={index} className="text-xs">
                    <h3 className="font-bold text-sm">{proj.name}</h3>
                    <p className="text-gray-600">{proj.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </aside>

        {/* Right Column for timeline */}
        <main className="col-span-7">
            <h2 className="text-sm font-bold uppercase text-blue-600 tracking-wider mb-2">Career Timeline</h2>
            <div className="relative">
                {timelineEvents.map((item, index) => (
                    <TimelineItem key={index} icon={item.type === 'experience' ? <Briefcase size={8} /> : <GraduationCap size={8}/>} isLast={index === timelineEvents.length - 1}>
                        <p className="text-[10px] text-gray-500 font-semibold">{item.dates}</p>
                        <h3 className="font-bold text-sm text-gray-800">
                          {item.type === 'experience' ? item.title : item.degree}
                        </h3>
                        <h4 className="font-semibold text-blue-600 text-xs">
                          {item.type === 'experience' ? item.company : item.institution}
                        </h4>
                        {item.type === 'experience' && <p className="mt-1.5 text-xs text-gray-700 whitespace-pre-wrap">{item.description}</p>}
                    </TimelineItem>
                ))}
            </div>
        </main>
      </div>
    </div>
  );
}