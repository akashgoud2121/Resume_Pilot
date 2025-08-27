import type { ResumeData } from './types';

export const DUMMY_RESUME_DATA: ResumeData = {
  name: 'Alexandria Quill',
  email: 'alex.quill@email.com',
  mobileNumber: '555-123-4567',
  githubLink: 'https://github.com/alexquill',
  linkedinLink: 'https://linkedin.com/in/alexquill',
  professionalSummary: 'Innovative and results-driven Software Engineer with over 5 years of experience in designing, developing, and deploying scalable and efficient web applications. Proficient in full-stack development with a strong emphasis on front-end technologies and user experience. Passionate about creating elegant, maintainable code and working in collaborative, agile environments to solve complex problems and deliver high-quality software. Proven ability in leading projects, mentoring junior developers, and driving technical excellence to achieve business goals.',
  coreSkills: [
    { id: '1', value: 'React' },
    { id: '2', value: 'Node.js' },
    { id: '3', value: 'TypeScript' },
    { id: '4', value: 'PostgreSQL' },
    { id: '5', value: 'Docker' },
    { id: '6', value: 'AWS' },
  ],
  education: [
    {
      id: '1',
      institution: 'University of Technology',
      degree: 'B.S. in Computer Science',
      dates: '2014 - 2018',
    },
  ],
  experience: [
    {
      id: '1',
      title: 'Senior Software Engineer',
      company: 'Innovatech Solutions',
      dates: '2020 - Present',
      description: 'Lead developer for the flagship SaaS product, responsible for architecture and feature implementation.',
    },
    {
      id: '2',
      title: 'Software Engineer',
      company: 'CodeCrafters Inc.',
      dates: '2018 - 2020',
      description: 'Developed and maintained full-stack features for an e-commerce platform.',
    },
  ],
  projects: [
    {
      id: '1',
      name: 'Personal Portfolio Website',
      description: 'Designed and built a personal portfolio using Next.js and Tailwind CSS.',
    },
  ],
  achievements: [
    { id: '1', value: 'Awarded "Innovator of the Year" at Innovatech Solutions, 2022' },
  ],
  certifications: [
    { id: '1', value: 'AWS Certified Developer - Associate' },
  ],
};
