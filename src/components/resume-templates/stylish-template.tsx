'use client';

import type { ResumeData } from '@/lib/types';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="mb-[1.25em]">
    <h2 className="text-[1em] font-bold uppercase tracking-[0.2em] text-gray-500 mb-[0.75em]">{title}</h2>
    <div className="text-[1em] text-gray-700">
      {children}
    </div>
  </section>
);

export function StylishTemplate({ data }: TemplateProps) {
  return (
    <div className="p-[2em] bg-gray-50 text-gray-800 font-serif">
      {/* Header */}
      <header className="text-center mb-[1.5em] border-b-2 border-gray-300 pb-[1.5em]">
        <h1 className="text-[3.5em] font-thin tracking-widest text-gray-900">{data.name.toUpperCase()}</h1>
        {data.experience?.[0]?.title && <p className="text-[1.2em] text-gray-500 mt-[0.5em] tracking-[0.1em]">{data.experience[0].title.toUpperCase()}</p>}
      </header>
      
      {/* Main Grid */}
      <main className="grid grid-cols-12 gap-[2em]">
        {/* Left Column */}
        <div className="col-span-4">
            <Section title="About Me">
                <p className="text-[1em] leading-relaxed">{data.professionalSummary}</p>
            </Section>
            <Section title="Contact">
                <div className="space-y-[0.4em] text-[1em]">
                    {data.email && <a href={`mailto:${data.email}`} className="flex items-center gap-[0.5em] hover:text-black break-all"><Mail className="w-[1em] h-[1em]" /> {data.email}</a>}
                    {data.mobileNumber && <span className="flex items-center gap-[0.5em]"><Phone className="w-[1em] h-[1em]" /> {data.mobileNumber}</span>}
                    {data.linkedinLink && <a href={data.linkedinLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-[0.5em] hover:text-black"><Linkedin className="w-[1em] h-[1em]" /> LinkedIn</a>}
                    {data.githubLink && <a href={data.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-[0.5em] hover:text-black"><Github className="w-[1em] h-[1em]" /> GitHub</a>}
                </div>
            </Section>
            <Section title="Skills">
                {data.coreSkills && data.coreSkills.length > 0 && (
                    <ul className="space-y-[0.25em]">
                        {data.coreSkills.map((skill, index) => (
                            <li key={index} className="text-[1em]">{skill}</li>
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
                    <div key={index} className="mb-[1em] last:mb-0">
                        <div className="flex justify-between items-baseline">
                            <h3 className="font-bold text-[1.2em]">{exp.title}</h3>
                            <p className="text-[0.8em] font-light text-gray-500">{exp.dates}</p>
                        </div>
                        <h4 className="font-medium text-gray-600 italic text-[1em]">{exp.company}</h4>
                        <p className="mt-[0.4em] text-[1em] text-gray-600 whitespace-pre-wrap">{exp.description}</p>
                    </div>
                    ))}
                </Section>
            )}

            {data.education && data.education.length > 0 && (
                <Section title="Education">
                    {data.education.map((edu, index) => (
                    <div key={index} className="mb-[0.75em] last:mb-0">
                        <div className="flex justify-between items-baseline">
                            <h3 className="font-bold text-[1.2em]">{edu.institution}</h3>
                            <p className="text-[0.8em] font-light text-gray-500">{edu.dates}</p>
                        </div>
                        <p className="text-gray-600 text-[1em]">{edu.degree}</p>
                    </div>
                    ))}
                </Section>
            )}
            
            {data.projects && data.projects.length > 0 && (
                <Section title="Projects">
                    {data.projects.map((proj, index) => (
                    <div key={index} className="mb-[0.75em] last:mb-0">
                        <h3 className="font-bold text-[1.2em]">{proj.name}</h3>
                        <p className="mt-[0.25em] text-[1em] text-gray-600">{proj.description}</p>
                    </div>
                    ))}
                </Section>
            )}
            
            <div className="flex gap-[1.5em]">
                {data.certifications && data.certifications.length > 0 && (
                    <Section title="Certifications">
                    <ul className="list-none space-y-[0.25em]">
                        {data.certifications.map((cert, index) => <li key={index} className="text-[1em]">{cert.value}</li>)}
                    </ul>
                    </Section>
                )}
                {data.achievements && data.achievements.length > 0 && (
                    <Section title="Achievements">
                    <ul className="list-none space-y-[0.25em]">
                        {data.achievements.map((ach, index) => <li key={index} className="text-[1em]">{ach.value}</li>)}
                    </ul>
                    </Section>
                )}
            </div>
        </div>
      </main>
    </div>
  );
}

    
