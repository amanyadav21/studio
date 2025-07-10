
import type { Roadmap } from '@/lib/types';

const placeholderDescription = 'A step-by-step guide to master the skills required for this role, with curated tools from our collection.';
const placeholderLegend: Roadmap['legend'] = [
      {
        title: 'Recommended',
        className: 'recommended',
        description: 'Our top pick for most developers.',
      },
      {
        title: 'Alternative',
        className: 'alternative',
        description: 'A solid alternative choice.',
      },
      {
        title: 'Optional',
        className: 'optional',
        description: 'Good to know, but not required.',
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
    description: 'Step by step guide to becoming a modern frontend developer in 2024. This is a curated list of tools and technologies to learn.',
    legend: [
      {
        title: 'Recommended',
        className: 'recommended',
        description: 'Our top pick for most developers.',
      },
      {
        title: 'Alternative',
        className: 'alternative',
        description: 'A solid alternative choice.',
      },
      {
        title: 'Optional',
        className: 'optional',
        description: 'Good to know, but not required.',
      },
    ],
    sections: [
      {
        nodes: [
          { 
            title: 'Internet',
            type: 'hub',
            children: [
              { title: 'How does the internet work?', recommendation: 'recommended' },
              { title: 'What is HTTP?', recommendation: 'recommended' },
              { title: 'Browsers and how they work?', recommendation: 'recommended' },
              { title: 'DNS and how it works?', recommendation: 'recommended' },
              { title: 'What is Domain Name?', recommendation: 'recommended' },
              { title: 'What is hosting?', recommendation: 'recommended' },
            ]
          },
          {
            title: 'HTML',
            type: 'hub',
            children: [
              { title: 'Learn the basics', recommendation: 'recommended' },
              { title: 'Writing Semantic HTML', recommendation: 'recommended' },
              { title: 'Forms and Validations', recommendation: 'recommended' },
              { title: 'Accessibility', recommendation: 'recommended' },
              { title: 'SEO Basics', recommendation: 'optional' },
            ]
          },
          {
            title: 'CSS',
            type: 'hub',
            children: [
              { title: 'Learn the basics', recommendation: 'recommended' },
              { title: 'Responsive Design', recommendation: 'recommended' },
              { 
                title: 'Tailwind CSS',
                recommendation: 'recommended',
                description: 'A utility-first CSS framework for rapid UI development.',
                tools: [{ id: 'tailwindcss', name: 'Tailwind CSS' }]
              },
               { 
                title: 'Bootstrap',
                recommendation: 'alternative',
                description: 'The world’s most popular front-end open source toolkit.',
                tools: []
              },
            ]
          },
           {
            title: 'JavaScript',
            type: 'hub',
            children: [
              { title: 'Learn the basics', recommendation: 'recommended' },
              { title: 'DOM Manipulation', recommendation: 'recommended' },
              { title: 'Fetch API / AJAX', recommendation: 'recommended' },
              { title: 'ES6+ Features', recommendation: 'recommended' },
            ]
          },
          {
            title: 'Version Control',
            type: 'hub',
            children: [
              { title: 'Git', recommendation: 'recommended' },
              { title: 'GitHub', recommendation: 'recommended', tools: [{id: 'github', name: 'GitHub'}]},
              { title: 'GitLab', recommendation: 'alternative', tools: [{id: 'gitlab', name: 'GitLab'}]},
              { title: 'Bitbucket', recommendation: 'alternative', tools: [{id: 'bitbucket', name: 'Bitbucket'}]},
            ]
          },
          {
            title: 'Pick a Framework',
            type: 'hub',
            children: [
              {
                title: 'React',
                recommendation: 'recommended',
                tools: [{ id: 'react', name: 'React' }],
              },
              {
                title: 'Vue.js',
                recommendation: 'alternative',
                tools: [{ id: 'vuejs', name: 'Vue.js' }],
              },
              {
                title: 'Angular',
                recommendation: 'alternative',
                tools: [{ id: 'angular', name: 'Angular' }],
              },
              {
                title: 'Svelte',
                recommendation: 'alternative',
                tools: [{ id: 'svelte', name: 'Svelte' }],
              },
            ],
          },
           {
            title: 'Meta Frameworks',
            type: 'hub',
            children: [
              {
                title: 'Next.js',
                description: 'The React Framework for Production.',
                recommendation: 'recommended',
                tools: [{ id: 'nextjs', name: 'Next.js' }],
              },
              {
                title: 'Remix',
                description: 'A full stack web framework by Shopify.',
                recommendation: 'alternative',
                tools: [{ id: 'remix', name: 'Remix' }],
              },
               {
                title: 'Astro',
                description: 'The web framework for content-driven websites.',
                recommendation: 'alternative',
                tools: [{ id: 'astro', name: 'Astro' }],
              },
            ],
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
  { 
    slug: 'ux-design', 
    title: 'UX Design', 
    description: "A comprehensive guide to becoming a skilled UX Designer, covering key concepts from user psychology to prototyping.", 
    legend: placeholderLegend, 
    sections: [
        {
          title: "Foundations",
          nodes: [
            {
              title: "Human Decision Making",
              type: "hub",
              children: [
                { title: "BJ Fogg's Behavior Model" },
                { title: "CREATE Action Funnel" },
                { title: "Spectrum of Thinking Interventions" },
                { title: "Dual Process Theory" },
              ]
            },
            {
              title: "Behavior Change Strategies",
              type: "hub",
              children: [
                { title: "BJ Fogg's Behavior Grid" },
                { title: "Classifying Behavior" },
              ]
            }
          ]
        },
        {
          title: "Core UX Concepts",
          nodes: [
            {
              title: "Cheating",
              description: "Leveraging cognitive biases.",
              children: [
                { title: "Defaulting" },
                { title: "Making it Incidental" },
                { title: "Automate the Act of Repetition" },
              ]
            },
            {
              title: "Make or Change Habits",
              description: "Influencing user routines."
            },
            {
              title: "Support Conscious Action",
              description: "Assisting deliberate user choices."
            },
            {
              title: "Educate & Encourage User",
              type: "hub",
              children: [
                { title: "Help User think about their Action" },
              ]
            }
          ]
        },
        {
          title: "User & Product Definition",
          nodes: [
            {
              title: "Understanding the Product",
              children: [
                 {
                    title: "Define Target Users",
                    children: [ { title: "Create User Personas" } ]
                 },
                 {
                    title: "Clarify Product",
                    children: [
                      { title: "Target Outcome" },
                      { title: "Target Actor" },
                      { title: "Target Action" },
                    ]
                 },
                 {
                   title: "Business Model",
                   type: "hub",
                   children: [
                     { title: "Existing Business Model" },
                     { title: "Business Model Canvas" },
                     { title: "Lean Canvas" },
                     { title: "New Business Model" },
                     { title: "Business Model Inspirator" },
                     { title: "Competitor Analysis" },
                     { title: "Five Forces Model" },
                     { title: "SWOT Analysis" },
                   ]
                 }
              ]
            }
          ]
        },
        {
          title: "Design & Prototyping",
          nodes: [
            {
              title: "Conceptual Design",
              children: [
                {
                  title: "Create Product Backlog",
                  children: [{ title: "User Stories" }]
                },
              ]
            },
            {
              title: "Wireframing",
              type: "hub",
              children: [
                { title: "Figma", tools: [{ id: 'figma', name: 'Figma' }] },
                { title: "Adobe XD", tools: [{ id: 'adobe-xd', name: 'Adobe XD' }] },
                { title: "Sketch", tools: [{ id: 'sketch', name: 'Sketch' }] },
                { title: "Balsamiq" },
              ]
            },
            {
              title: "Prototyping",
              children: [
                {
                  title: "UX Patterns",
                  type: "hub",
                  children: [
                    { title: "Call to Action" },
                    { title: "How-to-Tips" },
                    { title: "Status Reports" },
                    { title: "Reminders & Planning Prompts" },
                  ]
                }
              ]
            }
          ]
        }
    ]
  },
  { slug: 'game-developer', title: 'Game Developer', description: placeholderDescription, legend: placeholderLegend, sections: placeholderSections },
  { slug: 'technical-writer', title: 'Technical Writer', description: placeholderDescription, legend: placeholderLegend, sections: placeholderSections },
  { slug: 'mlops', title: 'MLOps', description: placeholderDescription, legend: placeholderLegend, sections: placeholderSections },
  { slug: 'product-manager', title: 'Product Manager', description: placeholderDescription, legend: placeholderLegend, sections: placeholderSections },
  { slug: 'engineering-manager', title: 'Engineering Manager', description: placeholderDescription, legend: placeholderLegend, sections: placeholderSections },
  { slug: 'developer-relations', title: 'Developer Relations', description: placeholderDescription, legend: placeholderLegend, sections: placeholderSections },
];
