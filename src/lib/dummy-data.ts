
import type { ResumeData } from './types';

export const DUMMY_RESUME_DATA: ResumeData = {
  name: 'Alexandria Quill',
  email: 'alex.quill@email.com',
  mobileNumber: '555-123-4567',
  githubLink: 'https://github.com/alexquill',
  linkedinLink: 'https://linkedin.com/in/alexquill',
  professionalSummary: 'Innovative and results-driven Software Engineer with over 5 years of experience in designing, developing, and deploying scalable and efficient web applications. Proficient in full-stack development with a strong emphasis on front-end technologies and user experience. Passionate about creating elegant, maintainable code and working in collaborative, agile environments to solve complex problems and deliver high-quality software. Proven ability in leading projects, mentoring junior developers, and driving technical excellence to achieve business goals.',
  coreSkills: [{id: '1', value: 'React'}, {id: '2', value: 'Node.js'}, {id: '3', value: 'TypeScript'}, {id: '4', value: 'PostgreSQL'}, {id: '5', value: 'Docker'}, {id: '6', value: 'AWS'}, {id: '7', value: 'TDD'}, {id: '8', value: 'CI/CD'}, {id: '9', value: 'GraphQL'}, {id: '10', value: 'Kubernetes'}, {id: '11', value: 'Next.js'}, {id: '12', value: 'System Design'}, {id: '13', value: 'Microservices'}, {id: '14', value: 'Agile Methodologies'}],
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
      description: 'Lead developer for the flagship SaaS product, responsible for the architecture, implementation, and maintenance of new features.\n- Architected and implemented a new microservices-based backend using Node.js and Docker, resulting in a 40% performance increase and improved scalability to handle a 200% growth in user traffic.\n- Mentored a team of 4 junior developers, fostering a culture of growth and best practices through code reviews, pair programming, and weekly knowledge-sharing sessions.\n- Championed the adoption of Test-Driven Development (TDD) with Jest and React Testing Library, which increased code coverage by 30% and reduced critical bugs in production by 50%.',
    },
    {
      id: '2',
      title: 'Software Engineer',
      company: 'CodeCrafters Inc.',
      dates: '2018 - 2020',
      description: 'Developed and maintained full-stack features for a high-traffic e-commerce platform using React and Node.js.\n- Collaborated with UX/UI designers to create a seamless and responsive user experience, boosting user engagement by 15% and decreasing bounce rate.\n- Implemented a new payment gateway integration (Stripe), which expanded customer payment options and increased conversion rates by 5%.\n- Optimized application performance by identifying and fixing memory leaks, which reduced server response times by 20%.',
    },
  ],
  projects: [
    {
      id: '1',
      name: 'Open Source Contributor - React-Query',
      description: 'Active contributor to a popular open-source data-fetching library. Focused on improving accessibility by implementing ARIA standards and enhancing documentation for new users.',
    },
    {
      id: '2',
      name: 'Personal Portfolio Website',
      description: 'Designed and built a personal portfolio using Next.js and Tailwind CSS, showcasing various projects and skills. Deployed on Vercel with a CI/CD pipeline.',
    },
     {
      id: '3',
      name: 'Real-time Chat Application',
      description: 'Developed a real-time chat application using WebSockets, Node.js, and React, allowing users to communicate instantly in public or private chat rooms.',
    },
  ],
  achievements: [
    { id: '1', value: 'Awarded "Innovator of the Year" at Innovatech Solutions, 2022' },
    { id: '2', value: 'Speaker at "React Forward" Conference 2021 on Modern Frontend Architectures' },
    { id: '3', value: 'Published an article on "Scalable State Management with Redux" in a well-known tech blog.' },
  ],
  certifications: [
    { id: '1', value: 'AWS Certified Developer - Associate' },
    { id: '2', value: 'Certified Kubernetes Application Developer (CKAD)' },
    { id: '3', value: 'Professional Scrum Master I (PSM I)'},
  ],
};


