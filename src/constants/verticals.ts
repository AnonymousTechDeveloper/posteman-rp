import {
  Brain,
  Zap,
  Code,
  Server,
  Palette,
  Gamepad2,
  Calendar,
} from "lucide-react";

export const VERTICAL_ICONS = {
  "ai-ml": Brain,
  neurotech: Zap,
  frontend: Code,
  backend: Server,
  design: Palette,
  gamedev: Gamepad2,
  events: Calendar,
} as const;

export const VERTICAL_LABELS = {
  "ai-ml": "AI/ML",
  neurotech: "NeuroTech",
  frontend: "Frontend",
  backend: "Backend",
  design: "Design",
  gamedev: "Game Dev",
  events: "Events",
} as const;

export type VerticalId = keyof typeof VERTICAL_ICONS;
