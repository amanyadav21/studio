
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
  | "APIs"
  | "Web Hosting"
  | "Storage and Media Processing"
  | "Data Visualization on Maps"
  | "Email"
  | "Educational Plan"
  | "Log Management"
  | "Translation Management"
  | "CDN and Protection";

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

export type CdnSubCategory = "CDN" | "Security";

export type StorageSubCategory = 
  | "File Storage & Backup"
  | "Image & Video Processing"
  | "Data & JSON Storage"
  | "Package Repositories"
  | "File Conversion"
  | "Utilities";

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
    | EducationalPlanSubCategory
    | CdnSubCategory
    | StorageSubCategory;
  pricing?: Pricing;
  isRecommended?: boolean;
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
  title:string;
  description: string;
  isNew?: boolean;
  legend: {
    title: string;
    className: string;
    description: string;
  }[];
  sections: RoadmapSection[];
}
