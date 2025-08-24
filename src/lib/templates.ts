export type Template = {
  id: string;
  name: string;
  category: string;
  image: string; // This can be a placeholder, as we are doing live previews now
};

export const templates: Template[] = [
  {
    id: 'default',
    name: 'Classic',
    category: 'Professional',
    image: 'https://placehold.co/400x565.png',
  },
  {
    id: 'modern',
    name: 'Modern',
    category: 'Modern & Clean',
    image: 'https://placehold.co/400x565.png',
  },
    {
    id: 'double-column',
    name: 'Double Column',
    category: 'Structured',
    image: 'https://placehold.co/400x565.png',
  },
  {
    id: 'stylish',
    name: 'Stylish',
    category: 'Elegant & Stylish',
    image: 'https://placehold.co/400x565.png',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    category: 'Simple & To-the-point',
    image: 'https://placehold.co/400x565.png',
  },
  {
    id: 'creative',
    name: 'Creative',
    category: 'Bold & Visual',
    image: 'https://placehold.co/400x565.png',
  },
  {
    id: 'timeline',
    name: 'Timeline',
    category: 'Experience-focused',
    image: 'https://placehold.co/400x565.png',
  },
  {
    id: 'contemporary',
    name: 'Contemporary',
    category: 'Fresh & Contemporary',
    image: 'https://placehold.co/400x565.png',
  },
];
