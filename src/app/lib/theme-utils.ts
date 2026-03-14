export type ThemeOption = {
  id:
    | "pink-magenta"
    | "purple-violet"
    | "blue-cyan"
    | "emerald-green"
    | "orange-amber"
    | "rose-red"
    | "teal-aqua"
    | "indigo-blue";
  name: string;
  description: string;
  primary: string;
  secondary: string;
  gradient: string;
  default?: boolean;
};

export const themeOptions: ThemeOption[] = [
  {
    id: "pink-magenta",
    name: "Pink & Magenta",
    description: "ธีมหลักของแอป (สีชมพู-ม่วงแดง)",
    primary: "#ff3d9a",
    secondary: "#9d4edd",
    gradient: "from-pink-500 to-fuchsia-500",
    default: true,
  },
  {
    id: "purple-violet",
    name: "Purple & Violet",
    description: "โทนสีม่วงเข้ม",
    primary: "#a855f7",
    secondary: "#7c3aed",
    gradient: "from-purple-500 to-violet-600",
  },
  {
    id: "blue-cyan",
    name: "Blue & Cyan",
    description: "โทนสีฟ้าสดใส",
    primary: "#3b82f6",
    secondary: "#06b6d4",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: "emerald-green",
    name: "Emerald & Green",
    description: "โทนสีเขียวมรกต",
    primary: "#10b981",
    secondary: "#059669",
    gradient: "from-emerald-500 to-green-600",
  },
  {
    id: "orange-amber",
    name: "Orange & Amber",
    description: "โทนสีส้มอบอุ่น",
    primary: "#f97316",
    secondary: "#f59e0b",
    gradient: "from-orange-500 to-amber-500",
  },
  {
    id: "rose-red",
    name: "Rose & Red",
    description: "โทนสีแดงกุหลาบ",
    primary: "#f43f5e",
    secondary: "#ef4444",
    gradient: "from-rose-500 to-red-500",
  },
  {
    id: "teal-aqua",
    name: "Teal & Aqua",
    description: "โทนสีเขียวน้ำทะเล",
    primary: "#14b8a6",
    secondary: "#0891b2",
    gradient: "from-teal-500 to-cyan-600",
  },
  {
    id: "indigo-blue",
    name: "Indigo & Blue",
    description: "โทนสีน้ำเงินคราม",
    primary: "#6366f1",
    secondary: "#3b82f6",
    gradient: "from-indigo-500 to-blue-500",
  },
];

export function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function applyTheme(theme: ThemeOption) {
  const root = document.documentElement;

  root.style.setProperty("--primary", theme.primary);
  root.style.setProperty("--secondary", theme.secondary);
  root.style.setProperty("--accent", theme.primary);

  root.style.setProperty("--border", hexToRgba(theme.primary, 0.2));
  root.style.setProperty("--input", hexToRgba(theme.primary, 0.1));
  root.style.setProperty("--ring", hexToRgba(theme.primary, 0.5));

  root.style.setProperty("--sidebar-primary", theme.primary);
  root.style.setProperty("--sidebar-border", hexToRgba(theme.primary, 0.2));
  root.style.setProperty("--sidebar-ring", hexToRgba(theme.primary, 0.5));

  root.style.setProperty("--chart-1", theme.primary);
  root.style.setProperty("--chart-2", theme.secondary);

  root.style.setProperty("--glow-pink", hexToRgba(theme.primary, 0.4));
  root.style.setProperty("--glow-purple", hexToRgba(theme.secondary, 0.3));

  updateFavicon(theme.id);
}

export function applySavedTheme() {
  const savedTheme = localStorage.getItem("app-theme");

  if (savedTheme) {
    const theme = themeOptions.find((t) => t.id === savedTheme);
    if (theme) {
      applyTheme(theme);
      return;
    }
  }

  const defaultTheme = themeOptions.find((t) => t.default);
  if (defaultTheme) {
    applyTheme(defaultTheme);
  }
}

export function updateFavicon(themeId: string) {
  const favicon = document.getElementById("app-favicon") as HTMLLinkElement | null;
  if (!favicon) return;

  const faviconMap: Record<string, string> = {
    "pink-magenta": "/favicons/favicon-pink.png",
    "purple-violet": "/favicons/favicon-purple.png",
    "blue-cyan": "/favicons/favicon-blue.png",
    "emerald-green": "/favicons/favicon-green.png",
    "orange-amber": "/favicons/favicon-orange.png",
    "rose-red": "/favicons/favicon-red.png",
    "teal-aqua": "/favicons/favicon-aqua.png",
    "indigo-blue": "/favicons/favicon-indigo.png",
  };

  const nextHref = faviconMap[themeId] || "/favicons/favicon-pink.png";

  // กัน browser cache บางกรณี
  favicon.href = `${nextHref}?v=${Date.now()}`;
}

