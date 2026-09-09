/**
 * Shared icon registry. Config-driven components reference icons by name
 * string (e.g. `"card1Icon": "palette"` in theme translations); this map
 * resolves each name to a lucide-react component at render time.
 *
 * To add a new icon: import it from lucide-react, add a name → component
 * entry below (alphabetical), and reference the name from theme translations
 * or config.
 */

import type { LucideIcon } from 'lucide-react';
import {
  Accessibility as AccessibilityIcon,
  BookOpen as BookOpenIcon,
  Layers as LayersIcon,
  Palette as PaletteIcon,
  Puzzle as PuzzleIcon,
  Sliders as SlidersIcon,
} from 'lucide-react';

export const iconRegistry: Record<string, LucideIcon> = {
  accessibility: AccessibilityIcon,
  'book-open': BookOpenIcon,
  layers: LayersIcon,
  palette: PaletteIcon,
  puzzle: PuzzleIcon,
  sliders: SlidersIcon,
};
