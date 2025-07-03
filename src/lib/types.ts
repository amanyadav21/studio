export type ToolCategory =
  | "Dev Utilities"
  | "Design & UI Tools"
  | "Writing & Notes"
  | "Productivity Tools"
  | "Utility Tools"
  | "Frameworks";

export interface Tool {
  id: string;
  name: string;
  description: string;
  url: string;
  category: ToolCategory;
}
