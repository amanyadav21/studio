
export type Pricing = "Free" | "Paid" | "Freemium";

export type ToolCategory =
  | "UI & UX"
  | "Writing & Notes"
  | "Productivity Tools"
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
  | "Build Tools";

export type UiUxSubCategory =
  | "UI Design Tools"
  | "UI Kits & Templates"
  | "Assets"
  | "Prototyping & Testing"
  | "Inspiration";

export interface Tool {
  id: string;
  name: string;
  description: string;
  url: string;
  category: ToolCategory;
  subcategory?: FrameworkSubCategory | UiUxSubCategory;
  embeddable?: boolean;
  pricing?: Pricing;
}
