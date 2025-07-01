
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getContrastingTextColor(hexColor: string): string {
  if (!hexColor) return '#000000';

  let cleanHex = hexColor.startsWith('#') ? hexColor.slice(1) : hexColor;

  // Handle 3-digit hex
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map(char => char + char).join('');
  }

  if (cleanHex.length !== 6) {
    // Not a valid hex code, return default
    return '#000000';
  }

  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);

  // Check if parsing was successful
  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    return '#000000';
  }

  // Formula for luminance (WCAG)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.5 ? '#0f172a' : '#ffffff'; // Use a dark slate for better contrast than pure black
}
