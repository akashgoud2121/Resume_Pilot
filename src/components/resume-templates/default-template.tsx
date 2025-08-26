'use client';

import type { ResumeData } from '@/lib/types';
import { Separator } from '@/components/ui/separator';
import { Github, Linkedin, Mail, Phone, GraduationCap, Briefcase, Lightbulb, Trophy, Award, User, Sparkles } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-4">
      <h2 className="text-lg font-bold text-primary mb-2 border-b-2 border-primary/50 pb-1">
        {title}
      </h2>
      <div className="text-xs text-gray-700">
        {children}
      </div>
    </div>
  );

export function DefaultTemplate({ data }: TemplateProps) {
  const getSkills = () => {
    if (!data.coreSkills) return [];
    return data.coreSkills.flatMap(s => {
        const parts = s.split(/:(.*)/s);
        return parts.length > 1 ? parts[1].split(',').map(sk => sk.trim()) : parts;
    }).filter(Boolean);
  }

  return (
    <div className="p-8 bg-white text-gray-800 font-sans">
      {/* Header */}
      <header className="text-center mb-4">
        <h1 className="text-3xl font-extrabold text-primary">{data.name}</h1>
        <div className="text-xs text-gray-600 mt-2">
            <span>{data.mobileNumber}</span>
            {data.mobileNumber && data.email && <span className="mx-2">|</span>}
            <span>{data.email}</span>
            {(data.mobileNumber || data.email) && (data.linkedinLink || data.githubLink) && <span className="mx-2">|</span>}
            <a href={data.linkedinLink} target="_blank" rel="noopener noreferrer" className="hover:text-primary">{data.linkedinLink}</a>
            {data.linkedinLink && data.githubLink && <span className="mx-2">|</span>}
            <a href={data.githubLink} target="_blank" rel="noopener noreferrer" className="hover:text-primary">{data.githubLink}</a>
        </div>
      </header>
      
      <Separator className="my-4" />

      {/* Main Content */}
      <main>
        {data.professionalSummary && (
          <Section title="Professional Summary">
            <p className="text-sm leading-relaxed">{data.professionalSummary}</p>
          </Section>
        )}

        {data.experience && data.experience.length > 0 && (
          <Section title="Experience">
            {data.experience.map((exp, index) => (
              <div key={index} className="mb-4 last:mb-0">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-base font-bold">{exp.title}</h3>
                  <p className="text-xs font-medium text-gray-600">{exp.dates}</p>
                </div>
                <h4 className="text-sm font-semibold text-primary/80">{exp.company}</h4>
                <p className="mt-1 text-sm text-gray-600 whitespace-pre-wrap">{exp.description}</p>
              </div>
            ))}
          </Section>
        )}
        
        {data.projects && data.projects.length > 0 && (
          <Section title="Projects">
            {data.projects.map((proj, index) => (
              <div key={index} className="mb-3 last:mb-0">
                <h3 className="text-base font-bold">{proj.name}</h3>
                <p className="mt-0.5 text-sm text-gray-600">{proj.description}</p>
              </div>
            ))}
          </Section>
        )}

        {data.education && data.education.length > 0 && (
          <Section title="Education">
            {data.education.map((edu, index) => (
              <div key={index} className="mb-3 last:mb-0">
                 <div className="flex justify-between items-baseline">
                   <h3 className="text-base font-bold">{edu.institution}</h3>
                   <p className="text-xs font-medium text-gray-600">{edu.dates}</p>
                 </div>
                 <p className="text-sm text-gray-600">{edu.degree}</p>
              </div>
            ))}
          </Section>
        )}
        
        {data.coreSkills && getSkills().length > 0 && (
          <Section title="Core Skills">
            <p className="text-sm leading-relaxed">{getSkills().join(' • ')}</p>
          </Section>
        )}
        
        {data.certifications && data.certifications.length > 0 && (
            <Section title="Certifications">
              <ul className="list-disc list-outside ml-4 space-y-1">
                {data.certifications.map((cert, index) => cert.value && <li key={index} className="text-sm">{cert.value}</li>)}
              </ul>
            </Section>
          )}

        {data.achievements && data.achievements.length > 0 && (
          <Section title="Achievements">
            <ul className="list-disc list-outside ml-4 space-y-1">
              {data.achievements.map((ach, index) => ach.value && <li key={index} className="text-sm">{ach.value}</li>)}
            </ul>
          </Section>
        )}
      </main>
    </div>
  );
}
