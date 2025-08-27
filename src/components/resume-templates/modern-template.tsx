'use client';

import type { ResumeData } from '@/lib/types';
import { Github, Linkedin, Mail, Phone, GraduationCap, Briefcase, Lightbulb, Trophy, Award, User } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

export function ModernTemplate({ data }: TemplateProps) {
  return (
    <div className="p-[1.5em] bg-white text-gray-800 font-sans flex gap-[1.5em] text-[1em]">
      {/* Left Column */}
      <aside className="w-1/3 bg-gray-100 p-[1em] rounded-lg">
        <div className="text-center">
            <h1 className="text-[2.2em] font-bold text-gray-900">{data.name}</h1>
            {data.experience?.[0]?.title && <p className="text-[1.4em] text-blue-600 font-medium mt-[0.25em]">{data.experience[0].title}</p>}
        </div>

        <div className="mt-[1.5em]">
            <h2 className="text-[1em] font-bold uppercase tracking-widest text-gray-600 mb-[0.75em]">Contact</h2>
            <div className="space-y-[0.5em] text-[0.8em]">
                {data.email && <a href={`mailto:${data.email}`} className="flex items-center gap-[0.5em] hover:text-blue-600 break-all"><Mail className="w-[1.2em] h-[1.2em]" /> {data.email}</a>}
                {data.mobileNumber && <span className="flex items-center gap-[0.5em]"><Phone className="w-[1.2em] h-[1.2em]" /> {data.mobileNumber}</span>}
                {data.linkedinLink && <a href={data.linkedinLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-[0.5em] hover:text-blue-600"><Linkedin className="w-[1.2em] h-[1.2em]" /> LinkedIn</a>}
                {data.githubLink && <a href={data.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-[0.5em] hover:text-blue-600"><Github className="w-[1.2em] h-[1.2em]" /> GitHub</a>}
            </div>
        </div>

        <div className="mt-[1.5em]">
            <h2 className="text-[1em] font-bold uppercase tracking-widest text-gray-600 mb-[0.75em]">Skills</h2>
             {data.coreSkills && data.coreSkills.length > 0 && (
                <div className="flex flex-wrap gap-[0.4em]">
                    {data.coreSkills.map((skill, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 text-[0.75em] font-medium px-[0.75em] py-[0.25em] rounded-full">{skill}</span>
                    ))}
                </div>
            )}
        </div>

        <div className="mt-[1.5em]">
            <h2 className="text-[1em] font-bold uppercase tracking-widest text-gray-600 mb-[0.75em]">Education</h2>
            {data.education && data.education.map((edu, index) => (
              <div key={index} className="mb-[0.75em] last:mb-0">
                 <h3 className="font-semibold text-[1em]">{edu.institution}</h3>
                 <p className="text-gray-600 text-[0.8em]">{edu.degree}</p>
                 <p className="text-[0.75em] text-gray-500">{edu.dates}</p>
              </div>
            ))}
        </div>

        {data.certifications && data.certifications.length > 0 && (
            <div className="mt-[1.5em]">
                <h2 className="text-[1em] font-bold uppercase tracking-widest text-gray-600 mb-[0.75em]">Certifications</h2>
                <ul className="space-y-[0.4em] text-[0.8em] list-inside">
                    {data.certifications.map((cert, index) => <li key={index} className="text-gray-700">{cert.value}</li>)}
                </ul>
            </div>
        )}
      </aside>

      {/* Right Column */}
      <main className="w-2/3">
        {data.professionalSummary && (
            <section className="mb-[1.5em]">
                <h2 className="text-[1.5em] font-bold text-gray-800 border-b-2 border-blue-500 pb-[0.4em] mb-[0.75em] flex items-center gap-[0.5em]"><User className="w-[1em] h-[1em]"/> Summary</h2>
                <p className="text-[1em] text-gray-700 leading-relaxed">{data.professionalSummary}</p>
            </section>
        )}

        {data.experience && data.experience.length > 0 && (
            <section className="mb-[1.5em]">
                <h2 className="text-[1.5em] font-bold text-gray-800 border-b-2 border-blue-500 pb-[0.4em] mb-[0.75em] flex items-center gap-[0.5em]"><Briefcase className="w-[1em] h-[1em]"/> Experience</h2>
                <div className="space-y-[1em]">
                    {data.experience.map((exp, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-baseline">
                          <h3 className="font-bold text-[1.2em]">{exp.title}</h3>
                          <p className="text-[0.8em] font-medium text-gray-500">{exp.dates}</p>
                        </div>
                        <h4 className="font-semibold text-blue-600 text-[1em]">{exp.company}</h4>
                        <p className="mt-[0.4em] text-gray-600 whitespace-pre-wrap">{exp.description}</p>
                      </div>
                    ))}
                </div>
            </section>
        )}
        
        {data.projects && data.projects.length > 0 && (
             <section className="mb-[1.5em]">
                <h2 className="text-[1.5em] font-bold text-gray-800 border-b-2 border-blue-500 pb-[0.4em] mb-[0.75em] flex items-center gap-[0.5em]"><Lightbulb className="w-[1em] h-[1em]"/> Projects</h2>
                <div className="space-y-[1em]">
                    {data.projects.map((proj, index) => (
                      <div key={index}>
                        <h3 className="font-bold text-[1.2em]">{proj.name}</h3>
                        <p className="mt-[0.25em] text-gray-600">{proj.description}</p>
                      </div>
                    ))}
                </div>
            </section>
        )}

        {data.achievements && data.achievements.length > 0 && (
             <section>
                <h2 className="text-[1.5em] font-bold text-gray-800 border-b-2 border-blue-500 pb-[0.4em] mb-[0.75em] flex items-center gap-[0.5em]"><Trophy className="w-[1em] h-[1em]"/> Achievements</h2>
                <ul className="list-disc list-outside ml-[1.2em] space-y-[0.25em] text-[1em] text-gray-700">
                    {data.achievements.map((ach, index) => <li key={index}>{ach.value}</li>)}
                </ul>
            </section>
        )}

      </main>
    </div>
  );
}
