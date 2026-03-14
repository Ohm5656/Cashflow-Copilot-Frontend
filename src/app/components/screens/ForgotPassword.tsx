import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Mail, Sparkles, CheckCircle } from "lucide-react";
import { GlowCard } from "../GlowCard";

export function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock password reset - in real app, this would send email
    setSent(true);
  };

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-background via-background to-primary/5">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 glow-pink-sm mb-4">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl mb-2 text-glow-pink">ส่งอีเมลแล้ว</h1>
            <p className="text-muted-foreground mb-8">
              เราได้ส่งลิงก์รีเซ็ตรหัสผ่านไปที่อีเมลของคุณแล้ว
            </p>
          </div>

          <GlowCard className="p-6 border-primary/20 glow-pink-sm">
            <p className="text-sm text-muted-foreground text-center mb-4">
              กรุณาตรวจสอบอีเมล <span className="text-primary">{email}</span> และคลิกลิงก์เพื่อรีเซ็ตรหัสผ่าน
            </p>

            <button
              onClick={() => navigate("/login")}
              className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-lg hover:shadow-primary/50 transition-all glow-pink-sm"
            >
              กลับไปหน้าเข้าสู่ระบบ
            </button>
          </GlowCard>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              ไม่ได้รับอีเมล?{" "}
              <button
                onClick={() => setSent(false)}
                className="text-primary hover:underline"
              >
                ส่งอีกครั้ง
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-background via-background to-primary/5">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary glow-pink-sm mb-4">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl mb-2 text-glow-pink">ลืมรหัสผ่าน</h1>
          <p className="text-muted-foreground">
            กรอกอีเมลของคุณเพื่อรับลิงก์รีเซ็ตรหัสผ่าน
          </p>
        </div>

        <GlowCard className="p-8 border-primary/20 glow-pink-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
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

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-lg hover:shadow-primary/50 transition-all glow-pink-sm"
            >
              ส่งลิงก์รีเซ็ตรหัสผ่าน
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate("/login")}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mx-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">กลับไปหน้าเข้าสู่ระบบ</span>
            </button>
          </div>
        </GlowCard>
      </div>
    </div>
  );
}
