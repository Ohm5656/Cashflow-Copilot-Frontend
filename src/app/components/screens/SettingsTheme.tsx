import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { GlowCard } from "../GlowCard";
import { useNavigate } from "react-router";
import { themeOptions, applyTheme } from "../../lib/theme-utils";

export function SettingsTheme() {
  const navigate = useNavigate();
  const [selectedTheme, setSelectedTheme] = useState<string>("pink-magenta");
  const [isApplying, setIsApplying] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("app-theme");
    if (savedTheme) {
      setSelectedTheme(savedTheme);
    } else {
      setSelectedTheme("pink-magenta");
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
          <p className="text-sm text-primary font-medium">✨ กำลังใช้งานธีม...</p>
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
              type="button"
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
        <h3 className="text-sm font-medium mb-2 flex items-center gap-2">💡 เคล็ดลับ</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          สีที่คุณเลือกจะถูกใช้กับปุ่มหลัก ไฮไลท์ และเอฟเฟกต์ Glow
          ทั่วทั้งแอป การเปลี่ยนธีมจะมีผลทันที และจะถูกบันทึกไว้ใช้งานต่อไป
        </p>
      </div>

      <div className="flex justify-center pt-4">
        <button
          onClick={() => navigate("/settings")}
          className="px-6 py-3 bg-muted/50 hover:bg-muted transition-colors rounded-lg text-sm font-medium"
          type="button"
        >
          ← กลับไปหน้าตั้งค่า
        </button>
      </div>
    </div>
  );
}