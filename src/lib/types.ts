
export type Pricing = "Free" | "Paid" | "Freemium";

export type ToolCategory =
  | "UI & UX"
  | "Writing & Notes"
  | "Productivity Tools"
  | "No-Code / Low-Code"
  | "Frameworks & Libraries"
  | "Source Code Repos"
  | "Code Quality"
  | "AI & ML"
  | "Major Cloud Providers"
  | "Cloud Provider"
  | "APIs"
  | "Email"
  | "Educational Plan"
  | "Education and Career Development"
  | "Log Management"
  | "Translation Management";

export type FrameworkSubCategory =
  | "Frontend"
  | "Backend"
  | "Fullstack"
  | "Mobile"
  | "Desktop"
  | "Testing"
  | "Build Tools"
  | "AI / ML"
  | "CLI / Dev Tools";

export type UiUxSubCategory =
  | "UI Design Tools"
  | "UI Kits & Templates"
  | "Assets"
  | "Prototyping & Testing"
  | "Inspiration";

export type ProductivitySubCategory =
  | "Task Management"
  | "Time & Focus"
  | "Mind & Notes"
  | "Utilities"
  | "Dev Task Tools";

export type NoCodeSubCategory =
  | "Website Builders"
  | "App Builders"
  | "Backend & DB"
  | "Automation"
  | "Design Tools"
  | "AI"
  | "Forms"
  | "Authentication"
  | "Analytics"
  | "Platforms";

export type ApiSubCategory =
  | "Development & Testing"
  | "Data & Information"
  | "Scraping & Automation"
  | "PDF & Image Generation";

export type AiMlSubCategory =
  | "Platforms & MLOps"
  | "Models & APIs"
  | "Data Science & Notebooks";

export type EducationalPlanSubCategory =
  | "Coding & Development"
  | "Developer Tools & APIs"
  | "Cloud & Hosting"
  | "Learning Platforms"
  | "Design & Creativity"
  | "Student Discounts"
  | "Bonus Tools";

export interface Tool {
  id: string;
  name: string;
  description: string;
  details?: string[];
  url: string;
  freeUrl?: string;
  category: ToolCategory;
  subcategory?:
    | FrameworkSubCategory
    | UiUxSubCategory
    | ProductivitySubCategory
    | NoCodeSubCategory
    | ApiSubCategory
    | AiMlSubCategory
    | EducationalPlanSubCategory;
  pricing?: Pricing;
}

export interface RoadmapTool {
  id: string;
  name: string;
  url?: string;
}

export interface RoadmapNode {
  title: string;
  type?: 'hub' | 'default';
  recommendation?: 'recommended' | 'alternative' | 'optional';
  description?: string;
  tools?: RoadmapTool[];
  children?: RoadmapNode[];
}

export interface RoadmapSection {
  title?: string;
  nodes: RoadmapNode[];
}

export interface Roadmap {
  slug: string;
  title: string;
  description: string;
  isNew?: boolean;
  legend: {
    title: string;
    className: string;
    description: string;
  }[];
  sections: RoadmapSection[];
}
