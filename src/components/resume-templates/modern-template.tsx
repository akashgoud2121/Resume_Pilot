'use client';

import type { ResumeData } from '@/lib/types';
import { Github, Linkedin, Mail, Phone, ExternalLink, GraduationCap, Briefcase, Lightbulb, Trophy, Award, User, Sparkles } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

export function ModernTemplate({ data }: TemplateProps) {
  return (
    <div className="p-8 bg-white text-gray-800 font-sans flex gap-8">
      {/* Left Column */}
      <aside className="w-1/3 bg-gray-100 p-6 rounded-lg">
        <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
            <p className="text-lg text-blue-600 font-medium mt-1">AI/ML & Python Software Engineer</p>
        </div>

        <div className="mt-8">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-600 mb-4">Contact</h2>
            <div className="space-y-3 text-sm">
                {data.email && <a href={`mailto:${data.email}`} className="flex items-center gap-3 hover:text-blue-600"><Mail size={16} /> {data.email}</a>}
                {data.mobileNumber && <span className="flex items-center gap-3"><Phone size={16} /> {data.mobileNumber}</span>}
                {data.linkedinLink && <a href={data.linkedinLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-blue-600"><Linkedin size={16} /> /in/akashgoud</a>}
                {data.githubLink && <a href={data.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-blue-600"><Github size={16} /> /akashgoud2121</a>}
            </div>
        </div>

        <div className="mt-8">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-600 mb-4">Skills</h2>
             {data.coreSkills && data.coreSkills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {data.coreSkills.map((skill, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">{skill}</span>
                    ))}
                </div>
            )}
        </div>

        <div className="mt-8">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-600 mb-4">Education</h2>
            {data.education && data.education.map((edu, index) => (
              <div key={index} className="mb-4 last:mb-0 text-sm">
                 <h3 className="font-semibold">{edu.institution}</h3>
                 <p className="text-gray-600">{edu.degree}</p>
                 <p className="text-xs text-gray-500">{edu.dates}</p>
              </div>
            ))}
        </div>

        {data.certifications && data.certifications.length > 0 && (
            <div className="mt-8">
                <h2 className="text-sm font-bold uppercase tracking-widest text-gray-600 mb-4">Certifications</h2>
                <ul className="space-y-2 text-sm list-inside">
                    {data.certifications.map((cert, index) => <li key={index} className="text-gray-700">{cert.value}</li>)}
                </ul>
            </div>
        )}
      </aside>

      {/* Right Column */}
      <main className="w-2/3">
        {data.professionalSummary && (
            <section className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4 flex items-center gap-3"><User/> Summary</h2>
                <p className="text-sm text-gray-700 leading-relaxed">{data.professionalSummary}</p>
            </section>
        )}

        {data.experience && data.experience.length > 0 && (
            <section className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4 flex items-center gap-3"><Briefcase /> Experience</h2>
                <div className="space-y-6">
                    {data.experience.map((exp, index) => (
                      <div key={index} className="text-sm">
                        <div className="flex justify-between items-baseline">
                          <h3 className="font-bold text-base">{exp.title}</h3>
                          <p className="text-xs font-medium text-gray-500">{exp.dates}</p>
                        </div>
                        <h4 className="font-semibold text-blue-600">{exp.company}</h4>
                        <p className="mt-2 text-gray-600 whitespace-pre-wrap">{exp.description}</p>
                      </div>
                    ))}
                </div>
            </section>
        )}
        
        {data.projects && data.projects.length > 0 && (
             <section className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4 flex items-center gap-3"><Lightbulb /> Projects</h2>
                <div className="space-y-6">
                    {data.projects.map((proj, index) => (
                      <div key={index} className="text-sm">
                        <h3 className="font-bold text-base">{proj.name}</h3>
                        <p className="mt-1 text-gray-600">{proj.description}</p>
                      </div>
                    ))}
                </div>
            </section>
        )}

        {data.achievements && data.achievements.length > 0 && (
             <section>
                <h2 className="text-xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4 flex items-center gap-3"><Trophy/> Achievements</h2>
                <ul className="list-disc list-outside ml-4 space-y-1 text-sm text-gray-700">
                    {data.achievements.map((ach, index) => <li key={index}>{ach.value}</li>)}
                </ul>
            </section>
        )}

      </main>
    </div>
  );
}
