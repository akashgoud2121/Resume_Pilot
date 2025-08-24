'use client';

import type { ResumeData } from '@/lib/types';

interface TemplateProps {
  data: ResumeData;
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="mb-5">
    <h2 className="text-[10px] font-semibold uppercase tracking-widest text-gray-500 mb-2.5">{title}</h2>
    <div className="text-xs text-gray-800 space-y-3">
      {children}
    </div>
  </section>
);

export function MinimalTemplate({ data }: TemplateProps) {
  return (
    <div className="p-10 bg-white text-gray-700 font-light" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-3xl font-normal text-gray-900 tracking-wider">{data.name}</h1>
        <div className="flex justify-center items-center gap-x-4 gap-y-1 mt-2.5 text-[10px] text-gray-500">
          {data.email && <a href={`mailto:${data.email}`} className="hover:text-black break-all">{data.email}</a>}
          {data.mobileNumber && <span>{data.mobileNumber}</span>}
          {data.linkedinLink && <a href={data.linkedinLink} target="_blank" rel="noopener noreferrer" className="hover:text-black">LinkedIn</a>}
          {data.githubLink && <a href={data.githubLink} target="_blank" rel="noopener noreferrer" className="hover:text-black">GitHub</a>}
        </div>
      </header>
      
      <hr className="mb-8" />

      {/* Main Content */}
      <main>
        {data.professionalSummary && (
          <Section title="Summary">
            <p className="leading-relaxed">{data.professionalSummary}</p>
          </Section>
        )}

        {data.experience && data.experience.length > 0 && (
          <Section title="Experience">
            {data.experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-medium text-sm text-gray-900">{exp.title}, <span className="text-gray-600">{exp.company}</span></h3>
                  <p className="text-[10px] font-mono text-gray-500">{exp.dates}</p>
                </div>
                <p className="mt-1 text-xs text-gray-600 whitespace-pre-wrap">{exp.description}</p>
              </div>
            ))}
          </Section>
        )}
        
        {data.projects && data.projects.length > 0 && (
          <Section title="Projects">
            {data.projects.map((proj, index) => (
              <div key={index}>
                <h3 className="font-medium text-sm text-gray-900">{proj.name}</h3>
                <p className="mt-0.5 text-xs text-gray-600">{proj.description}</p>
              </div>
            ))}
          </Section>
        )}

        {data.education && data.education.length > 0 && (
          <Section title="Education">
            {data.education.map((edu, index) => (
              <div key={index}>
                 <div className="flex justify-between items-baseline">
                   <h3 className="font-medium text-sm text-gray-900">{edu.institution}</h3>
                   <p className="text-[10px] font-mono text-gray-500">{edu.dates}</p>
                 </div>
                 <p className="text-gray-600">{edu.degree}</p>
              </div>
            ))}
          </Section>
        )}
        
        <div className="grid grid-cols-2 gap-x-8">
          {data.coreSkills && data.coreSkills.length > 0 && (
            <Section title="Skills">
                <p>{data.coreSkills.join(', ')}</p>
            </Section>
          )}

          {data.certifications && data.certifications.length > 0 && (
            <Section title="Certifications">
              <ul className="list-none space-y-1">
                {data.certifications.map((cert, index) => <li key={index}>{cert.value}</li>)}
              </ul>
            </Section>
          )}
        </div>
        
        {data.achievements && data.achievements.length > 0 && (
          <Section title="Achievements">
            <ul className="list-none space-y-1">
              {data.achievements.map((ach, index) => <li key={index}>{ach.value}</li>)}
            </ul>
          </Section>
        )}
      </main>
    </div>
  );
}

    