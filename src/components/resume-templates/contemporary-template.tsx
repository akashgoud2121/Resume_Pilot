
'use client';

import type { ResumeData } from '@/lib/types';
import { Github, Linkedin, Mail, Phone, GraduationCap, Briefcase, Lightbulb, Trophy, Award, User, Sparkles } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

const Section: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
  <section className={`mb-6 ${className}`}>
    <h2 className="text-sm font-bold uppercase tracking-widest text-green-700 mb-3 flex items-center gap-2">
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        {title}
    </h2>
    <div className="text-xs text-gray-700">
      {children}
    </div>
  </section>
);


export function ContemporaryTemplate({ data }: TemplateProps) {
  return (
    <div className="p-8 bg-slate-50 text-slate-800 font-sans text-sm">
        <header className="relative mb-8">
            <h1 className="text-5xl font-extrabold text-slate-900">{data.name}</h1>
            {data.experience?.[0]?.title && <p className="text-lg text-green-600 mt-1 font-medium">{data.experience[0].title}</p>}
        </header>

        <div className="grid grid-cols-12 gap-x-8">
            <aside className="col-span-4">
                <section className="mb-6">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-green-700 mb-3">Contact</h2>
                    <div className="space-y-1.5 text-xs text-slate-600">
                        {data.email && <a href={`mailto:${data.email}`} className="flex items-start gap-2 hover:text-green-600 break-all"><Mail size={14} className="flex-shrink-0 mt-0.5" /> <span>{data.email}</span></a>}
                        {data.mobileNumber && <span className="flex items-start gap-2"><Phone size={14} className="flex-shrink-0 mt-0.5" /> <span>{data.mobileNumber}</span></span>}
                        {data.linkedinLink && <a href={data.linkedinLink} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 hover:text-green-600"><Linkedin size={14} className="flex-shrink-0 mt-0.5" /> <span>LinkedIn</span></a>}
                        {data.githubLink && <a href={data.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 hover:text-green-600"><Github size={14} className="flex-shrink-0 mt-0.5" /> <span>GitHub</span></a>}
                    </div>
                </section>

                <section className="mb-6">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-green-700 mb-3">Skills</h2>
                    {data.coreSkills && data.coreSkills.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                            {data.coreSkills.map((skill) => (
                                <span key={skill.id} className="bg-green-100 text-green-800 text-[10px] font-semibold px-2 py-1 rounded">{skill.value}</span>
                            ))}
                        </div>
                    )}
                </section>

                {data.education && data.education.length > 0 && (
                  <section>
                    <h2 className="text-sm font-bold uppercase tracking-widest text-green-700 mb-3">Education</h2>
                    {data.education.map((edu, index) => (
                    <div key={index} className="mb-3 last:mb-0 text-xs">
                        <h3 className="font-semibold text-slate-700">{edu.institution}</h3>
                        <p className="text-slate-600">{edu.degree}</p>
                        <p className="text-[10px] text-slate-500">{edu.dates}</p>
                    </div>
                    ))}
                  </section>
                )}
            </aside>

            <main className="col-span-8">
                {data.professionalSummary && (
                    <Section title="Profile">
                        <p className="text-xs leading-relaxed">{data.professionalSummary}</p>
                    </Section>
                )}

                {data.experience && data.experience.length > 0 && (
                    <Section title="Work Experience">
                        {data.experience.map((exp, index) => (
                        <div key={index} className="mb-4 last:mb-0">
                            <div className="flex justify-between items-baseline">
                                <h3 className="font-bold text-base">{exp.title}</h3>
                                <p className="text-[10px] font-medium text-slate-500">{exp.dates}</p>
                            </div>
                            <h4 className="font-semibold text-green-600">{exp.company}</h4>
                            <p className="mt-1.5 text-xs text-slate-600 whitespace-pre-wrap">{exp.description}</p>
                        </div>
                        ))}
                    </Section>
                )}
                
                <div className="grid grid-cols-2 gap-x-8">
                    {data.projects && data.projects.length > 0 && (
                        <Section title="Projects">
                            {data.projects.map((proj, index) => (
                            <div key={index} className="mb-3 last:mb-0">
                                <h3 className="font-bold text-base">{proj.name}</h3>
                                <p className="mt-1 text-xs text-slate-600">{proj.description}</p>
                            </div>
                            ))}
                        </Section>
                    )}

                    {data.achievements && data.achievements.length > 0 && (
                        <Section title="Achievements">
                        <ul className="list-none space-y-1 text-xs">
                            {data.achievements.map((ach) => <li key={ach.id}>{ach.value}</li>)}
                        </ul>
                        </Section>
                    )}
                </div>

            </main>
        </div>
    </div>
  );
}
