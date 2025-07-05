
export type Pricing = "Free" | "Paid" | "Freemium";

export type ToolCategory =
  | "UI & UX"
  | "Writing & Notes"
  | "Productivity Tools"
  | "Frameworks & Libraries"
  | "AI & ML"
  | "Cloud Provider"
  | "APIs"
  | "Fonts";

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
  pricing?: Pricing;
}
