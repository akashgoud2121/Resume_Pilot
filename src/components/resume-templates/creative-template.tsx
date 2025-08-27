
'use client';

import type { ResumeData } from '@/lib/types';
import { Github, Linkedin, Mail, Phone, GraduationCap, Briefcase, Lightbulb, Trophy, Award } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

const Section: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
  <section className={`mb-6 ${className}`}>
    <h2 className="text-xl font-black uppercase tracking-wider text-teal-500 mb-3">{title}</h2>
    <div className="text-xs">
      {children}
    </div>
  </section>
);

export function CreativeTemplate({ data }: TemplateProps) {
  return (
    <div className="p-8 bg-gray-900 text-white font-mono" style={{fontFamily: "'Courier New', Courier, monospace"}}>
      {/* Header */}
      <header className="flex justify-between items-center mb-8 border-b-4 border-teal-500 pb-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-widest">{data.name}</h1>
          {data.experience?.[0]?.title && <p className="text-lg text-teal-400 mt-1">{data.experience[0].title}</p>}
        </div>
        <div className="text-right text-[10px] space-y-1">
          {data.email && <a href={`mailto:${data.email}`} className="flex items-center justify-end gap-2 hover:text-teal-400 break-all"><Mail size={12} /> {data.email}</a>}
          {data.mobileNumber && <span className="flex items-center justify-end gap-2"><Phone size={12} /> {data.mobileNumber}</span>}
          {data.linkedinLink && <a href={data.linkedinLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-end gap-2 hover:text-teal-400"><Linkedin size={12} /> LinkedIn</a>}
          {data.githubLink && <a href={data.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-end gap-2 hover:text-teal-400"><Github size={12} /> GitHub</a>}
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex gap-8">
        {/* Left Column */}
        <div className="w-1/3 space-y-6">
            {data.professionalSummary && (
              <section>
                <h2 className="text-xl font-black uppercase tracking-wider text-teal-500 mb-3">Mission</h2>
                <p className="text-xs italic text-gray-300">{data.professionalSummary}</p>
              </section>
            )}
            
            {data.coreSkills && data.coreSkills.length > 0 && (
                <section>
                    <h2 className="text-xl font-black uppercase tracking-wider text-teal-500 mb-3">Toolkit</h2>
                    <div className="flex flex-wrap gap-1.5">
                    {data.coreSkills.map((skill) => (
                        <span key={skill.id} className="bg-gray-700 text-teal-300 text-[10px] font-bold px-2 py-1 rounded-sm">{skill.value}</span>
                    ))}
                    </div>
                </section>
            )}

            {data.education && data.education.length > 0 && (
                <section>
                    <h2 className="text-xl font-black uppercase tracking-wider text-teal-500 mb-3">Training</h2>
                    {data.education.map((edu, index) => (
                    <div key={index} className="mb-3 last:mb-0">
                        <h3 className="font-bold text-sm">{edu.degree}</h3>
                        <p className="text-gray-400 text-xs">{edu.institution}</p>
                        <p className="text-[10px] text-teal-400">{edu.dates}</p>
                    </div>
                    ))}
                </section>
            )}
        </div>

        {/* Right Column */}
        <div className="w-2/3 border-l-4 border-gray-700 pl-8">
             {data.experience && data.experience.length > 0 && (
                <Section title="Quests">
                    {data.experience.map((exp, index) => (
                    <div key={index} className="mb-5 last:mb-0 relative pl-5 before:absolute before:left-0 before:top-1 before:h-2.5 before:w-2.5 before:bg-teal-500 before:rounded-full">
                        <div className="flex justify-between items-baseline">
                        <h3 className="font-bold text-base">{exp.title} at <span className="text-teal-400">{exp.company}</span></h3>
                        <p className="text-[10px] font-medium text-gray-400">{exp.dates}</p>
                        </div>
                        <p className="mt-1.5 text-gray-300 text-xs whitespace-pre-wrap">{exp.description}</p>
                    </div>
                    ))}
                </Section>
            )}

             {data.projects && data.projects.length > 0 && (
                <Section title="Creations">
                    {data.projects.map((proj, index) => (
                    <div key={index} className="mb-3 last:mb-0">
                        <h3 className="font-bold text-base text-teal-400">{proj.name}</h3>
                        <p className="mt-1 text-gray-300 text-xs">{proj.description}</p>
                    </div>
                    ))}
                </Section>
            )}

            <div className="flex gap-8">
                 {data.achievements && data.achievements.length > 0 && (
                    <Section title="Trophies" className="w-1/2">
                        <ul className="space-y-1.5">
                            {data.achievements.map((ach) => <li key={ach.id} className="flex items-start gap-2"><Trophy size={12} className="text-teal-400 mt-0.5" />{ach.value}</li>)}
                        </ul>
                    </Section>
                )}

                {data.certifications && data.certifications.length > 0 && (
                    <Section title="Badges" className="w-1/2">
                        <ul className="space-y-1.5">
                            {data.certifications.map((cert) => <li key={cert.id} className="flex items-start gap-2"><Award size={12} className="text-teal-400 mt-0.5"/>{cert.value}</li>)}
                        </ul>
                    </Section>
                )}
            </div>
        </div>
      </main>
    </div>
  );
}

    
