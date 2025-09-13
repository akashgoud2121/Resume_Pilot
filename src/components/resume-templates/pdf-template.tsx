
'use client';

import type { ResumeData } from '@/lib/types';

interface TemplateProps {
  data: ResumeData;
}

const Section: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
  <section style={{ marginBottom: '16px', pageBreakInside: 'avoid' }} className={className}>
    <h2 style={{ fontSize: '12pt', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', color: '#333', borderBottom: '1px solid #ccc', paddingBottom: '4px', marginBottom: '8px' }}>
      {title}
    </h2>
    <div style={{ fontSize: '10pt', color: '#555' }}>
      {children}
    </div>
  </section>
);

export function PdfTemplate({ data }: TemplateProps) {
  return (
    <div style={{ padding: '20px', backgroundColor: 'white', color: '#333', fontFamily: 'Arial, sans-serif', fontSize: '10pt' }}>
      <header style={{ textAlign: 'center', marginBottom: '16px' }}>
        <h1 style={{ fontSize: '24pt', fontWeight: 'bold', margin: '0 0 5px 0' }}>{data.name}</h1>
        {data.experience?.[0]?.title && <p style={{ fontSize: '12pt', color: '#555', margin: '0 0 10px 0' }}>{data.experience[0].title}</p>}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '5px 15px', fontSize: '9pt', color: '#444' }}>
          {data.email && <span>{data.email}</span>}
          {data.mobileNumber && <span>{data.mobileNumber}</span>}
          {data.linkedinLink && <span>{data.linkedinLink.replace('https://', '')}</span>}
          {data.githubLink && <span>{data.githubLink.replace('https://', '')}</span>}
        </div>
      </header>
      
      <main>
        {data.professionalSummary && (
          <Section title="Summary">
            <p style={{ margin: 0, lineHeight: 1.4 }}>{data.professionalSummary}</p>
          </Section>
        )}

        {data.coreSkills && data.coreSkills.length > 0 && (
          <Section title="Skills">
            <p style={{ margin: 0, lineHeight: 1.4 }}>{data.coreSkills.map(s => s.value).join(' | ')}</p>
          </Section>
        )}

        {data.experience && data.experience.length > 0 && (
          <Section title="Experience">
            {data.experience.map((exp, index) => (
              <div key={index} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 style={{ fontSize: '11pt', fontWeight: 'bold', margin: 0 }}>{exp.title}</h3>
                  <p style={{ fontSize: '9pt', color: '#666', margin: 0 }}>{exp.dates}</p>
                </div>
                <h4 style={{ fontSize: '10pt', fontStyle: 'italic', color: '#444', margin: '2px 0' }}>{exp.company}</h4>
                <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.4, color: '#555' }}>
                  {exp.description}
                </div>
              </div>
            ))}
          </Section>
        )}

        {data.projects && data.projects.length > 0 && (
          <Section title="Projects">
            {data.projects.map((proj, index) => (
              <div key={index} style={{ marginBottom: '10px' }}>
                <h3 style={{ fontSize: '11pt', fontWeight: 'bold', margin: 0 }}>{proj.name}</h3>
                <p style={{ margin: '2px 0 0 0', lineHeight: 1.4 }}>{proj.description}</p>
              </div>
            ))}
          </Section>
        )}

        {data.education && data.education.length > 0 && (
          <Section title="Education">
            {data.education.map((edu, index) => (
              <div key={index} style={{ marginBottom: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 style={{ fontSize: '11pt', fontWeight: 'bold', margin: 0 }}>{edu.institution}</h3>
                  <p style={{ fontSize: '9pt', color: '#666', margin: 0 }}>{edu.dates}</p>
                </div>
                <p style={{ margin: '2px 0 0 0' }}>{edu.degree}</p>
              </div>
            ))}
          </Section>
        )}

        {(data.achievements && data.achievements.length > 0 && data.achievements[0].value) || (data.certifications && data.certifications.length > 0 && data.certifications[0].value) ? (
          <div style={{ display: 'flex', gap: '20px', pageBreakInside: 'avoid' }}>
            {data.achievements && data.achievements.length > 0 && data.achievements[0].value && (
              <Section title="Achievements" className="flex-1">
                <ul style={{ margin: 0, paddingLeft: '18px' }}>
                  {data.achievements.map((ach) => (ach.value ? <li key={ach.id} style={{ marginBottom: '4px' }}>{ach.value}</li> : null))}
                </ul>
              </Section>
            )}
            {data.certifications && data.certifications.length > 0 && data.certifications[0].value && (
              <Section title="Certifications" className="flex-1">
                <ul style={{ margin: 0, paddingLeft: '18px' }}>
                  {data.certifications.map((cert) => (cert.value ? <li key={cert.id} style={{ marginBottom: '4px' }}>{cert.value}</li> : null))}
                </ul>
              </Section>
            )}
          </div>
        ) : null}
      </main>
    </div>
  );
}
