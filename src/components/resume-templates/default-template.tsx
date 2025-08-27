'use client';

import type { ResumeData } from '@/lib/types';
import { Github, Linkedin, Mail, Phone, Briefcase, GraduationCap, Lightbulb, Sparkles, Trophy, Award, User } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

const Section: React.FC<{ title: string; children: React.ReactNode; icon?: React.ReactNode }> = ({ title, icon, children }) => (
    <section className="mb-[1.5em]">
      <h2 className="flex items-center text-[1.6em] font-bold text-gray-800 uppercase tracking-wider mb-[0.5em] border-b-2 border-gray-200 pb-[0.25em]">
        {icon}
        <span className="ml-[0.5em]">{title}</span>
      </h2>
      <div className="text-[1.2em] text-gray-700">
        {children}
      </div>
    </section>
  );

export function DefaultTemplate({ data }: TemplateProps) {
  return (
    <div className="p-[2em] bg-white text-gray-800 font-sans leading-normal" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <header className="text-center mb-[1.5em] border-b-2 border-gray-200 pb-[1em]">
        <h1 className="text-[3.5em] font-bold text-gray-900 tracking-tight">{data.name}</h1>
        {data.experience?.[0]?.title && <p className="text-[1.5em] text-blue-600 mt-[0.25em]">{data.experience[0].title}</p>}
        <div className="text-[1em] text-gray-600 mt-[1em] flex justify-center items-center gap-x-[1.5em] gap-y-[0.25em] flex-wrap">
            {data.email && <a href={`mailto:${data.email}`} className="flex items-center gap-[0.4em] hover:text-blue-600"><Mail className="w-[1em] h-[1em]" /> {data.email}</a>}
            {data.mobileNumber && <span className="flex items-center gap-[0.4em]"><Phone className="w-[1em] h-[1em]" /> {data.mobileNumber}</span>}
            {data.linkedinLink && <a href={data.linkedinLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-[0.4em] hover:text-blue-600"><Linkedin className="w-[1em] h-[1em]" /> LinkedIn</a>}
            {data.githubLink && <a href={data.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-[0.4em] hover:text-blue-600"><Github className="w-[1em] h-[1em]" /> GitHub</a>}
        </div>
      </header>

      {/* Main Content */}
      <main>
        {data.professionalSummary && (
          <Section title="Summary" icon={<User className="w-[1em] h-[1em]"/>}>
            <p className="text-justify">{data.professionalSummary}</p>
          </Section>
        )}

        {data.coreSkills && data.coreSkills.length > 0 && (
          <Section title="Skills" icon={<Sparkles className="w-[1em] h-[1em]"/>}>
            <p className="leading-relaxed">{data.coreSkills.join(' • ')}</p>
          </Section>
        )}

        {data.experience && data.experience.length > 0 && (
          <Section title="Experience" icon={<Briefcase className="w-[1em] h-[1em]"/>}>
            {data.experience.map((exp, index) => (
              <div key={index} className="mb-[1em] last:mb-0">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-[1.4em] text-gray-800">{exp.title}</h3>
                  <p className="text-[0.9em] font-medium text-gray-500">{exp.dates}</p>
                </div>
                <h4 className="text-[1.2em] font-semibold text-blue-600">{exp.company}</h4>
                <p className="mt-[0.4em] text-gray-700 whitespace-pre-wrap">{exp.description}</p>
              </div>
            ))}
          </Section>
        )}
        
        {data.projects && data.projects.length > 0 && (
          <Section title="Projects" icon={<Lightbulb className="w-[1em] h-[1em]"/>}>
            {data.projects.map((proj, index) => (
              <div key={index} className="mb-[1em] last:mb-0">
                <h3 className="font-bold text-[1.4em] text-gray-800">{proj.name}</h3>
                <p className="mt-[0.25em] text-gray-700">{proj.description}</p>
              </div>
            ))}
          </Section>
        )}

        {data.education && data.education.length > 0 && (
          <Section title="Education" icon={<GraduationCap className="w-[1em] h-[1em]"/>}>
            {data.education.map((edu, index) => (
              <div key={index} className="mb-[0.75em] last:mb-0">
                 <div className="flex justify-between items-baseline">
                   <h3 className="font-bold text-[1.4em] text-gray-800">{edu.institution}</h3>
                   <p className="text-[0.9em] font-medium text-gray-500">{edu.dates}</p>
                 </div>
                 <p className="text-[1.2em] text-gray-600">{edu.degree}</p>
              </div>
            ))}
          </Section>
        )}
        
        {data.achievements && data.achievements.length > 0 && data.achievements[0].value && (
            <Section title="Achievements" icon={<Trophy className="w-[1em] h-[1em]"/>}>
                <ul className="list-disc list-outside ml-[1.5em] space-y-[0.25em]">
                    {data.achievements.map((ach, index) => ach.value && <li key={index}>{ach.value}</li>)}
                </ul>
            </Section>
        )}

        {data.certifications && data.certifications.length > 0 && data.certifications[0].value && (
            <Section title="Certifications" icon={<Award className="w-[1em] h-[1em]"/>}>
                <ul className="list-disc list-outside ml-[1.5em] space-y-[0.25em]">
                    {data.certifications.map((cert, index) => cert.value && <li key={index}>{cert.value}</li>)}
                </ul>
            </Section>
        )}
      </main>
    </div>
  );
}
