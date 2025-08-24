'use client';

import type { ResumeData } from '@/lib/types';
import { Github, Linkedin, Mail, Phone, GraduationCap, Briefcase, Lightbulb, Trophy, Award, User, Sparkles } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

const Section: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
  <section className={`mb-8 ${className}`}>
    <h2 className="text-2xl font-black uppercase tracking-wider text-teal-500 mb-4">{title}</h2>
    <div className="text-sm">
      {children}
    </div>
  </section>
);

export function CreativeTemplate({ data }: TemplateProps) {
  return (
    <div className="p-8 bg-gray-900 text-white font-mono flex flex-col" style={{fontFamily: "'Courier New', Courier, monospace"}}>
      {/* Header */}
      <header className="flex justify-between items-center mb-10 border-b-4 border-teal-500 pb-4">
        <div>
          <h1 className="text-5xl font-extrabold tracking-widest">{data.name}</h1>
          <p className="text-xl text-teal-400 mt-1">AI & Software Magician</p>
        </div>
        <div className="text-right text-xs space-y-1">
          {data.email && <a href={`mailto:${data.email}`} className="flex items-center justify-end gap-2 hover:text-teal-400"><Mail size={12} /> {data.email}</a>}
          {data.mobileNumber && <span className="flex items-center justify-end gap-2"><Phone size={12} /> {data.mobileNumber}</span>}
          {data.linkedinLink && <a href={data.linkedinLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-end gap-2 hover:text-teal-400"><Linkedin size={12} /> LinkedIn Profile</a>}
          {data.githubLink && <a href={data.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-end gap-2 hover:text-teal-400"><Github size={12} /> GitHub Profile</a>}
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex gap-10">
        {/* Left Column */}
        <div className="w-1/3 space-y-8">
            {data.professionalSummary && (
              <section>
                <h2 className="text-2xl font-black uppercase tracking-wider text-teal-500 mb-4">Mission</h2>
                <p className="text-sm italic text-gray-300">{data.professionalSummary}</p>
              </section>
            )}
            
            {data.coreSkills && data.coreSkills.length > 0 && (
                <section>
                    <h2 className="text-2xl font-black uppercase tracking-wider text-teal-500 mb-4">Toolkit</h2>
                    <div className="flex flex-wrap gap-2">
                    {data.coreSkills.map((skill, index) => (
                        <span key={index} className="bg-gray-700 text-teal-300 text-xs font-bold px-3 py-1 rounded-sm">{skill}</span>
                    ))}
                    </div>
                </section>
            )}

            {data.education && data.education.length > 0 && (
                <section>
                    <h2 className="text-2xl font-black uppercase tracking-wider text-teal-500 mb-4">Training</h2>
                    {data.education.map((edu, index) => (
                    <div key={index} className="mb-3 last:mb-0">
                        <h3 className="font-bold text-base">{edu.degree}</h3>
                        <p className="text-gray-400">{edu.institution}</p>
                        <p className="text-xs text-teal-400">{edu.dates}</p>
                    </div>
                    ))}
                </section>
            )}
        </div>

        {/* Right Column */}
        <div className="w-2/3 border-l-4 border-gray-700 pl-10">
             {data.experience && data.experience.length > 0 && (
                <Section title="Quests">
                    {data.experience.map((exp, index) => (
                    <div key={index} className="mb-6 last:mb-0 relative pl-6 before:absolute before:left-0 before:top-1 before:h-3 before:w-3 before:bg-teal-500 before:rounded-full">
                        <div className="flex justify-between items-baseline">
                        <h3 className="font-bold text-lg">{exp.title} at <span className="text-teal-400">{exp.company}</span></h3>
                        <p className="text-xs font-medium text-gray-400">{exp.dates}</p>
                        </div>
                        <p className="mt-2 text-gray-300 text-sm whitespace-pre-wrap">{exp.description}</p>
                    </div>
                    ))}
                </Section>
            )}

             {data.projects && data.projects.length > 0 && (
                <Section title="Creations">
                    {data.projects.map((proj, index) => (
                    <div key={index} className="mb-4 last:mb-0">
                        <h3 className="font-bold text-lg text-teal-400">{proj.name}</h3>
                        <p className="mt-1 text-gray-300 text-sm">{proj.description}</p>
                    </div>
                    ))}
                </Section>
            )}

            <div className="flex gap-10">
                 {data.achievements && data.achievements.length > 0 && (
                    <Section title="Trophies" className="w-1/2">
                        <ul className="space-y-2">
                            {data.achievements.map((ach, index) => <li key={index} className="flex items-start gap-2"><Trophy size={14} className="text-teal-400 mt-1" />{ach.value}</li>)}
                        </ul>
                    </Section>
                )}

                {data.certifications && data.certifications.length > 0 && (
                    <Section title="Badges" className="w-1/2">
                        <ul className="space-y-2">
                            {data.certifications.map((cert, index) => <li key={index} className="flex items-start gap-2"><Award size={14} className="text-teal-400 mt-1"/>{cert.value}</li>)}
                        </ul>
                    </Section>
                )}
            </div>
        </div>
      </main>
    </div>
  );
}
