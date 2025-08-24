'use client';

import type { ResumeData } from '@/lib/types';
import { Github, Linkedin, Mail, Phone, GraduationCap, Briefcase, Lightbulb, Trophy, Award, User, Sparkles, MoveRight } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

const Section: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
  <section className={`mb-8 ${className}`}>
    <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
        <div className="w-3 h-3 bg-green-400 rounded-sm transform rotate-45"></div>
        {title}
    </h2>
    <div className="pl-6 text-gray-700">
      {children}
    </div>
  </section>
);


export function ContemporaryTemplate({ data }: TemplateProps) {
  return (
    <div className="p-8 bg-slate-50 text-slate-800 font-sans">
        <header className="relative mb-8 text-center">
            <h1 className="text-6xl font-extrabold text-slate-900">{data.name}</h1>
            <p className="text-xl text-green-600 mt-2 font-medium tracking-wide">AI/ML & Python Software Engineer</p>
        </header>

        <div className="grid grid-cols-12 gap-8">
            <div className="col-span-4 border-r-2 border-slate-200 pr-8">
                <section className="mb-8">
                    <h2 className="text-xl font-bold uppercase text-green-700 tracking-wider mb-3">Contact</h2>
                    <div className="space-y-2 text-sm text-slate-600">
                        {data.email && <a href={`mailto:${data.email}`} className="flex items-center gap-2 hover:text-green-600"><Mail size={14} /> {data.email}</a>}
                        {data.mobileNumber && <span className="flex items-center gap-2"><Phone size={14} /> {data.mobileNumber}</span>}
                        {data.linkedinLink && <a href={data.linkedinLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-green-600"><Linkedin size={14} /> LinkedIn</a>}
                        {data.githubLink && <a href={data.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-green-600"><Github size={14} /> GitHub</a>}
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold uppercase text-green-700 tracking-wider mb-3">Skills</h2>
                    {data.coreSkills && data.coreSkills.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {data.coreSkills.map((skill, index) => (
                                <span key={index} className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded">{skill}</span>
                            ))}
                        </div>
                    )}
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold uppercase text-green-700 tracking-wider mb-3">Education</h2>
                    {data.education && data.education.map((edu, index) => (
                    <div key={index} className="mb-3 last:mb-0 text-sm">
                        <h3 className="font-semibold text-slate-700">{edu.institution}</h3>
                        <p className="text-slate-600">{edu.degree}</p>
                        <p className="text-xs text-slate-500">{edu.dates}</p>
                    </div>
                    ))}
                </section>

                {data.certifications && data.certifications.length > 0 && (
                    <section className="mb-8">
                        <h2 className="text-xl font-bold uppercase text-green-700 tracking-wider mb-3">Certifications</h2>
                        <ul className="space-y-1 list-inside text-sm">
                            {data.certifications.map((cert, index) => <li key={index} className="text-slate-600">{cert.value}</li>)}
                        </ul>
                    </section>
                )}
            </div>

            <main className="col-span-8">
                {data.professionalSummary && (
                    <Section title="Profile">
                        <p className="text-sm leading-relaxed">{data.professionalSummary}</p>
                    </Section>
                )}

                {data.experience && data.experience.length > 0 && (
                    <Section title="Work Experience">
                        {data.experience.map((exp, index) => (
                        <div key={index} className="mb-5 last:mb-0">
                            <div className="flex justify-between items-baseline">
                                <h3 className="font-bold text-lg">{exp.title}</h3>
                                <p className="text-xs font-medium text-slate-500">{exp.dates}</p>
                            </div>
                            <h4 className="font-semibold text-green-600">{exp.company}</h4>
                            <p className="mt-2 text-sm text-slate-600 whitespace-pre-wrap">{exp.description}</p>
                        </div>
                        ))}
                    </Section>
                )}
                
                {data.projects && data.projects.length > 0 && (
                    <Section title="Side Projects">
                        {data.projects.map((proj, index) => (
                        <div key={index} className="mb-4 last:mb-0">
                            <h3 className="font-bold text-lg flex items-center gap-2">{proj.name} <MoveRight size={16} className="text-green-500" /></h3>
                            <p className="mt-1 text-sm text-slate-600">{proj.description}</p>
                        </div>
                        ))}
                    </Section>
                )}

                {data.achievements && data.achievements.length > 0 && (
                    <Section title="Achievements">
                    <ul className="list-disc list-outside ml-4 space-y-1 text-sm">
                        {data.achievements.map((ach, index) => <li key={index}>{ach.value}</li>)}
                    </ul>
                    </Section>
                )}
            </main>
        </div>
    </div>
  );
}
