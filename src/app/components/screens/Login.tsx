import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { Lock, Mail } from "lucide-react";
import { GlowCard } from "../GlowCard";

import logoPink from "../../../assets/logo-pink.png";
import logoPurple from "../../../assets/logo-purple.png";
import logoBlue from "../../../assets/logo-blue.png";
import logoGreen from "../../../assets/logo-green.png";
import logoOrange from "../../../assets/logo-orange.png";
import logoRed from "../../../assets/logo-red.png";
import logoAqua from "../../../assets/logo-aqua.png";
import logoIndigo from "../../../assets/logo-indigo.png";

type ThemeId =
  | "pink-magenta"
  | "purple-violet"
  | "blue-cyan"
  | "emerald-green"
  | "orange-amber"
  | "rose-red"
  | "teal-aqua"
  | "indigo-blue";

const THEME_STORAGE_KEY = "app-theme";

const logoMap: Record<ThemeId, string> = {
  "pink-magenta": logoPink,
  "purple-violet": logoPurple,
  "blue-cyan": logoBlue,
  "emerald-green": logoGreen,
  "orange-amber": logoOrange,
  "rose-red": logoRed,
  "teal-aqua": logoAqua,
  "indigo-blue": logoIndigo,
};

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [themeId, setThemeId] = useState<ThemeId>("pink-magenta");

  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

    if (
      savedTheme === "pink-magenta" ||
      savedTheme === "purple-violet" ||
      savedTheme === "blue-cyan" ||
      savedTheme === "emerald-green" ||
      savedTheme === "orange-amber" ||
      savedTheme === "rose-red" ||
      savedTheme === "teal-aqua" ||
      savedTheme === "indigo-blue"
    ) {
      setThemeId(savedTheme);
    } else {
      setThemeId("pink-magenta");
    }
  }, []);

  const currentLogo = useMemo(() => {
    return logoMap[themeId] || logoPink;
  }, [themeId]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    sessionStorage.setItem("isLoggedIn", "true");
    sessionStorage.setItem("user", JSON.stringify({ email }));

    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-start justify-center px-4 pt-16 bg-gradient-to-b from-background via-background to-primary/5">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <div className="flex justify-center mb-2">
  <div className="relative w-32 h-32 flex items-center justify-center">
    {/* glow layer ด้านหลัง */}
    <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl scale-110 animate-pulse" />
    <div className="absolute inset-4 rounded-full bg-primary/25 blur-2xl" />

    {/* logo */}
    <img
      src={currentLogo}
      alt="Cashflow Copilot Logo"
      draggable={false}
      className="relative z-10 w-35 h-35 object-contain drop-shadow-[0_0_28px_var(--glow-pink)] animate-[float_3.2s_ease-in-out_infinite]"
    />
  </div>
</div>

          <h1 className="text-3xl mb-2 text-primary">FlowCast</h1>
          <p className="text-muted-foreground">AI CFO Assistant สำหรับธุรกิจของคุณ</p>
        </div>

        <GlowCard className="p-8 border-primary/20">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm mb-2">อีเมล</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-muted/30 border border-muted/50 rounded-xl focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2">รหัสผ่าน</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-muted/30 border border-muted/50 rounded-xl focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-lg hover:shadow-primary/50 transition-all"
            >
              เข้าสู่ระบบ
            </button>
          </form>

          <div className="mt-6 text-center space-y-3">
            <button
              onClick={() => navigate("/forgot-password")}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              ลืมรหัสผ่าน?
            </button>

            <div className="pt-4 border-t border-muted/30">
              <p className="text-sm text-muted-foreground mb-3">ยังไม่มีบัญชี?</p>
              <button
                onClick={() => navigate("/signup")}
                className="w-full py-3 border border-primary/30 text-primary rounded-xl hover:bg-primary/10 transition-all"
              >
                สมัครสมาชิก
              </button>
            </div>

            <div className="pt-4 border-t border-muted/30">
              <p className="text-sm text-muted-foreground mb-3">Demo Account</p>
              <p className="text-sm text-muted-foreground mb-3">
                Email: demo@cashflow.com
              </p>
              <p className="text-sm text-muted-foreground">รหัสผ่าน: demo1234</p>
            </div>
          </div>
        </GlowCard>
      </div>
    </div>
  );
}