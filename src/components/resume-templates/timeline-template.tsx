'use client';

import type { ResumeData } from '@/lib/types';
import { Github, Linkedin, Mail, Phone, GraduationCap, Briefcase, Lightbulb, Trophy, Award } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

const TimelineItem: React.FC<{ icon: React.ReactNode; children: React.ReactNode }> = ({ icon, children }) => (
    <div className="relative pl-8 pb-6 last:pb-0">
        <div className="absolute left-0 top-0 h-full w-px bg-gray-300"></div>
        <div className="absolute left-[-7px] top-0 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-white">
            {icon}
        </div>
        <div className="ml-2">{children}</div>
    </div>
);


export function TimelineTemplate({ data }: TemplateProps) {
  return (
    <div className="p-6 bg-white text-gray-800 font-sans">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
        <div className="flex items-center gap-x-3 gap-y-1 mt-2 text-xs text-gray-500">
          {data.email && <a href={`mailto:${data.email}`} className="flex items-center gap-1 hover:text-blue-500 break-all"><Mail size={12} /> {data.email}</a>}
          {data.mobileNumber && <span className="flex items-center gap-1"><Phone size={12} /> {data.mobileNumber}</span>}
          {data.linkedinLink && <a href={data.linkedinLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-500"><Linkedin size={12} /> LinkedIn</a>}
          {data.githubLink && <a href={data.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-500"><Github size={12} /> GitHub</a>}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column for static info */}
        <aside className="md:col-span-1">
          {data.professionalSummary && (
            <section className="mb-5">
              <h2 className="text-lg font-semibold mb-2 text-blue-600">Summary</h2>
              <p className="text-xs text-gray-600 leading-relaxed">{data.professionalSummary}</p>
            </section>
          )}
          {data.coreSkills && data.coreSkills.length > 0 && (
            <section className="mb-5">
              <h2 className="text-lg font-semibold mb-2 text-blue-600">Skills</h2>
              <div className="flex flex-wrap gap-1.5">
                {data.coreSkills.map((skill, index) => (
                  <span key={index} className="bg-gray-200 text-gray-800 text-[10px] font-medium px-2 py-1 rounded">{skill}</span>
                ))}
              </div>
            </section>
          )}
          {data.projects && data.projects.length > 0 && (
            <section className="mb-5">
              <h2 className="text-lg font-semibold mb-2 text-blue-600">Projects</h2>
              <div className="space-y-2.5">
                {data.projects.map((proj, index) => (
                  <div key={index} className="text-xs">
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
            <h2 className="text-xl font-bold mb-4 text-gray-800">Career Timeline</h2>
            <div className="relative">
                {/* Experience Section */}
                {data.experience && data.experience.map((exp, index) => (
                    <TimelineItem key={`exp-${index}`} icon={<Briefcase size={10} />}>
                        <p className="text-[10px] text-gray-500">{exp.dates}</p>
                        <h3 className="font-bold text-sm">{exp.title}</h3>
                        <h4 className="font-semibold text-blue-600 text-xs">{exp.company}</h4>
                        <p className="mt-1.5 text-xs text-gray-600 whitespace-pre-wrap">{exp.description}</p>
                    </TimelineItem>
                ))}
                
                {/* Education Section */}
                {data.education && data.education.map((edu, index) => (
                    <TimelineItem key={`edu-${index}`} icon={<GraduationCap size={10} />}>
                        <p className="text-[10px] text-gray-500">{edu.dates}</p>
                        <h3 className="font-bold text-sm">{edu.degree}</h3>
                        <p className="text-xs text-gray-600">{edu.institution}</p>
                    </TimelineItem>
                ))}

                {/* Achievements Section */}
                {data.achievements && data.achievements.length > 0 && (
                    <TimelineItem icon={<Trophy size={10} />}>
                        <h3 className="font-bold text-sm">Key Achievements</h3>
                        <ul className="list-disc list-inside mt-1.5 text-xs text-gray-600 space-y-1">
                            {data.achievements.map((ach, index) => <li key={index}>{ach.value}</li>)}
                        </ul>
                    </TimelineItem>
                )}

                 {/* Certifications Section */}
                {data.certifications && data.certifications.length > 0 && (
                    <TimelineItem icon={<Award size={10} />}>
                        <h3 className="font-bold text-sm">Certifications</h3>
                         <ul className="list-disc list-inside mt-1.5 text-xs text-gray-600 space-y-1">
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

    