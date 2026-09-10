import type { LucideIcon } from 'lucide-react';
import {
  Accessibility as AccessibilityIcon,
  BookOpen as BookOpenIcon,
  Layers as LayersIcon,
  Palette as PaletteIcon,
  Pause as PauseIcon,
  Play as PlayIcon,
  Puzzle as PuzzleIcon,
  Sliders as SlidersIcon,
} from 'lucide-react';

/**
 * Shared icon registry. Config-driven components reference icons by name
 * string (e.g. `"card1Icon": "palette"` in theme translations); this map
 * resolves each name to a lucide-react component at render time.
 *
 * To add a new icon: import it from lucide-react, add a name → component
 * entry below (alphabetical), and reference the name from theme translations
 * or config.
 */
export const iconRegistry: Record<string, LucideIcon> = {
  accessibility: AccessibilityIcon,
  'book-open': BookOpenIcon,
  layers: LayersIcon,
  palette: PaletteIcon,
  pause: PauseIcon,
  play: PlayIcon,
  puzzle: PuzzleIcon,
  sliders: SlidersIcon,
};
