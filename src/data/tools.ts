import type { Tool, Category } from "@/lib/types";

export const categories: Category[] = ["Dev Utilities", "Formatters", "Calculators", "Mind Tools"];

export const tools: Tool[] = [
  {
    id: "json-formatter",
    name: "JSON Formatter",
    description: "A simple and beautiful JSON formatter and validator.",
    url: "https://jsonformatter.org/",
    category: "Dev Utilities",
  },
  {
    id: "base64-encoder",
    name: "Base64 Encode/Decode",
    description: "Quickly encode to and from Base64 online.",
    url: "https://www.base64decode.org/",
    category: "Dev Utilities",
  },
  {
    id: "url-encoder",
    name: "URL Encoder/Decoder",
    description: "Encode or decode strings for use in URLs.",
    url: "https://meyerweb.com/eric/tools/dencoder/",
    category: "Dev Utilities",
  },
  {
    id: "diff-checker",
    name: "Diff Checker",
    description: "Compare two text files to find the differences.",
    url: "https://www.diffchecker.com/",
    category: "Formatters",
  },
  {
    id: "tldraw",
    name: "tldraw",
    description: "A collaborative digital whiteboard for sketching and diagramming.",
    url: "https://www.tldraw.com/",
    category: "Mind Tools",
  },
  {
    id: "excalidraw",
    name: "Excalidraw",
    description: "Virtual whiteboard for sketching hand-drawn like diagrams.",
    url: "https://excalidraw.com/",
    category: "Mind Tools",
  },
  {
    id: "online-calculator",
    name: "Online Calculator",
    description: "A free basic calculator with a large display.",
    url: "https://www.online-calculator.com/",
    category: "Calculators",
  },
  {
    id: "regex101",
    name: "Regex101",
    description: "Build, test, and debug regular expressions.",
    url: "https://regex101.com/",
    category: "Dev Utilities",
  },
  {
    id: "color-picker",
    name: "Online Color Picker",
    description: "An online tool to pick colors from your screen.",
    url: "https://imagecolorpicker.com/",
    category: "Dev Utilities"
  },
  {
    id: "markdown-editor",
    name: "Markdown Editor",
    description: "A full-featured, online Markdown editor.",
    url: "https://stackedit.io/app",
    category: "Formatters"
  },
  {
    id: "desmos-calculator",
    name: "Desmos Graphing Calc",
    description: "An advanced graphing calculator implemented as a web application.",
    url: "https://www.desmos.com/calculator",
    category: "Calculators"
  },
   {
    id: "miro",
    name: "Miro Lite",
    description: "A simple online whiteboard for quick ideas and collaboration.",
    url: "https://miro.com/lite/",
    category: "Mind Tools"
  }
];
