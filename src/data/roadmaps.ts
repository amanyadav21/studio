import type { Roadmap } from '@/lib/types';

const placeholderDescription = 'A step-by-step guide to master the skills required for this role, with curated tools from our collection.';
const placeholderLegend: Roadmap['legend'] = [
      {
        title: 'Recommendation',
        className: 'border-purple-500 bg-purple-500/10',
        description: 'Recommended for most developers.',
      },
      {
        title: 'Alternative',
        className: 'border-dashed border-sky-500 bg-sky-500/10',
        description: 'Alternative option to the recommendation.',
      },
      {
        title: 'Optional',
        className: 'border-dashed border-muted-foreground bg-muted/50',
        description: 'Optional, but good to know.',
      },
    ];

const placeholderSections: Roadmap['sections'] = [
    {
        nodes: [
            { title: 'Coming Soon!', description: 'This roadmap is currently under construction. Check back later for updates.' }
        ]
    }
];

export const roadmaps: Roadmap[] = [
  {
    slug: 'frontend',
    title: 'Frontend',
    description: 'Step by step guide to becoming a modern frontend developer.',
    legend: [
      {
        title: 'Recommendation',
        className: 'border-purple-500 bg-purple-500/10',
        description: 'Recommended for most developers.',
      },
      {
        title: 'Alternative',
        className: 'border-dashed border-sky-500 bg-sky-500/10',
        description: 'Alternative option to the recommendation.',
      },
      {
        title: 'Optional',
        className: 'border-dashed border-muted-foreground bg-muted/50',
        description: 'Optional, but good to know.',
      },
    ],
    sections: [
      {
        title: 'Internet Basics',
        nodes: [
          { title: 'How does the internet work?' },
          { title: 'What is HTTP?' },
          { title: 'Browsers and how they work?' },
          { title: 'DNS and how it works?' },
          { title: 'What is Domain Name?' },
          { title: 'What is hosting?' },
        ],
      },
      {
        title: 'HTML & CSS',
        nodes: [
          { title: 'HTML', description: 'Learn the basics of HTML.' },
          { title: 'CSS', description: 'Learn the basics of CSS for styling.' },
          {
            title: 'CSS Frameworks',
            isRecommended: true,
            description: 'Frameworks provide pre-built components and styles to speed up development.',
            tools: [{ id: 'tailwindcss', name: 'Tailwind CSS' }],
            children: [
                { title: 'Bootstrap', isOptional: true },
                { title: 'Bulma', isOptional: true },
            ]
          },
        ],
      },
      {
        title: 'JavaScript',
        nodes: [
          { title: 'JavaScript Basics', description: 'The core programming language of the web.' },
          { title: 'DOM Manipulation' },
          { title: 'Fetch API / Ajax (XHR)' },
          { title: 'ES6+ Features' },
        ],
      },
      {
        title: 'Pick a Framework',
        nodes: [
          {
            title: 'React',
            isRecommended: true,
            description: 'A JavaScript library for building user interfaces.',
            tools: [{ id: 'react', name: 'React' }],
          },
          {
            title: 'Vue.js',
            isOptional: true,
            description: 'The Progressive JavaScript Framework.',
            tools: [{ id: 'vuejs', name: 'Vue.js' }],
          },
          {
            title: 'Angular',
            isOptional: true,
            description: 'A platform for building mobile and desktop web applications.',
            tools: [{ id: 'angular', name: 'Angular' }],
          },
          {
            title: 'Svelte',
            isOptional: true,
            description: 'Cybernetically enhanced web apps.',
            tools: [{ id: 'svelte', name: 'Svelte' }],
          },
        ],
      },
      {
        title: 'Modern Frameworks (Meta-frameworks)',
        nodes: [
          {
            title: 'Next.js',
            isRecommended: true,
            description: 'The React Framework for Production.',
            tools: [{ id: 'nextjs', name: 'Next.js' }],
          },
          {
            title: 'Remix',
            isOptional: true,
            description: 'A full stack web framework that lets you focus on the user interface.',
            tools: [{ id: 'remix', name: 'Remix' }],
          },
          {
            title: 'Astro',
            isOptional: true,
            description: 'The web framework for content-driven websites.',
            tools: [{ id: 'astro', name: 'Astro' }],
          },
        ],
      },
      {
        title: 'State Management',
        nodes: [
          {
            title: 'Zustand',
            isRecommended: true,
            description: 'A small, fast and scalable bearbones state-management solution.',
            tools: [{ id: 'zustand', name: 'Zustand' }],
          },
          {
            title: 'Jotai',
            isOptional: true,
            description: 'Primitive and flexible state management for React.',
            tools: [{ id: 'jotai', name: 'Jotai' }],
          },
          {
            title: 'Redux',
            isOptional: true,
            description: 'A predictable state container for JavaScript apps.',
          },
        ],
      },
      {
        title: 'Build Tools',
        nodes: [
          {
            title: 'Vite',
            isRecommended: true,
            description: 'Next-generation frontend tooling. It\'s fast!',
            tools: [{ id: 'vite', name: 'Vite' }],
          },
          {
            title: 'Webpack',
            isOptional: true,
            description: 'A static module bundler for modern JavaScript applications.',
            tools: [{ id: 'webpack', name: 'Webpack' }],
          },
        ],
      },
    ],
  },
  { slug: 'backend', title: 'Backend', description: placeholderDescription, legend: placeholderLegend, sections: placeholderSections },
  { slug: 'devops', title: 'DevOps', description: placeholderDescription, legend: placeholderLegend, sections: placeholderSections },
  { slug: 'full-stack', title: 'Full Stack', description: placeholderDescription, legend: placeholderLegend, sections: placeholderSections },
  { slug: 'ai-engineer', title: 'AI Engineer', description: placeholderDescription, legend: placeholderLegend, sections: placeholderSections },
  { slug: 'data-analyst', title: 'Data Analyst', isNew: true, description: placeholderDescription, legend: placeholderLegend, sections: placeholderSections },
  { slug: 'ai-and-data-scientist', title: 'AI and Data Scientist', description: placeholderDescription, legend: placeholderLegend, sections: placeholderSections },
  { slug: 'android', title: 'Android', description: placeholderDescription, legend: placeholderLegend, sections: placeholderSections },
  { slug: 'ios', title: 'iOS', description: placeholderDescription, legend: placeholderLegend, sections: placeholderSections },
  { slug: 'postgresql', title: 'PostgreSQL', description: placeholderDescription, legend: placeholderLegend, sections: placeholderSections },
  { slug: 'blockchain', title: 'Blockchain', description: placeholderDescription, legend: placeholderLegend, sections: placeholderSections },
  { slug: 'qa', title: 'QA', description: placeholderDescription, legend: placeholderLegend, sections: placeholderSections },
  { slug: 'software-architect', title: 'Software Architect', description: placeholderDescription, legend: placeholderLegend, sections: placeholderSections },
  { slug: 'cyber-security', title: 'Cyber Security', description: placeholderDescription, legend: placeholderLegend, sections: placeholderSections },
  { slug: 'ux-design', title: 'UX Design', description: placeholderDescription, legend: placeholderLegend, sections: placeholderSections },
  { slug: 'game-developer', title: 'Game Developer', description: placeholderDescription, legend: placeholderLegend, sections: placeholderSections },
  { slug: 'technical-writer', title: 'Technical Writer', description: placeholderDescription, legend: placeholderLegend, sections: placeholderSections },
  { slug: 'mlops', title: 'MLOps', description: placeholderDescription, legend: placeholderLegend, sections: placeholderSections },
  { slug: 'product-manager', title: 'Product Manager', description: placeholderDescription, legend: placeholderLegend, sections: placeholderSections },
  { slug: 'engineering-manager', title: 'Engineering Manager', description: placeholderDescription, legend: placeholderLegend, sections: placeholderSections },
  { slug: 'developer-relations', title: 'Developer Relations', description: placeholderDescription, legend: placeholderLegend, sections: placeholderSections },
];
