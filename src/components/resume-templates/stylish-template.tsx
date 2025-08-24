'use client';

import type { ResumeData } from '@/lib/types';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="mb-5">
    <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-3">{title}</h2>
    <div className="text-xs text-gray-700">
      {children}
    </div>
  </section>
);

export function StylishTemplate({ data }: TemplateProps) {
  return (
    <div className="p-8 bg-gray-50 text-gray-800 font-serif">
      {/* Header */}
      <header className="text-center mb-6 border-b-2 border-gray-300 pb-6">
        <h1 className="text-4xl font-thin tracking-widest text-gray-900">{data.name.toUpperCase()}</h1>
        {data.experience?.[0]?.title && <p className="text-sm text-gray-500 mt-2 tracking-[0.1em]">{data.experience[0].title.toUpperCase()}</p>}
      </header>
      
      {/* Main Grid */}
      <main className="grid grid-cols-12 gap-8">
        {/* Left Column */}
        <div className="col-span-4">
            <Section title="About Me">
                <p className="text-xs leading-relaxed">{data.professionalSummary}</p>
            </Section>
            <Section title="Contact">
                <div className="space-y-1.5 text-xs">
                    {data.email && <a href={`mailto:${data.email}`} className="flex items-center gap-2 hover:text-black break-all"><Mail size={12} /> {data.email}</a>}
                    {data.mobileNumber && <span className="flex items-center gap-2"><Phone size={12} /> {data.mobileNumber}</span>}
                    {data.linkedinLink && <a href={data.linkedinLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-black"><Linkedin size={12} /> LinkedIn</a>}
                    {data.githubLink && <a href={data.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-black"><Github size={12} /> GitHub</a>}
                </div>
            </Section>
            <Section title="Skills">
                {data.coreSkills && data.coreSkills.length > 0 && (
                    <ul className="space-y-1">
                        {data.coreSkills.map((skill, index) => (
                            <li key={index} className="text-xs">{skill}</li>
                        ))}
                    </ul>
                )}
            </Section>
        </div>
        
        {/* Right Column */}
        <div className="col-span-8">
            {data.experience && data.experience.length > 0 && (
                <Section title="Experience">
                    {data.experience.map((exp, index) => (
                    <div key={index} className="mb-4 last:mb-0">
                        <div className="flex justify-between items-baseline">
                            <h3 className="font-bold text-sm">{exp.title}</h3>
                            <p className="text-[10px] font-light text-gray-500">{exp.dates}</p>
                        </div>
                        <h4 className="font-medium text-gray-600 italic text-xs">{exp.company}</h4>
                        <p className="mt-1.5 text-xs text-gray-600 whitespace-pre-wrap">{exp.description}</p>
                    </div>
                    ))}
                </Section>
            )}

            {data.education && data.education.length > 0 && (
                <Section title="Education">
                    {data.education.map((edu, index) => (
                    <div key={index} className="mb-3 last:mb-0">
                        <div className="flex justify-between items-baseline">
                            <h3 className="font-bold text-sm">{edu.institution}</h3>
                            <p className="text-[10px] font-light text-gray-500">{edu.dates}</p>
                        </div>
                        <p className="text-gray-600 text-xs">{edu.degree}</p>
                    </div>
                    ))}
                </Section>
            )}
            
            {data.projects && data.projects.length > 0 && (
                <Section title="Projects">
                    {data.projects.map((proj, index) => (
                    <div key={index} className="mb-3 last:mb-0">
                        <h3 className="font-bold text-sm">{proj.name}</h3>
                        <p className="mt-1 text-xs text-gray-600">{proj.description}</p>
                    </div>
                    ))}
                </Section>
            )}
            
            <div className="flex gap-6">
                {data.certifications && data.certifications.length > 0 && (
                    <Section title="Certifications">
                    <ul className="list-none space-y-1">
                        {data.certifications.map((cert, index) => <li key={index} className="text-xs">{cert.value}</li>)}
                    </ul>
                    </Section>
                )}
                {data.achievements && data.achievements.length > 0 && (
                    <Section title="Achievements">
                    <ul className="list-none space-y-1">
                        {data.achievements.map((ach, index) => <li key={index} className="text-xs">{ach.value}</li>)}
                    </ul>
                    </Section>
                )}
            </div>
        </div>
      </main>
    </div>
  );
}

    