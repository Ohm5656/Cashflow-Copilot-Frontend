import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { GlowCard } from "../GlowCard";
import { useNavigate } from "react-router";

const themeOptions = [
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

// Helper function to convert hex to rgba
function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function applySavedTheme() {
  const savedTheme = localStorage.getItem("app-theme");
  
  if (savedTheme) {
    const theme = themeOptions.find((t) => t.id === savedTheme);
    if (theme) {
      applyTheme(theme);
    }
  } else {
    // Apply default theme
    const defaultTheme = themeOptions.find((t) => t.default);
    if (defaultTheme) {
      applyTheme(defaultTheme);
    }
  }
}

function applyTheme(theme: typeof themeOptions[0]) {
  const root = document.documentElement;
  
  // Set primary and secondary colors
  root.style.setProperty("--primary", theme.primary);
  root.style.setProperty("--secondary", theme.secondary);
  root.style.setProperty("--accent", theme.primary);
  
  // Set border colors with transparency
  root.style.setProperty("--border", hexToRgba(theme.primary, 0.2));
  root.style.setProperty("--input", hexToRgba(theme.primary, 0.1));
  root.style.setProperty("--ring", hexToRgba(theme.primary, 0.5));
  
  // Set sidebar colors
  root.style.setProperty("--sidebar-primary", theme.primary);
  root.style.setProperty("--sidebar-border", hexToRgba(theme.primary, 0.2));
  root.style.setProperty("--sidebar-ring", hexToRgba(theme.primary, 0.5));
  
  // Set chart colors based on theme
  root.style.setProperty("--chart-1", theme.primary);
  root.style.setProperty("--chart-2", theme.secondary);
  
  // Set glow effects
  root.style.setProperty("--glow-pink", hexToRgba(theme.primary, 0.4));
  root.style.setProperty("--glow-purple", hexToRgba(theme.secondary, 0.3));
}

export function SettingsTheme() {
  const navigate = useNavigate();
  const [selectedTheme, setSelectedTheme] = useState<string>("pink-magenta");
  const [isApplying, setIsApplying] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("app-theme");
    if (savedTheme) {
      setSelectedTheme(savedTheme);
    }
  }, []);

  const handleThemeSelect = (themeId: string) => {
    setSelectedTheme(themeId);
    setIsApplying(true);
    localStorage.setItem("app-theme", themeId);
    
    const theme = themeOptions.find((t) => t.id === themeId);
    if (theme) {
      applyTheme(theme);
    }

    // Reset applying state after animation
    setTimeout(() => {
      setIsApplying(false);
    }, 600);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-24">
      <div className="text-center">
        <h1 className="mb-2">ธีมสีแอป</h1>
        <p className="text-muted-foreground">
          เลือกโทนสีหลักของแอปตามสไตล์ที่คุณชอบ
        </p>
      </div>

      {isApplying && (
        <div className="bg-primary/10 border border-primary/30 rounded-lg p-3 text-center glow-pink-sm">
          <p className="text-sm text-primary font-medium">
            ✨ กำลังใช้งานธีม...
          </p>
        </div>
      )}

      <div className="space-y-3">
        {themeOptions.map((theme) => {
          const isSelected = selectedTheme === theme.id;

          return (
            <button
              key={theme.id}
              onClick={() => handleThemeSelect(theme.id)}
              className="w-full"
              disabled={isApplying}
            >
              <GlowCard
                className={`p-5 transition-all cursor-pointer group ${
                  isSelected
                    ? "ring-2 ring-primary glow-pink-md"
                    : "hover:glow-pink-sm"
                } ${isApplying ? "opacity-60" : ""}`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${theme.gradient} flex items-center justify-center flex-shrink-0 glow-pink-sm group-hover:scale-110 transition-transform`}
                  >
                    {isSelected && <Check className="w-8 h-8 text-white" />}
                  </div>

                  <div className="flex-1 text-left">
                    <h3 className="mb-1 flex items-center gap-2">
                      {theme.name}
                      {theme.default && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary">
                          ธีมหลัก
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {theme.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded-full border-2 border-border"
                      style={{ backgroundColor: theme.primary }}
                    />
                    <div
                      className="w-6 h-6 rounded-full border-2 border-border"
                      style={{ backgroundColor: theme.secondary }}
                    />
                  </div>
                </div>
              </GlowCard>
            </button>
          );
        })}
      </div>

      <div className="bg-muted/20 border border-border rounded-lg p-4 mt-8">
        <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
          💡 เคล็ดลับ
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          สีที่คุณเลือกจะถูกใช้กับปุ่มหลัก ไฮไลท์ และเอฟเฟกต์ Glow
          ทั่วทั้งแอป การเปลี่ยนธีมจะมีผลทันที และจะถูกบันทึกไว้ใช้งานต่อไป
        </p>
      </div>

      <div className="flex justify-center pt-4">
        <button
          onClick={() => navigate("/settings")}
          className="px-6 py-3 bg-muted/50 hover:bg-muted transition-colors rounded-lg text-sm font-medium"
        >
          ← กลับไปหน้าตั้งค่า
        </button>
      </div>
    </div>
  );
}