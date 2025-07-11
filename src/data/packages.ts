import type { Package } from '@/lib/types';

export const packages: Package[] = [
  {
    slug: 'frontend-master-pack',
    title: 'Frontend Master Pack',
    description: 'Everything you need to master frontend development and build stunning user interfaces.',
    icon: 'Code',
    tools: [
      'Tailwind CSS',
      'Figma',
      'Lucide Icons',
      'Google Fonts',
      'VS Code Extensions',
    ],
  },
  {
    slug: 'backend-essentials',
    title: 'Backend Essentials',
    description: 'A collection of powerful tools for backend developers using Node.js, Express, and databases.',
    icon: 'Server',
    tools: [
      'MongoDB Atlas',
      'Postman',
      'Render',
      'Railway',
      'Prisma',
    ],
  },
  {
    slug: 'ai-tools-pack',
    title: 'AI Tools Pack',
    description: 'A curated list of free-to-start AI tools and APIs to power your next-gen applications.',
    icon: 'BrainCircuit',
    tools: [
      'OpenAI API',
      'HuggingFace',
      'Replicate',
      'Gemini API',
      'LangChain',
    ],
  },
  {
    slug: 'design-resource-kit',
    title: 'Design Resource Kit',
    description: 'An essential toolkit for UI/UX designers to create beautiful and user-friendly interfaces.',
    icon: 'Palette',
    tools: [
      'Figma',
      'Iconscout',
      'Freepik',
      'unDraw',
      'Google Fonts',
    ],
  },
  {
    slug: 'student-dev-pack',
    title: 'Student Dev Pack',
    description: 'A powerful bundle of free tools and resources specifically for students in tech.',
    icon: 'GraduationCap',
    tools: [
      'GitHub Student Pack',
      'Canva for Education',
      'JetBrains IDEs',
      'Notion for Students',
    ],
  },
  {
    slug: 'productivity-pack',
    title: 'Productivity Pack',
    description: 'A set of tools designed to help you manage your time and tasks more effectively.',
    icon: 'Zap',
    tools: [
      'Notion',
      'Trello',
      'Clockify',
      'Obsidian',
      'Todoist',
    ],
  },
];
