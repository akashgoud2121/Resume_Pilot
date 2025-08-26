'use client';

import type { ResumeData } from '@/lib/types';
import { Github, Linkedin, Mail, Phone, Briefcase, GraduationCap, Lightbulb, Sparkles, Trophy, Award, User } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

const Section: React.FC<{ title: string; children: React.ReactNode; icon?: React.ReactNode }> = ({ title, icon, children }) => (
    <section className="mb-6">
      <h2 className="flex items-center text-lg font-bold text-gray-800 uppercase tracking-wider mb-2 border-b-2 border-gray-200 pb-1">
        {icon}
        <span className="ml-2">{title}</span>
      </h2>
      <div className="text-sm text-gray-700">
        {children}
      </div>
    </section>
  );

export function DefaultTemplate({ data }: TemplateProps) {
  return (
    <div className="p-8 bg-white text-gray-800 font-sans text-[11pt] leading-normal" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <header className="text-center mb-6 border-b-2 border-gray-200 pb-4">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">{data.name}</h1>
        {data.experience?.[0]?.title && <p className="text-lg text-blue-600 mt-1">{data.experience[0].title}</p>}
        <div className="text-xs text-gray-600 mt-4 flex justify-center items-center gap-x-4 gap-y-1 flex-wrap">
            {data.email && <a href={`mailto:${data.email}`} className="flex items-center gap-1.5 hover:text-blue-600"><Mail size={12} /> {data.email}</a>}
            {data.mobileNumber && <span className="flex items-center gap-1.5"><Phone size={12} /> {data.mobileNumber}</span>}
            {data.linkedinLink && <a href={data.linkedinLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-blue-600"><Linkedin size={12} /> LinkedIn</a>}
            {data.githubLink && <a href={data.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-blue-600"><Github size={12} /> GitHub</a>}
        </div>
      </header>

      {/* Main Content */}
      <main>
        {data.professionalSummary && (
          <Section title="Summary" icon={<User size={18}/>}>
            <p className="text-justify">{data.professionalSummary}</p>
          </Section>
        )}

        {data.coreSkills && data.coreSkills.length > 0 && (
          <Section title="Skills" icon={<Sparkles size={18}/>}>
            <p className="leading-relaxed">{data.coreSkills.join(' • ')}</p>
          </Section>
        )}

        {data.experience && data.experience.length > 0 && (
          <Section title="Experience" icon={<Briefcase size={18}/>}>
            {data.experience.map((exp, index) => (
              <div key={index} className="mb-4 last:mb-0">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-base text-gray-800">{exp.title}</h3>
                  <p className="text-xs font-medium text-gray-500">{exp.dates}</p>
                </div>
                <h4 className="text-sm font-semibold text-blue-600">{exp.company}</h4>
                <p className="mt-1.5 text-gray-700 whitespace-pre-wrap">{exp.description}</p>
              </div>
            ))}
          </Section>
        )}
        
        {data.projects && data.projects.length > 0 && (
          <Section title="Projects" icon={<Lightbulb size={18}/>}>
            {data.projects.map((proj, index) => (
              <div key={index} className="mb-4 last:mb-0">
                <h3 className="font-bold text-base text-gray-800">{proj.name}</h3>
                <p className="mt-1 text-gray-700">{proj.description}</p>
              </div>
            ))}
          </Section>
        )}

        {data.education && data.education.length > 0 && (
          <Section title="Education" icon={<GraduationCap size={18}/>}>
            {data.education.map((edu, index) => (
              <div key={index} className="mb-3 last:mb-0">
                 <div className="flex justify-between items-baseline">
                   <h3 className="font-bold text-base text-gray-800">{edu.institution}</h3>
                   <p className="text-xs font-medium text-gray-500">{edu.dates}</p>
                 </div>
                 <p className="text-sm text-gray-600">{edu.degree}</p>
              </div>
            ))}
          </Section>
        )}
        
        {data.achievements && data.achievements.length > 0 && data.achievements[0].value && (
            <Section title="Achievements" icon={<Trophy size={18}/>}>
                <ul className="list-disc list-outside ml-4 space-y-1">
                    {data.achievements.map((ach, index) => ach.value && <li key={index}>{ach.value}</li>)}
                </ul>
            </Section>
        )}

        {data.certifications && data.certifications.length > 0 && data.certifications[0].value && (
            <Section title="Certifications" icon={<Award size={18}/>}>
                <ul className="list-disc list-outside ml-4 space-y-1">
                    {data.certifications.map((cert, index) => cert.value && <li key={index}>{cert.value}</li>)}
                </ul>
            </Section>
        )}
      </main>
    </div>
  );
}
