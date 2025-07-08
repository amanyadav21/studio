
export type Pricing = "Free" | "Paid" | "Freemium";

export type ToolCategory =
  | "UI & UX"
  | "Writing & Notes"
  | "Productivity Tools"
  | "No-Code / Low-Code"
  | "Frameworks & Libraries"
  | "AI & ML"
  | "Cloud Provider"
  | "APIs";

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

export interface Tool {
  id: string;
  name: string;
  description: string;
  url: string;
  freeUrl?: string;
  category: ToolCategory;
  subcategory?:
    | FrameworkSubCategory
    | UiUxSubCategory
    | ProductivitySubCategory
    | NoCodeSubCategory
    | ApiSubCategory
    | AiMlSubCategory;
  pricing?: Pricing;
}
