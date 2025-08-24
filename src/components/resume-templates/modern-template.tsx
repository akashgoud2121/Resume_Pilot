'use client';

import type { ResumeData } from '@/lib/types';
import { Github, Linkedin, Mail, Phone, GraduationCap, Briefcase, Lightbulb, Trophy, Award, User } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

export function ModernTemplate({ data }: TemplateProps) {
  return (
    <div className="p-6 bg-white text-gray-800 font-sans flex gap-6 text-xs">
      {/* Left Column */}
      <aside className="w-1/3 bg-gray-100 p-4 rounded-lg">
        <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">{data.name}</h1>
            {data.experience?.[0]?.title && <p className="text-base text-blue-600 font-medium mt-1">{data.experience[0].title}</p>}
        </div>

        <div className="mt-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-600 mb-3">Contact</h2>
            <div className="space-y-2 text-[10px]">
                {data.email && <a href={`mailto:${data.email}`} className="flex items-center gap-2 hover:text-blue-600 break-all"><Mail size={14} /> {data.email}</a>}
                {data.mobileNumber && <span className="flex items-center gap-2"><Phone size={14} /> {data.mobileNumber}</span>}
                {data.linkedinLink && <a href={data.linkedinLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-blue-600"><Linkedin size={14} /> LinkedIn</a>}
                {data.githubLink && <a href={data.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-blue-600"><Github size={14} /> GitHub</a>}
            </div>
        </div>

        <div className="mt-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-600 mb-3">Skills</h2>
             {data.coreSkills && data.coreSkills.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                    {data.coreSkills.map((skill, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 text-[9px] font-medium px-2 py-1 rounded-full">{skill}</span>
                    ))}
                </div>
            )}
        </div>

        <div className="mt-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-600 mb-3">Education</h2>
            {data.education && data.education.map((edu, index) => (
              <div key={index} className="mb-3 last:mb-0">
                 <h3 className="font-semibold text-xs">{edu.institution}</h3>
                 <p className="text-gray-600 text-[10px]">{edu.degree}</p>
                 <p className="text-[9px] text-gray-500">{edu.dates}</p>
              </div>
            ))}
        </div>

        {data.certifications && data.certifications.length > 0 && (
            <div className="mt-6">
                <h2 className="text-xs font-bold uppercase tracking-widest text-gray-600 mb-3">Certifications</h2>
                <ul className="space-y-1.5 text-[10px] list-inside">
                    {data.certifications.map((cert, index) => <li key={index} className="text-gray-700">{cert.value}</li>)}
                </ul>
            </div>
        )}
      </aside>

      {/* Right Column */}
      <main className="w-2/3">
        {data.professionalSummary && (
            <section className="mb-6">
                <h2 className="text-lg font-bold text-gray-800 border-b-2 border-blue-500 pb-1.5 mb-3 flex items-center gap-2"><User size={16}/> Summary</h2>
                <p className="text-xs text-gray-700 leading-relaxed">{data.professionalSummary}</p>
            </section>
        )}

        {data.experience && data.experience.length > 0 && (
            <section className="mb-6">
                <h2 className="text-lg font-bold text-gray-800 border-b-2 border-blue-500 pb-1.5 mb-3 flex items-center gap-2"><Briefcase size={16}/> Experience</h2>
                <div className="space-y-4">
                    {data.experience.map((exp, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-baseline">
                          <h3 className="font-bold text-sm">{exp.title}</h3>
                          <p className="text-[10px] font-medium text-gray-500">{exp.dates}</p>
                        </div>
                        <h4 className="font-semibold text-blue-600 text-xs">{exp.company}</h4>
                        <p className="mt-1.5 text-gray-600 whitespace-pre-wrap">{exp.description}</p>
                      </div>
                    ))}
                </div>
            </section>
        )}
        
        {data.projects && data.projects.length > 0 && (
             <section className="mb-6">
                <h2 className="text-lg font-bold text-gray-800 border-b-2 border-blue-500 pb-1.5 mb-3 flex items-center gap-2"><Lightbulb size={16}/> Projects</h2>
                <div className="space-y-4">
                    {data.projects.map((proj, index) => (
                      <div key={index}>
                        <h3 className="font-bold text-sm">{proj.name}</h3>
                        <p className="mt-1 text-gray-600">{proj.description}</p>
                      </div>
                    ))}
                </div>
            </section>
        )}

        {data.achievements && data.achievements.length > 0 && (
             <section>
                <h2 className="text-lg font-bold text-gray-800 border-b-2 border-blue-500 pb-1.5 mb-3 flex items-center gap-2"><Trophy size={16}/> Achievements</h2>
                <ul className="list-disc list-outside ml-3.5 space-y-1 text-xs text-gray-700">
                    {data.achievements.map((ach, index) => <li key={index}>{ach.value}</li>)}
                </ul>
            </section>
        )}

      </main>
    </div>
  );
}

    