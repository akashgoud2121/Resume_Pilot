'use client';

import type { ResumeData } from '@/lib/types';
import { Github, Linkedin, Mail, Phone, GraduationCap, Briefcase, Lightbulb, Trophy, Award, User, Sparkles } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

const TimelineItem: React.FC<{ icon: React.ReactNode; children: React.ReactNode }> = ({ icon, children }) => (
    <div className="relative pl-12 pb-8 last:pb-0">
        <div className="absolute left-0 top-0 h-full w-px bg-gray-300"></div>
        <div className="absolute left-[-9px] top-0 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white">
            {icon}
        </div>
        <div className="ml-4">{children}</div>
    </div>
);


export function TimelineTemplate({ data }: TemplateProps) {
  return (
    <div className="p-8 bg-white text-gray-800 font-sans">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">{data.name}</h1>
        <div className="flex items-center gap-x-4 gap-y-1 mt-2 text-sm text-gray-500">
          {data.email && <a href={`mailto:${data.email}`} className="flex items-center gap-1 hover:text-blue-500"><Mail size={14} /> {data.email}</a>}
          {data.mobileNumber && <span className="flex items-center gap-1"><Phone size={14} /> {data.mobileNumber}</span>}
          {data.linkedinLink && <a href={data.linkedinLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-500"><Linkedin size={14} /> LinkedIn</a>}
          {data.githubLink && <a href={data.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-500"><Github size={14} /> GitHub</a>}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column for static info */}
        <aside className="md:col-span-1">
          {data.professionalSummary && (
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-blue-600">Summary</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{data.professionalSummary}</p>
            </section>
          )}
          {data.coreSkills && data.coreSkills.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-blue-600">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {data.coreSkills.map((skill, index) => (
                  <span key={index} className="bg-gray-200 text-gray-800 text-xs font-medium px-3 py-1 rounded">{skill}</span>
                ))}
              </div>
            </section>
          )}
          {data.projects && data.projects.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-blue-600">Projects</h2>
              <div className="space-y-3">
                {data.projects.map((proj, index) => (
                  <div key={index} className="text-sm">
                    <h3 className="font-bold">{proj.name}</h3>
                    <p className="text-gray-600">{proj.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </aside>

        {/* Right Column for timeline */}
        <main className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Career Timeline</h2>
            <div className="relative">
                {/* Experience Section */}
                {data.experience && data.experience.map((exp, index) => (
                    <TimelineItem key={`exp-${index}`} icon={<Briefcase size={12} />}>
                        <p className="text-xs text-gray-500">{exp.dates}</p>
                        <h3 className="font-bold text-base">{exp.title}</h3>
                        <h4 className="font-semibold text-blue-600">{exp.company}</h4>
                        <p className="mt-2 text-sm text-gray-600 whitespace-pre-wrap">{exp.description}</p>
                    </TimelineItem>
                ))}
                
                {/* Education Section */}
                {data.education && data.education.map((edu, index) => (
                    <TimelineItem key={`edu-${index}`} icon={<GraduationCap size={12} />}>
                        <p className="text-xs text-gray-500">{edu.dates}</p>
                        <h3 className="font-bold text-base">{edu.degree}</h3>
                        <p className="text-gray-600">{edu.institution}</p>
                    </TimelineItem>
                ))}

                {/* Achievements Section */}
                {data.achievements && data.achievements.length > 0 && (
                    <TimelineItem icon={<Trophy size={12} />}>
                        <h3 className="font-bold text-base">Key Achievements</h3>
                        <ul className="list-disc list-inside mt-2 text-sm text-gray-600 space-y-1">
                            {data.achievements.map((ach, index) => <li key={index}>{ach.value}</li>)}
                        </ul>
                    </TimelineItem>
                )}

                 {/* Certifications Section */}
                {data.certifications && data.certifications.length > 0 && (
                    <TimelineItem icon={<Award size={12} />}>
                        <h3 className="font-bold text-base">Certifications</h3>
                         <ul className="list-disc list-inside mt-2 text-sm text-gray-600 space-y-1">
                            {data.certifications.map((cert, index) => <li key={index}>{cert.value}</li>)}
                        </ul>
                    </TimelineItem>
                )}
            </div>
        </main>
      </div>
    </div>
  );
}
