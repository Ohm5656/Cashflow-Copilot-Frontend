import { useState } from "react";
import { useNavigate } from "react-router";
import { Lock, Mail, Sparkles } from "lucide-react";
import { GlowCard } from "../GlowCard";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - in real app, this would authenticate with backend
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-background via-background to-primary/5">
      <div className="w-full max-w-md space-y-8">
        {/* Logo and Title */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary glow-pink-sm mb-4">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl mb-2 text-glow-pink">Cashflow Copilot</h1>
          <p className="text-muted-foreground">AI CFO Assistant สำหรับธุรกิจของคุณ</p>
        </div>

        {/* Login Form */}
        <GlowCard className="p-8 border-primary/20 glow-pink-sm">
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
              className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-lg hover:shadow-primary/50 transition-all glow-pink-sm"
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
              <p className="text-sm text-muted-foreground mb-3">
                ยังไม่มีบัญชี?
              </p>
              <button
                onClick={() => navigate("/signup")}
                className="w-full py-3 border border-primary/30 text-primary rounded-xl hover:bg-primary/10 transition-all"
              >
                สมัครสมาชิก
              </button>
            </div>
          </div>
        </GlowCard>
      </div>
    </div>
  );
}
