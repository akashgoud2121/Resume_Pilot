export type Template = {
  id: string;
  name: string;
  category: string;
  image: string; // This can be a placeholder, as we are doing live previews now
};

export const templates: Template[] = [
  {
    id: 'default',
    name: 'Chronological',
    category: 'Professional',
    image: 'https://placehold.co/400x565.png',
  },
  {
    id: 'modern',
    name: 'Executive',
    category: 'Modern & Clean',
    image: 'https://placehold.co/400x565.png',
  },
    {
    id: 'double-column',
    name: 'Functional',
    category: 'Structured',
    image: 'https://placehold.co/400x565.png',
  },
  {
    id: 'stylish',
    name: 'Infographic',
    category: 'Elegant & Stylish',
    image: 'https://placehold.co/400x565.png',
  },
  {
    id: 'minimal',
    name: 'Minimalist',
    category: 'Simple & To-the-point',
    image: 'https://placehold.co/400x565.png',
  },
  {
    id: 'creative',
    name: 'Portfolio',
    category: 'Bold & Visual',
    image: 'https://placehold.co/400x565.png',
  },
  {
    id: 'timeline',
    name: 'Academic',
    category: 'Experience-focused',
    image: 'https://placehold.co/400x565.png',
  },
  {
    id: 'contemporary',
    name: 'Targeted',
    category: 'Fresh & Contemporary',
    image: 'https://placehold.co/400x565.png',
  },
];
