'use client';

import type { ResumeData } from '@/lib/types';
import { Github, Linkedin, Mail, Phone, GraduationCap, Briefcase, Lightbulb, Trophy, Award, User, Sparkles } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

const Section: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode, className?: string }> = ({ title, icon, children, className }) => (
  <section className={`mb-5 ${className}`}>
    <h2 className="text-base font-bold text-indigo-700 mb-2 flex items-center gap-2 border-b-2 border-indigo-200 pb-1">
      {icon} {title}
    </h2>
    <div className="text-xs text-gray-700">
      {children}
    </div>
  </section>
);


export function DoubleColumnTemplate({ data }: TemplateProps) {
  return (
    <div className="p-6 bg-white text-gray-800 font-sans">
      {/* Header */}
      <header className="mb-5">
        <h1 className="text-3xl font-extrabold text-gray-800">{data.name}</h1>
        {data.experience?.[0]?.title && <p className="text-indigo-600 font-medium text-md">{data.experience[0].title}</p>}
        <div className="flex items-center gap-x-3 gap-y-1 mt-1.5 text-[10px] text-gray-600 flex-wrap">
          {data.email && <a href={`mailto:${data.email}`} className="flex items-center gap-1 hover:text-indigo-600 break-all"><Mail size={12} /> {data.email}</a>}
          {data.mobileNumber && <span className="flex items-center gap-1"><Phone size={12} /> {data.mobileNumber}</span>}
          {data.linkedinLink && <a href={data.linkedinLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-indigo-600"><Linkedin size={12} /> LinkedIn</a>}
          {data.githubLink && <a href={data.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-indigo-600"><Github size={12} /> GitHub</a>}
        </div>
      </header>

      {/* Main Content */}
      <main className="grid grid-cols-3 gap-x-6">
        <div className="col-span-2">
            {data.professionalSummary && (
                <Section title="Summary" icon={<User size={16} />}>
                    <p className="leading-relaxed">{data.professionalSummary}</p>
                </Section>
            )}
            
            {data.experience && data.experience.length > 0 && (
                <Section title="Experience" icon={<Briefcase size={16} />}>
                    {data.experience.map((exp, index) => (
                    <div key={index} className="mb-3 last:mb-0">
                        <div className="flex justify-between items-baseline">
                        <h3 className="font-bold text-sm">{exp.title}</h3>
                        <p className="text-[10px] font-medium text-gray-500">{exp.dates}</p>
                        </div>
                        <h4 className="font-semibold text-indigo-600 text-xs">{exp.company}</h4>
                        <p className="mt-1 text-gray-600 whitespace-pre-wrap">{exp.description}</p>
                    </div>
                    ))}
                </Section>
            )}

            {data.projects && data.projects.length > 0 && (
                <Section title="Projects" icon={<Lightbulb size={16} />}>
                    {data.projects.map((proj, index) => (
                    <div key={index} className="mb-3 last:mb-0">
                        <h3 className="font-bold text-sm">{proj.name}</h3>
                        <p className="mt-0.5 text-gray-600">{proj.description}</p>
                    </div>
                    ))}
                </Section>
            )}

        </div>
        <div className="col-span-1">
            {data.coreSkills && data.coreSkills.length > 0 && (
                <Section title="Skills" icon={<Sparkles size={16} />}>
                    <div className="flex flex-wrap gap-1.5">
                    {data.coreSkills.map((skill, index) => (
                        <span key={index} className="bg-indigo-100 text-indigo-800 text-[10px] font-medium px-2 py-1 rounded-full">{skill}</span>
                    ))}
                    </div>
                </Section>
            )}

            {data.education && data.education.length > 0 && (
                <Section title="Education" icon={<GraduationCap size={16} />}>
                    {data.education.map((edu, index) => (
                    <div key={index} className="mb-2.5 last:mb-0">
                        <h3 className="font-bold text-sm">{edu.institution}</h3>
                        <p className="text-gray-600">{edu.degree}</p>
                        <p className="text-[10px] text-gray-500">{edu.dates}</p>
                    </div>
                    ))}
                </Section>
            )}

            {data.achievements && data.achievements.length > 0 && (
                <Section title="Achievements" icon={<Trophy size={16} />}>
                <ul className="list-disc list-inside space-y-1">
                    {data.achievements.map((ach, index) => <li key={index}>{ach.value}</li>)}
                </ul>
                </Section>
            )}

            {data.certifications && data.certifications.length > 0 && (
                <Section title="Certifications" icon={<Award size={16} />}>
                <ul className="list-disc list-inside space-y-1">
                    {data.certifications.map((cert, index) => <li key={index}>{cert.value}</li>)}
                </ul>
                </Section>
            )}
        </div>
      </main>
    </div>
  );
}

    