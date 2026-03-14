import { Link } from "react-router";
import { Home, AlertCircle } from "lucide-react";
import { GlowCard } from "../GlowCard";

export function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <GlowCard className="max-w-md w-full p-8 text-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500/20 to-pink-500/20 flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-10 h-10 text-red-400" />
        </div>
        
        <h1 className="text-4xl mb-4">404</h1>
        <h2 className="text-xl mb-2">ไม่พบหน้านี้</h2>
        <p className="text-muted-foreground mb-8">
          ขออภัย เราไม่พบหน้าที่คุณกำลังมองหา
        </p>

        <Link to="/">
          <button className="bg-gradient-to-r from-primary to-secondary text-white rounded-xl px-6 py-3 font-medium glow-pink-sm hover:opacity-90 transition-opacity flex items-center gap-2 mx-auto">
            <Home className="w-5 h-5" />
            กลับหน้าหลัก
          </button>
        </Link>
      </GlowCard>
    </div>
  );
}
