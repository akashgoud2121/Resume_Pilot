'use client';

import type { ResumeData } from '@/lib/types';
import { Github, Linkedin, Mail, Phone, GraduationCap, Briefcase, Lightbulb, Trophy, Award, User, Sparkles } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

const Section: React.FC<{ title: string; children: React.ReactNode; icon?: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="mb-4">
      <h2 className="text-sm font-bold uppercase tracking-widest text-gray-600 mb-2 flex items-center gap-2">
        {icon}
        {title}
      </h2>
      <div className="text-xs text-gray-800">
        {children}
      </div>
      <hr className="mt-4 border-gray-200" />
    </div>
  );

export function DefaultTemplate({ data }: TemplateProps) {
    
  return (
    <div className="p-8 bg-white text-gray-800 font-sans text-sm" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
      {/* Header */}
      <header className="text-center mb-6">
        <h1 className="text-4xl font-bold text-gray-800 tracking-tight">{data.name}</h1>
        {data.experience?.[0]?.title && <p className="text-lg text-gray-500 mt-1">{data.experience[0].title}</p>}
        <div className="text-xs text-gray-600 mt-3 flex justify-center items-center gap-x-4">
            {data.mobileNumber && <span className="flex items-center gap-1.5"><Phone size={12} /> {data.mobileNumber}</span>}
            {data.email && <span className="flex items-center gap-1.5"><Mail size={12} /> {data.email}</span>}
            {data.linkedinLink && <span className="flex items-center gap-1.5"><Linkedin size={12} /> {data.linkedinLink.replace('https://', '')}</span>}
            {data.githubLink && <span className="flex items-center gap-1.5"><Github size={12} /> {data.githubLink.replace('https://', '')}</span>}
        </div>
      </header>
      
      <hr className="mb-6 border-gray-200"/>

      {/* Main Content */}
      <main>
        {data.professionalSummary && (
          <Section title="Summary" icon={<User size={14}/>}>
            <p className="leading-normal">{data.professionalSummary}</p>
          </Section>
        )}

        {data.coreSkills && data.coreSkills.length > 0 && (
          <Section title="Core Skills" icon={<Sparkles size={14}/>}>
            <p className="leading-normal">{data.coreSkills.join(' • ')}</p>
          </Section>
        )}

        {data.experience && data.experience.length > 0 && (
          <Section title="Experience" icon={<Briefcase size={14}/>}>
            {data.experience.map((exp, index) => (
              <div key={index} className="mb-3 last:mb-0">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-sm text-gray-800">{exp.title}</h3>
                  <p className="text-xs font-mono text-gray-500">{exp.dates}</p>
                </div>
                <h4 className="text-sm font-medium text-gray-600">{exp.company}</h4>
                <div className="mt-1 text-xs text-gray-700 whitespace-pre-wrap leading-normal" dangerouslySetInnerHTML={{ __html: exp.description.replace(/\n/g, '<br />') }} />
              </div>
            ))}
          </Section>
        )}
        
        {data.projects && data.projects.length > 0 && (
          <Section title="Projects" icon={<Lightbulb size={14}/>}>
            {data.projects.map((proj, index) => (
              <div key={index} className="mb-3 last:mb-0">
                <h3 className="font-bold text-sm text-gray-800">{proj.name}</h3>
                <p className="mt-0.5 text-xs text-gray-700 leading-normal">{proj.description}</p>
              </div>
            ))}
          </Section>
        )}

        {data.education && data.education.length > 0 && (
          <Section title="Education" icon={<GraduationCap size={14}/>}>
            {data.education.map((edu, index) => (
              <div key={index} className="mb-2 last:mb-0">
                 <div className="flex justify-between items-baseline">
                   <h3 className="font-bold text-sm text-gray-800">{edu.institution}</h3>
                   <p className="text-xs font-mono text-gray-500">{edu.dates}</p>
                 </div>
                 <p className="text-sm text-gray-600">{edu.degree}</p>
              </div>
            ))}
          </Section>
        )}
        
        <div className="grid grid-cols-2 gap-x-6">
            {data.achievements && data.achievements.length > 0 && (
                <Section title="Achievements" icon={<Trophy size={14}/>}>
                <ul className="list-disc list-outside ml-3.5 space-y-1">
                    {data.achievements.map((ach, index) => ach.value && <li key={index} className="text-xs leading-normal">{ach.value}</li>)}
                </ul>
                </Section>
            )}

            {data.certifications && data.certifications.length > 0 && (
                <Section title="Certifications" icon={<Award size={14}/>}>
                <ul className="list-disc list-outside ml-3.5 space-y-1">
                    {data.certifications.map((cert, index) => cert.value && <li key={index} className="text-xs leading-normal">{cert.value}</li>)}
                </ul>
                </Section>
            )}
        </div>
      </main>
    </div>
  );
}