import {
  User,
  Package,
  Upload,
  ChevronRight,
  Building2,
  DollarSign,
  Globe,
  LogOut,
  Palette,
  Sparkles,
} from "lucide-react";
import { GlowCard } from "../GlowCard";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { FeatureGuideCards } from "../FeatureGuideCards";
import { applySavedTheme } from "../../lib/theme-utils";

const settingsSections = [
  {
    icon: User,
    title: "บัญชี",
    description: "ข้อมูลบริษัทและการตั้งค่าทั่วไป",
    path: "/settings/account",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: Package,
    title: "จัดการซัพพลาย",
    description: "เพิ่มหรือลบวัตถุดิบ",
    path: "/settings/inventory",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Upload,
    title: "นำเข้าข้อมูล",
    description: "อัปโหลด Statement, Invoice, Bills และข้อมูลยอดขาย",
    path: "/settings/import",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Palette,
    title: "ธีมสีแอป",
    description: "เลือกโทนสีหลักของแอปตามสไตล์ที่คุณชอบ",
    path: "/settings/theme",
    color: "from-fuchsia-500 to-violet-500",
  },
];

const accountInfo = {
  companyName: "บริษัท ABC จำกัด",
  businessType: "ร้านค้าปลีก",
  currentCash: "฿720,000",
  currency: "THB (บาท)",
};

export function Settings() {
  const [showFeatureGuide, setShowFeatureGuide] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    applySavedTheme();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("isFirstLogin");
    navigate("/login");
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Feature Guide Cards Modal */}
      {showFeatureGuide && (
        <FeatureGuideCards onComplete={() => setShowFeatureGuide(false)} />
      )}

      <div className="text-center">
        <h1 className="mb-2">ตั้งค่า</h1>
        <p className="text-muted-foreground">จัดการข้อมูลบริษัทและการตั้งค่าแอป</p>
      </div>

      <GlowCard className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20 p-6">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 glow-pink-sm">
            <Building2 className="w-7 h-7 text-white" />
          </div>

          <div className="flex-1">
            <h3 className="mb-1 text-glow-pink">{accountInfo.companyName}</h3>
            <p className="text-sm text-muted-foreground mb-2">{accountInfo.businessType}</p>

            <div className="flex items-center gap-4 text-sm flex-wrap">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-primary" />
                <span>{accountInfo.currentCash}</span>
              </div>

              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-primary" />
                <span>{accountInfo.currency}</span>
              </div>
            </div>
          </div>
        </div>
      </GlowCard>

      <div className="space-y-3" data-tour="settings-account">
        {settingsSections.map((section) => {
          const Icon = section.icon;

          return (
            <Link key={section.path} to={section.path}>
              <GlowCard className="p-5 hover:glow-pink-sm transition-all cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center flex-shrink-0 glow-pink-sm group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  <div className="flex-1">
                    <h3 className="mb-1">{section.title}</h3>
                    <p className="text-sm text-muted-foreground">{section.description}</p>
                  </div>

                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </GlowCard>
            </Link>
          );
        })}

        <button onClick={() => setShowFeatureGuide(true)} className="w-full">
          <GlowCard className="p-5 hover:glow-pink-sm transition-all cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-fuchsia-500 flex items-center justify-center flex-shrink-0 glow-pink-sm group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6 text-white" />
              </div>

              <div className="flex-1 text-left">
                <h3 className="mb-1">แนะนำฟีเจอร์ทั้งหมด</h3>
                <p className="text-sm text-muted-foreground">ดูคำแนะนำและวิธีใช้งานฟีเจอร์ทุกตัว</p>
              </div>

              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </GlowCard>
        </button>
      </div>

      <div className="text-center pt-4 pb-24">
        <p className="text-sm text-muted-foreground mb-1">FlowCast</p>
        <p className="text-xs text-muted-foreground mb-3">Version 1.0.0</p>

        <button
          onClick={handleLogout}
          className="text-sm text-red-400 hover:text-red-300 transition-colors flex items-center gap-2 mx-auto"
        >
          <LogOut className="w-4 h-4" />
          ออกจากระบบ
        </button>
      </div>
    </div>
  );
}