'use client';

import type { ResumeData } from '@/lib/types';
import { Separator } from '@/components/ui/separator';
import { Github, Linkedin, Mail, Phone, ExternalLink, GraduationCap, Briefcase, Lightbulb, Trophy, Award, User, Sparkles } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

const Section: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
  <section className="mb-6">
    <h2 className="text-xl font-bold text-primary mb-3 flex items-center gap-2 border-b-2 border-primary/50 pb-1">
      {icon} {title}
    </h2>
    <div className="text-sm text-gray-700">
      {children}
    </div>
  </section>
);

export function DefaultTemplate({ data }: TemplateProps) {
  return (
    <div className="p-4 bg-white text-gray-800 font-sans">
      {/* Header */}
      <header className="text-center mb-6">
        <h1 className="text-4xl font-extrabold text-primary">{data.name}</h1>
        <div className="flex justify-center items-center gap-x-4 gap-y-1 mt-2 text-xs flex-wrap">
          {data.email && <a href={`mailto:${data.email}`} className="flex items-center gap-1 hover:text-primary"><Mail size={12} /> {data.email}</a>}
          {data.mobileNumber && <span className="flex items-center gap-1"><Phone size={12} /> {data.mobileNumber}</span>}
          {data.linkedinLink && <a href={data.linkedinLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary"><Linkedin size={12} /> LinkedIn</a>}
          {data.githubLink && <a href={data.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary"><Github size={12} /> GitHub</a>}
        </div>
      </header>
      
      <Separator className="my-6" />

      {/* Main Content */}
      <main>
        {data.professionalSummary && (
          <Section title="Professional Summary" icon={<User size={18} />}>
            <p>{data.professionalSummary}</p>
          </Section>
        )}

        {data.coreSkills && data.coreSkills.length > 0 && (
          <Section title="Core Skills" icon={<Sparkles size={18} />}>
            <div className="flex flex-wrap gap-2">
              {data.coreSkills.map((skill, index) => (
                <span key={index} className="bg-primary/10 text-primary text-xs font-medium px-2.5 py-1 rounded-full">{skill}</span>
              ))}
            </div>
          </Section>
        )}

        {data.experience && data.experience.length > 0 && (
          <Section title="Experience" icon={<Briefcase size={18} />}>
            {data.experience.map((exp, index) => (
              <div key={index} className="mb-4 last:mb-0">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold">{exp.title}</h3>
                  <p className="text-xs font-medium text-gray-600">{exp.dates}</p>
                </div>
                <h4 className="font-semibold text-primary/80">{exp.company}</h4>
                <p className="mt-1 text-gray-600 whitespace-pre-wrap">{exp.description}</p>
              </div>
            ))}
          </Section>
        )}
        
        {data.projects && data.projects.length > 0 && (
          <Section title="Projects" icon={<Lightbulb size={18} />}>
            {data.projects.map((proj, index) => (
              <div key={index} className="mb-4 last:mb-0">
                <h3 className="font-bold">{proj.name}</h3>
                <p className="mt-1 text-gray-600">{proj.description}</p>
              </div>
            ))}
          </Section>
        )}

        {data.education && data.education.length > 0 && (
          <Section title="Education" icon={<GraduationCap size={18} />}>
            {data.education.map((edu, index) => (
              <div key={index} className="mb-3 last:mb-0">
                 <div className="flex justify-between items-baseline">
                   <h3 className="font-bold">{edu.institution}</h3>
                   <p className="text-xs font-medium text-gray-600">{edu.dates}</p>
                 </div>
                 <p className="text-gray-600">{edu.degree}</p>
              </div>
            ))}
          </Section>
        )}

        <div className="grid grid-cols-2 gap-6">
          {data.achievements && data.achievements.length > 0 && (
            <Section title="Achievements" icon={<Trophy size={18} />}>
              <ul className="list-disc list-inside">
                {data.achievements.map((ach, index) => <li key={index}>{ach.value}</li>)}
              </ul>
            </Section>
          )}

          {data.certifications && data.certifications.length > 0 && (
            <Section title="Certifications" icon={<Award size={18} />}>
              <ul className="list-disc list-inside">
                {data.certifications.map((cert, index) => <li key={index}>{cert.value}</li>)}
              </ul>
            </Section>
          )}
        </div>

      </main>
    </div>
  );
}