export const DETAILED_DUMMY_RESUME_DATA: ResumeData = {
  name: 'Dr. Evelyn Reed',
  email: 'evelyn.reed.phd@university.edu',
  mobileNumber: '555-987-6543',
  githubLink: 'https://github.com/evelynreed',
  linkedinLink: 'https://linkedin.com/in/evelynreedphd',
  professionalSummary:
    'Accomplished and meticulous Research Scientist with over 15 years of experience in computational biology and bioinformatics. Expertise in developing novel algorithms for genomic data analysis, leading multi-disciplinary research teams, and securing significant grant funding. Proven track record of publishing in high-impact, peer-reviewed journals. Seeking to leverage deep scientific knowledge and computational skills to solve complex biological problems in a challenging academic or industrial research environment.',
  coreSkills: [
    { id: 's1', value: 'Bioinformatics' },
    { id: 's2', value: 'Genomic Data Analysis' },
    { id: 's3', value: 'Python (NumPy, Pandas, SciPy)' },
    { id: 's4', value: 'R (Bioconductor)' },
    { id: 's5', value: 'Machine Learning (Scikit-learn, TensorFlow)' },
    { id: 's6', value: 'Statistical Analysis' },
    { id: 's7', value: 'Algorithm Development' },
    { id: 's8', value: 'High-Performance Computing (HPC)' },
    { id: 's9', value: 'Next-Generation Sequencing (NGS)' },
    { id: 's10', value: 'Scientific Writing & Grant Proposals' },
    { id: 's11', value: 'Project Management' },
    { id: 's12', value: 'Team Leadership' },
  ],
  education: [
    {
      id: 'e1',
      institution: 'Stanford University',
      degree: 'Ph.D. in Computational Biology',
      dates: '2008 - 2013',
    },
    {
      id: 'e2',
      institution: 'MIT',
      degree: 'B.S. in Computer Science & Molecular Biology',
      dates: '2004 - 2008',
    },
  ],
  experience: [
    {
      id: 'ex1',
      title: 'Senior Research Scientist',
      company: 'Institute for Genomic Research',
      dates: '2016 - Present',
      description:
        'Lead a team of 5 researchers focused on cancer genomics. Developed a novel machine learning model to predict patient response to immunotherapy, published in Nature Medicine.\n- Secured a $2.5M R01 grant from the NIH as Principal Investigator.\n- Designed and managed the data analysis pipeline for a large-scale pan-cancer study involving over 10,000 tumor samples.\n- Mentored 3 postdoctoral fellows, two of whom secured tenure-track faculty positions.',
    },
    {
      id: 'ex2',
      title: 'Postdoctoral Research Fellow',
      company: 'Broad Institute of MIT and Harvard',
      dates: '2013 - 2016',
      description:
        'Conducted research under the supervision of Dr. Eric Lander. Developed new algorithms for single-cell RNA-seq data analysis.\n- First-author publication in Cell, detailing a method to deconvolve cell-type heterogeneity from bulk tissue samples.\n- Collaborated with experimental biologists to design and analyze CRISPR screening experiments.',
    },
     {
      id: 'ex3',
      title: 'Research Assistant',
      company: 'MIT CSAIL',
      dates: '2007 - 2008',
      description:
        'Worked on a project involving protein structure prediction using computational models. Implemented and benchmarked various folding algorithms on a high-performance computing cluster.',
    },
  ],
  projects: [
    {
      id: 'p1',
      name: 'GenomeVis',
      description: 'An open-source interactive web application for visualizing complex genomic datasets, built with D3.js and React. Used by over 500 research labs worldwide.',
    },
    {
      id: 'p2',
      name: 'DeepVariant-CNN',
      description:
        'A deep learning model for somatic variant calling in cancer genomes. Achieved state-of-the-art performance, outperforming GATK by 5% in precision and recall.',
    },
  ],
  achievements: [
    { id: 'a1', value: 'NIH Director\'s New Innovator Award, 2018' },
    { id: 'a2', value: 'Keynote Speaker, ISMB Conference, 2021' },
    { id: 'a3', value: 'Published 25+ papers in peer-reviewed journals (h-index: 18)' },
  ],
  certifications: [
    { id: 'c1', value: 'Data Science Specialization - Johns Hopkins University (Coursera)' },
    { id: 'c2', value: 'Deep Learning Specialization - deeplearning.ai (Coursera)' },
  ],
};
