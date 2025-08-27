'use client';

import type { ResumeData } from '@/lib/types';
import { Github, Linkedin, Mail, Phone, GraduationCap, Briefcase, Lightbulb, Trophy, Award, User, Sparkles } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

const Section: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode, className?: string }> = ({ title, icon, children, className }) => (
  <section className={`mb-[1.25em] ${className}`}>
    <h2 className="text-[1.4em] font-bold text-indigo-700 mb-[0.5em] flex items-center gap-[0.5em] border-b-2 border-indigo-200 pb-[0.25em]">
      {icon} {title}
    </h2>
    <div className="text-[1em] text-gray-700">
      {children}
    </div>
  </section>
);


export function DoubleColumnTemplate({ data }: TemplateProps) {
  return (
    <div className="p-[1.5em] bg-white text-gray-800 font-sans">
      {/* Header */}
      <header className="mb-[1.25em]">
        <h1 className="text-[3em] font-extrabold text-gray-800">{data.name}</h1>
        {data.experience?.[0]?.title && <p className="text-indigo-600 font-medium text-[1.5em]">{data.experience[0].title}</p>}
        <div className="flex items-center gap-x-[1em] gap-y-[0.25em] mt-[0.4em] text-[0.8em] text-gray-600 flex-wrap">
          {data.email && <a href={`mailto:${data.email}`} className="flex items-center gap-[0.25em] hover:text-indigo-600 break-all"><Mail className="w-[1em] h-[1em]" /> {data.email}</a>}
          {data.mobileNumber && <span className="flex items-center gap-[0.25em]"><Phone className="w-[1em] h-[1em]" /> {data.mobileNumber}</span>}
          {data.linkedinLink && <a href={data.linkedinLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-[0.25em] hover:text-indigo-600"><Linkedin className="w-[1em] h-[1em]" /> LinkedIn</a>}
          {data.githubLink && <a href={data.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-[0.25em] hover:text-indigo-600"><Github className="w-[1em] h-[1em]" /> GitHub</a>}
        </div>
      </header>

      {/* Main Content */}
      <main className="grid grid-cols-3 gap-x-[1.5em]">
        <div className="col-span-2">
            {data.professionalSummary && (
                <Section title="Summary" icon={<User className="w-[1em] h-[1em]" />}>
                    <p className="leading-relaxed">{data.professionalSummary}</p>
                </Section>
            )}
            
            {data.experience && data.experience.length > 0 && (
                <Section title="Experience" icon={<Briefcase className="w-[1em] h-[1em]" />}>
                    {data.experience.map((exp, index) => (
                    <div key={index} className="mb-[0.75em] last:mb-0">
                        <div className="flex justify-between items-baseline">
                        <h3 className="font-bold text-[1.2em]">{exp.title}</h3>
                        <p className="text-[0.8em] font-medium text-gray-500">{exp.dates}</p>
                        </div>
                        <h4 className="font-semibold text-indigo-600 text-[1em]">{exp.company}</h4>
                        <p className="mt-[0.25em] text-gray-600 whitespace-pre-wrap">{exp.description}</p>
                    </div>
                    ))}
                </Section>
            )}

            {data.projects && data.projects.length > 0 && (
                <Section title="Projects" icon={<Lightbulb className="w-[1em] h-[1em]" />}>
                    {data.projects.map((proj, index) => (
                    <div key={index} className="mb-[0.75em] last:mb-0">
                        <h3 className="font-bold text-[1.2em]">{proj.name}</h3>
                        <p className="mt-[0.1em] text-gray-600">{proj.description}</p>
                    </div>
                    ))}
                </Section>
            )}

        </div>
        <div className="col-span-1">
            {data.coreSkills && data.coreSkills.length > 0 && (
                <Section title="Skills" icon={<Sparkles className="w-[1em] h-[1em]" />}>
                    <div className="flex flex-wrap gap-[0.4em]">
                    {data.coreSkills.map((skill, index) => (
                        <span key={index} className="bg-indigo-100 text-indigo-800 text-[0.8em] font-medium px-[0.75em] py-[0.25em] rounded-full">{skill}</span>
                    ))}
                    </div>
                </Section>
            )}

            {data.education && data.education.length > 0 && (
                <Section title="Education" icon={<GraduationCap className="w-[1em] h-[1em]" />}>
                    {data.education.map((edu, index) => (
                    <div key={index} className="mb-[0.6em] last:mb-0">
                        <h3 className="font-bold text-[1.2em]">{edu.institution}</h3>
                        <p className="text-gray-600 text-[1em]">{edu.degree}</p>
                        <p className="text-[0.8em] text-gray-500">{edu.dates}</p>
                    </div>
                    ))}
                </Section>
            )}

            {data.achievements && data.achievements.length > 0 && (
                <Section title="Achievements" icon={<Trophy className="w-[1em] h-[1em]" />}>
                <ul className="list-disc list-inside space-y-[0.25em]">
                    {data.achievements.map((ach, index) => <li key={index}>{ach.value}</li>)}
                </ul>
                </Section>
            )}

            {data.certifications && data.certifications.length > 0 && (
                <Section title="Certifications" icon={<Award className="w-[1em] h-[1em]" />}>
                <ul className="list-disc list-inside space-y-[0.25em]">
                    {data.certifications.map((cert, index) => <li key={index}>{cert.value}</li>)}
                </ul>
                </Section>
            )}
        </div>
      </main>
    </div>
  );
}

    
