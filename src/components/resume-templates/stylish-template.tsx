'use client';

import type { ResumeData } from '@/lib/types';
import { Github, Linkedin, Mail, Phone, ExternalLink, GraduationCap, Briefcase, Lightbulb, Trophy, Award, User, Sparkles } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="mb-6">
    <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-500 mb-4">{title}</h2>
    <div className="text-sm text-gray-700">
      {children}
    </div>
  </section>
);

export function StylishTemplate({ data }: TemplateProps) {
  return (
    <div className="p-10 bg-gray-50 text-gray-800 font-serif">
      {/* Header */}
      <header className="text-center mb-8 border-b-2 border-gray-300 pb-8">
        <h1 className="text-5xl font-thin tracking-widest text-gray-900">{data.name.toUpperCase()}</h1>
        <p className="text-base text-gray-500 mt-2 tracking-[0.1em]">AI/ML & PYTHON SOFTWARE ENGINEER</p>
      </header>
      
      {/* Main Grid */}
      <main className="grid grid-cols-12 gap-10">
        {/* Left Column */}
        <div className="col-span-4">
            <Section title="About Me">
                <p className="text-sm leading-relaxed">{data.professionalSummary}</p>
            </Section>
            <Section title="Contact">
                <div className="space-y-2 text-sm">
                    {data.email && <a href={`mailto:${data.email}`} className="flex items-center gap-2 hover:text-black"><Mail size={14} /> {data.email}</a>}
                    {data.mobileNumber && <span className="flex items-center gap-2"><Phone size={14} /> {data.mobileNumber}</span>}
                    {data.linkedinLink && <a href={data.linkedinLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-black"><Linkedin size={14} /> /in/akashgoud</a>}
                    {data.githubLink && <a href={data.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-black"><Github size={14} /> /akashgoud2121</a>}
                </div>
            </Section>
            <Section title="Skills">
                {data.coreSkills && data.coreSkills.length > 0 && (
                    <ul className="space-y-1">
                        {data.coreSkills.map((skill, index) => (
                            <li key={index} className="text-sm">{skill}</li>
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
                    <div key={index} className="mb-5 last:mb-0">
                        <div className="flex justify-between items-baseline">
                            <h3 className="font-bold text-base">{exp.title}</h3>
                            <p className="text-xs font-light text-gray-500">{exp.dates}</p>
                        </div>
                        <h4 className="font-medium text-gray-600 italic">{exp.company}</h4>
                        <p className="mt-2 text-sm text-gray-600 whitespace-pre-wrap">{exp.description}</p>
                    </div>
                    ))}
                </Section>
            )}

            {data.education && data.education.length > 0 && (
                <Section title="Education">
                    {data.education.map((edu, index) => (
                    <div key={index} className="mb-4 last:mb-0">
                        <div className="flex justify-between items-baseline">
                            <h3 className="font-bold text-base">{edu.institution}</h3>
                            <p className="text-xs font-light text-gray-500">{edu.dates}</p>
                        </div>
                        <p className="text-gray-600">{edu.degree}</p>
                    </div>
                    ))}
                </Section>
            )}
            
            {data.projects && data.projects.length > 0 && (
                <Section title="Projects">
                    {data.projects.map((proj, index) => (
                    <div key={index} className="mb-4 last:mb-0">
                        <h3 className="font-bold text-base">{proj.name}</h3>
                        <p className="mt-1 text-sm text-gray-600">{proj.description}</p>
                    </div>
                    ))}
                </Section>
            )}
            
            <div className="flex gap-8">
                {data.certifications && data.certifications.length > 0 && (
                    <Section title="Certifications">
                    <ul className="list-none space-y-1">
                        {data.certifications.map((cert, index) => <li key={index} className="text-sm">{cert.value}</li>)}
                    </ul>
                    </Section>
                )}
                {data.achievements && data.achievements.length > 0 && (
                    <Section title="Achievements">
                    <ul className="list-none space-y-1">
                        {data.achievements.map((ach, index) => <li key={index} className="text-sm">{ach.value}</li>)}
                    </ul>
                    </Section>
                )}
            </div>
        </div>
      </main>
    </div>
  );
}
