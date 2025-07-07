
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

export interface Tool {
  id: string;
  name: string;
  description: string;
  url: string;
  freeUrl?: string;
  category: ToolCategory;
  subcategory?: FrameworkSubCategory | UiUxSubCategory | ProductivitySubCategory | NoCodeSubCategory;
  embeddable?: boolean;
  pricing?: Pricing;
}
