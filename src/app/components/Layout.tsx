import { Outlet, Link, useLocation } from "react-router";
import { useState } from "react";
import {
  BarChart3,
  Package,
  Wallet,
  Activity,
  Settings as SettingsIcon,
  Bot,
} from "lucide-react";
import { AIChat } from "./screens/AIChat";

const navItems = [
  { path: "/", label: "วิเคราะห์", icon: BarChart3, tourAttr: "" },
  { path: "/suppliers", label: "ซัพพลาย", icon: Package, tourAttr: "nav-suppliers" },
  { path: "/cash-runway", label: "เงินสด", icon: Wallet, tourAttr: "" },
  { path: "/simulator", label: "ทดลอง", icon: Activity, tourAttr: "" },
  { path: "/settings", label: "ตั้งค่า", icon: SettingsIcon, tourAttr: "nav-settings" },
];

export function Layout() {
  const location = useLocation();
  const [showAIChat, setShowAIChat] = useState(false);

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <main className="pb-20 animate-in fade-in duration-300">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Outlet />
        </div>
      </main>

      {/* Bottom Navigation - Always visible */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-xl border-t border-border/50 z-50">
        <div className="flex justify-around items-center h-16 max-w-md mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                data-tour={item.tourAttr || undefined}
                className={`flex flex-col items-center justify-center gap-1 px-3 py-2 transition-all min-w-[60px] ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? "glow-pink-sm" : ""}`} />
                <span className="text-xs">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Floating AI Assistant Button */}
      <button
        onClick={() => setShowAIChat(true)}
        className="fixed bottom-20 right-4 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-pink shadow-lg hover:scale-110 transition-all duration-300 z-40"
      >
        <Bot className="w-7 h-7 text-white" />
      </button>

      {/* AI Chat Panel */}
      {showAIChat && <AIChat onClose={() => setShowAIChat(false)} />}
    </div>
  );
}