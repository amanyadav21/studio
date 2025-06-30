export type Category = "Dev Utilities" | "Formatters" | "Calculators" | "Mind Tools" | "All" | "Favorites";

export interface Tool {
  id: string;
  name: string;
  description: string;
  url: string;
  category: Category;
}
