
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
  | "Frontend / Website Builders"
  | "Mobile App Builders"
  | "Backend / Database"
  | "Automation / Workflow Builders"
  | "Design & UI Tools"
  | "AI-Powered No-Code Tools"
  | "Form, Survey & CRM Tools"
  | "Auth & Login"
  | "Analytics"
  | "Multi-Purpose No-Code Platforms";

export interface Tool {
  id: string;
  name: string;
  description: string;
  url: string;
  category: ToolCategory;
  subcategory?: FrameworkSubCategory | UiUxSubCategory | ProductivitySubCategory | NoCodeSubCategory;
  embeddable?: boolean;
  pricing?: Pricing;
}
