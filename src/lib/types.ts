export type Category =
  | "Dev Utilities"
  | "Design & UI Tools"
  | "Writing & Notes"
  | "Productivity Tools"
  | "Utility Tools"
  | "All"
  | "Favorites";

export interface Tool {
  id: string;
  name: string;
  description: string;
  url: string;
  category: Category;
}
