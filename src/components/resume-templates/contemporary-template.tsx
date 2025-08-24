'use client';

import type { ResumeData } from '@/lib/types';
import { Github, Linkedin, Mail, Phone, GraduationCap, Briefcase, Lightbulb, Trophy, Award, User, Sparkles, MoveRight } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

const Section: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
  <section className={`mb-6 ${className}`}>
    <h2 className="text-xl font-semibold mb-3 flex items-center gap-3 text-green-700">
        <div className="w-2.5 h-2.5 bg-green-400 rounded-sm transform rotate-45"></div>
        {title}
    </h2>
    <div className="pl-6 text-gray-700">
      {children}
    </div>
  </section>
);


export function ContemporaryTemplate({ data }: TemplateProps) {
  return (
    <div className="p-8 bg-slate-50 text-slate-800 font-sans text-sm">
        <header className="relative mb-8 text-center">
            <h1 className="text-5xl font-extrabold text-slate-900">{data.name}</h1>
            {data.experience?.[0]?.title && <p className="text-lg text-green-600 mt-2 font-medium tracking-wide">{data.experience[0].title}</p>}
        </header>

        <div className="grid grid-cols-12 gap-6">
            <div className="col-span-4 border-r-2 border-slate-200 pr-6">
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase text-green-700 tracking-wider mb-3">Contact</h2>
                    <div className="space-y-1.5 text-xs text-slate-600">
                        {data.email && <a href={`mailto:${data.email}`} className="flex items-center gap-2 hover:text-green-600 break-all"><Mail size={14} /> {data.email}</a>}
                        {data.mobileNumber && <span className="flex items-center gap-2"><Phone size={14} /> {data.mobileNumber}</span>}
                        {data.linkedinLink && <a href={data.linkedinLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-green-600"><Linkedin size={14} /> LinkedIn</a>}
                        {data.githubLink && <a href={data.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-green-600"><Github size={14} /> GitHub</a>}
                    </div>
                </section>

                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase text-green-700 tracking-wider mb-3">Skills</h2>
                    {data.coreSkills && data.coreSkills.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                            {data.coreSkills.map((skill, index) => (
                                <span key={index} className="bg-green-100 text-green-800 text-[10px] font-semibold px-2 py-1 rounded">{skill}</span>
                            ))}
                        </div>
                    )}
                </section>

                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase text-green-700 tracking-wider mb-3">Education</h2>
                    {data.education && data.education.map((edu, index) => (
                    <div key={index} className="mb-3 last:mb-0 text-xs">
                        <h3 className="font-semibold text-slate-700">{edu.institution}</h3>
                        <p className="text-slate-600">{edu.degree}</p>
                        <p className="text-[10px] text-slate-500">{edu.dates}</p>
                    </div>
                    ))}
                </section>

                {data.certifications && data.certifications.length > 0 && (
                    <section>
                        <h2 className="text-lg font-bold uppercase text-green-700 tracking-wider mb-3">Certifications</h2>
                        <ul className="space-y-1 list-inside text-xs">
                            {data.certifications.map((cert, index) => <li key={index} className="text-slate-600">{cert.value}</li>)}
                        </ul>
                    </section>
                )}
            </div>

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
                
                {data.projects && data.projects.length > 0 && (
                    <Section title="Side Projects">
                        {data.projects.map((proj, index) => (
                        <div key={index} className="mb-3 last:mb-0">
                            <h3 className="font-bold text-base flex items-center gap-2">{proj.name} <MoveRight size={14} className="text-green-500" /></h3>
                            <p className="mt-1 text-xs text-slate-600">{proj.description}</p>
                        </div>
                        ))}
                    </Section>
                )}

                {data.achievements && data.achievements.length > 0 && (
                    <Section title="Achievements">
                    <ul className="list-disc list-outside ml-3.5 space-y-1 text-xs">
                        {data.achievements.map((ach, index) => <li key={index}>{ach.value}</li>)}
                    </ul>
                    </Section>
                )}
            </main>
        </div>
    </div>
  );
}

    