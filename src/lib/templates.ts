export type Template = {
  id: string;
  name: string;
  category: string;
  image: string;
};

export const templates: Template[] = [
  {
    id: 'default',
    name: 'Chronological',
    category: 'Professional',
    image: 'https://picsum.photos/seed/1/400/565',
  },
  {
    id: 'modern',
    name: 'Executive',
    category: 'Modern & Clean',
    image: 'https://picsum.photos/seed/2/400/565',
  },
  {
    id: 'double-column',
    name: 'Functional',
    category: 'Structured',
    image: 'https://picsum.photos/seed/3/400/565',
  },
  {
    id: 'stylish',
    name: 'Infographic',
    category: 'Elegant & Stylish',
    image: 'https://picsum.photos/seed/4/400/565',
  },
  {
    id: 'minimal',
    name: 'Minimalist',
    category: 'Simple & To-the-point',
    image: 'https://picsum.photos/seed/5/400/565',
  },
  {
    id: 'creative',
    name: 'Portfolio',
    category: 'Bold & Visual',
    image: 'https://picsum.photos/seed/6/400/565',
  },
  {
    id: 'timeline',
    name: 'Academic',
    category: 'Experience-focused',
    image: 'https://picsum.photos/seed/7/400/565',
  },
  {
    id: 'contemporary',
    name: 'Targeted',
    category: 'Fresh & Contemporary',
    image: 'https://picsum.photos/seed/8/400/565',
  },
];
