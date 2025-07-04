
export type ToolCategory =
  | "Dev Utilities"
  | "Design & UI Tools"
  | "Writing & Notes"
  | "Productivity Tools"
  | "Utility Tools"
  | "Frameworks & Libraries"
  | "AI & ML";

export type FrameworkSubCategory =
  | "Frontend"
  | "Backend"
  | "Fullstack"
  | "Mobile"
  | "Desktop"
  | "Testing"
  | "Build Tools";

export interface Tool {
  id: string;
  name: string;
  description: string;
  url: string;
  category: ToolCategory;
  subcategory?: FrameworkSubCategory;
  embeddable?: boolean;
}
