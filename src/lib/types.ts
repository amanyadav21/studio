export type ToolCategory =
  | "Dev Utilities"
  | "Design & UI Tools"
  | "Writing & Notes"
  | "Productivity Tools"
  | "Utility Tools"
  | "My Tools";

export interface Tool {
  id: string;
  name: string;
  description: string;
  url: string;
  category: ToolCategory;
}
