import { useState, useEffect } from "react";
import {
  Sparkles,
  TrendingUp,
  AlertCircle,
  Package2,
  Zap,
  DollarSign,
  ShoppingCart,
  ChevronRight,
} from "lucide-react";
import { GlowCard } from "../GlowCard";
import { useNavigate } from "react-router";
import { FeatureGuideCards } from "../FeatureGuideCards";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

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

const glowMap: Record<ThemeId, string> = {
  "pink-magenta": "drop-shadow-[0_0_10px_rgba(255,61,154,0.75)]",
  "purple-violet": "drop-shadow-[0_0_10px_rgba(168,85,247,0.75)]",
  "blue-cyan": "drop-shadow-[0_0_10px_rgba(59,130,246,0.75)]",
  "emerald-green": "drop-shadow-[0_0_10px_rgba(16,185,129,0.75)]",
  "orange-amber": "drop-shadow-[0_0_10px_rgba(251,146,60,0.75)]",
  "rose-red": "drop-shadow-[0_0_10px_rgba(244,63,94,0.75)]",
  "teal-aqua": "drop-shadow-[0_0_10px_rgba(20,184,166,0.75)]",
  "indigo-blue": "drop-shadow-[0_0_10px_rgba(99,102,241,0.75)]",
};

const glowBgMap: Record<ThemeId, string> = {
  "pink-magenta": "rgba(255,61,154,0.28)",
  "purple-violet": "rgba(168,85,247,0.28)",
  "blue-cyan": "rgba(59,130,246,0.28)",
  "emerald-green": "rgba(16,185,129,0.28)",
  "orange-amber": "rgba(251,146,60,0.28)",
  "rose-red": "rgba(244,63,94,0.28)",
  "teal-aqua": "rgba(20,184,166,0.28)",
  "indigo-blue": "rgba(99,102,241,0.28)",
};

const validThemes: ThemeId[] = [
  "pink-magenta",
  "purple-violet",
  "blue-cyan",
  "emerald-green",
  "orange-amber",
  "rose-red",
  "teal-aqua",
  "indigo-blue",
];

function normalizeTheme(value: string | null | undefined): ThemeId | null {
  if (!value) return null;

  const v = value.trim().toLowerCase();

  const aliasMap: Record<string, ThemeId> = {
    "pink-magenta": "pink-magenta",
    pink: "pink-magenta",
    magenta: "pink-magenta",

    "purple-violet": "purple-violet",
    purple: "purple-violet",
    violet: "purple-violet",

    "blue-cyan": "blue-cyan",
    blue: "blue-cyan",
    cyan: "blue-cyan",

    "emerald-green": "emerald-green",
    emerald: "emerald-green",
    green: "emerald-green",

    "orange-amber": "orange-amber",
    orange: "orange-amber",
    amber: "orange-amber",

    "rose-red": "rose-red",
    rose: "rose-red",
    red: "rose-red",

    "teal-aqua": "teal-aqua",
    teal: "teal-aqua",
    aqua: "teal-aqua",

    "indigo-blue": "indigo-blue",
    indigo: "indigo-blue",
  };

  return aliasMap[v] ?? null;
}

function getCurrentTheme(): ThemeId {
  const html = document.documentElement;

  const candidates = [
    localStorage.getItem("theme"),
    localStorage.getItem("selectedTheme"),
    localStorage.getItem("app-theme"),
    html.dataset.theme,
    html.getAttribute("data-theme"),
    html.dataset.colorTheme,
    html.getAttribute("data-color-theme"),
  ];

  for (const value of candidates) {
    const normalized = normalizeTheme(value);
    if (normalized) return normalized;
  }

  const classText = html.className || "";
  for (const theme of validThemes) {
    if (classText.includes(theme)) return theme;
  }

  if (classText.includes("pink")) return "pink-magenta";
  if (classText.includes("purple") || classText.includes("violet"))
    return "purple-violet";
  if (classText.includes("blue") || classText.includes("cyan"))
    return "blue-cyan";
  if (classText.includes("emerald") || classText.includes("green"))
    return "emerald-green";
  if (classText.includes("orange") || classText.includes("amber"))
    return "orange-amber";
  if (classText.includes("rose") || classText.includes("red"))
    return "rose-red";
  if (classText.includes("teal") || classText.includes("aqua"))
    return "teal-aqua";
  if (classText.includes("indigo")) return "indigo-blue";

  return "pink-magenta";
}

// Circular Risk Score Component
function RiskScoreCircle({ score }: { score: number }) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getRiskColor = () => {
    if (score < 30) return "#10b981";
    if (score < 60) return "#fbbf24";
    return "#ff3d9a";
  };

  const getRiskLabel = () => {
    if (score < 30) return "ความเสี่ยงต่ำ";
    if (score < 60) return "ความเสี่ยงปานกลาง";
    return "ความเสี่ยงสูง";
  };

  return (
    <div className="relative flex items-center justify-center">
      <svg className="transform -rotate-90" width="180" height="180">
        <circle
          cx="90"
          cy="90"
          r={radius}
          stroke="rgba(255, 61, 154, 0.1)"
          strokeWidth="12"
          fill="none"
        />
        <circle
          cx="90"
          cy="90"
          r={radius}
          stroke={getRiskColor()}
          strokeWidth="12"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
          style={{ filter: `drop-shadow(0 0 8px ${getRiskColor()})` }}
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-4xl font-bold text-glow-pink mb-1">{score}%</div>
        <div className="text-xs text-muted-foreground">{getRiskLabel()}</div>
      </div>
    </div>
  );
}

// Financial historical data - 3 lines: Revenue, Expenses, Net Profit
const financialData = [
  { year: "2020", revenue: 120000, expenses: 80000, netProfit: 40000 },
  { year: "2021", revenue: 180000, expenses: 95000, netProfit: 85000 },
  { year: "2022", revenue: 210000, expenses: 110000, netProfit: 100000 },
  { year: "2023", revenue: 250000, expenses: 105000, netProfit: 145000 },
  { year: "2024", revenue: 290000, expenses: 98000, netProfit: 192000 },
];

export function BusinessAnalysis() {
  const navigate = useNavigate();
  const riskScore = 68;
  const [showGuide, setShowGuide] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<ThemeId>(getCurrentTheme());

  useEffect(() => {
    const isFirstLogin = sessionStorage.getItem("isFirstLogin");
    if (isFirstLogin === "true") {
      setShowGuide(true);
    }
  }, []);

  useEffect(() => {
    const syncTheme = () => {
      const nextTheme = getCurrentTheme();
      setCurrentTheme((prev) => (prev === nextTheme ? prev : nextTheme));
    };

    syncTheme();

    window.addEventListener("storage", syncTheme);
    window.addEventListener("focus", syncTheme);

    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme", "data-color-theme"],
    });

    const interval = window.setInterval(syncTheme, 300);

    return () => {
      window.removeEventListener("storage", syncTheme);
      window.removeEventListener("focus", syncTheme);
      observer.disconnect();
      window.clearInterval(interval);
    };
  }, []);

  const currentLogo = logoMap[currentTheme];
  const currentGlow = glowMap[currentTheme];
  const currentGlowBg = glowBgMap[currentTheme];

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {showGuide && (
        <FeatureGuideCards
          onComplete={() => {
            sessionStorage.setItem("isFirstLogin", "false");
            setShowGuide(false);
          }}
        />
      )}

      <div className="text-center mb-4">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="relative flex items-center justify-center">
            <div
              className="absolute inset-0 rounded-full blur-xl opacity-70 scale-[1.6] transition-all duration-500"
              style={{ background: currentGlowBg }}
            />
            <img
              key={currentTheme}
              src={currentLogo}
              alt="FlowCast Logo"
              className={`relative w-9 h-9 object-contain transition-all duration-500 ${currentGlow}`}
            />
          </div>

          <h1 className="text-2xl font-semibold text-glow-pink">FlowCast</h1>
        </div>

        <p className="text-sm text-muted-foreground">
          AI CFO Assistant สำหรับธุรกิจของคุณ
        </p>
      </div>

      <GlowCard
        data-tour="risk-score"
        className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20 glow-pink-sm p-8"
      >
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-pink-sm">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl text-glow-pink">AI Risk Score</h2>
          </div>

          <RiskScoreCircle score={riskScore} />

          <p className="text-center text-muted-foreground mt-6 text-sm max-w-md leading-relaxed">
            AI วิเคราะห์และพบความเสี่ยงระดับสูง
            ควรติดตามการเงินอย่างใกล้ชิด
          </p>
        </div>
      </GlowCard>

      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={() => navigate("/cash-runway")}
          className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 hover:border-primary/40 transition-all hover:glow-pink-sm"
          type="button"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-white" />
          </div>
          <span className="text-xs text-center">เงินสด</span>
        </button>

        <button
          onClick={() => navigate("/suppliers")}
          className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 hover:border-blue-500/40 transition-all"
          type="button"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
            <ShoppingCart className="w-5 h-5 text-white" />
          </div>
          <span className="text-xs text-center">ซัพพลาย</span>
        </button>

        <button
          onClick={() => navigate("/simulator")}
          className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 hover:border-purple-500/40 transition-all"
          type="button"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xs text-center">ทดลอง</span>
        </button>
      </div>

      <div className="space-y-3" data-tour="material-cards">
        <h1 className="text-center mb-4">ข้อมูลเชิงลึก</h1>

        <button
          onClick={() => navigate("/cash-runway")}
          className="w-full text-left"
          type="button"
        >
          <GlowCard className="p-5 hover:glow-pink-sm transition-all cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center flex-shrink-0 text-yellow-500">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="mb-1">สุขภาพทางการเงิน</h4>
                <p className="text-sm text-muted-foreground">
                  เงินสดคงเหลือ 36 วัน
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </GlowCard>
        </button>

        <button
          onClick={() => navigate("/expense-anomaly")}
          className="w-full text-left"
          type="button"
        >
          <GlowCard className="p-5 hover:glow-pink-sm transition-all cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center flex-shrink-0 text-primary">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="mb-1">ค่าใช้จ่ายผิดปกติ</h4>
                <p className="text-sm text-muted-foreground">
                  วัตถุดิบเพิ่ม +18%
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </GlowCard>
        </button>

        <button
          onClick={() => navigate("/product-analysis")}
          className="w-full text-left"
          type="button"
        >
          <GlowCard className="p-5 hover:glow-pink-sm transition-all cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center flex-shrink-0 text-green-500">
                <Package2 className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="mb-1">วิเคราะห์สินค้า</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      สินค้ากำไรสูงสุด:
                    </span>
                    <span className="text-green-400">
                      สินค้า B (กำไร 42%)
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      สินค้าที่เงินจม:
                    </span>
                    <span className="text-red-400">สินค้า D (กำไร -5%)</span>
                  </div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </GlowCard>
        </button>
      </div>

      <div className="space-y-4">
        <h1 className="text-center">กำไรย้อนหลัง</h1>

        <div className="grid grid-cols-3 gap-2">
          <GlowCard className="p-3 text-center bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
            <p className="text-xs text-muted-foreground mb-1">กำไรสุทธิ 2024</p>
            <p className="text-lg text-green-400">฿192k</p>
          </GlowCard>

          <GlowCard className="p-3 text-center bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
            <p className="text-xs text-muted-foreground mb-1">เติบโต</p>
            <p className="text-lg text-primary">+32.4%</p>
          </GlowCard>

          <GlowCard className="p-3 text-center bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
            <p className="text-xs text-muted-foreground mb-1">อัตรากำไร</p>
            <p className="text-lg text-blue-400">66.2%</p>
          </GlowCard>
        </div>

        <GlowCard
          data-tour="profit-chart"
          className="p-5 bg-card/50 border-primary/20"
        >
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={financialData}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient
                  id="expensesGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
                <linearGradient
                  id="netProfitGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#ff3d9a" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ff3d9a" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255, 61, 154, 0.1)"
                vertical={false}
              />

              <XAxis
                dataKey="year"
                stroke="#606070"
                tick={{ fontSize: 12, fill: "#a0a0b0" }}
                axisLine={{ stroke: "#303040" }}
              />

              <YAxis
                stroke="#606070"
                tick={{ fontSize: 12, fill: "#a0a0b0" }}
                axisLine={{ stroke: "#303040" }}
                tickFormatter={(value) => `฿${(value / 1000).toFixed(0)}k`}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#15151f",
                  border: "1px solid rgba(255, 61, 154, 0.4)",
                  borderRadius: "12px",
                  boxShadow: "0 0 20px rgba(255, 61, 154, 0.2)",
                  padding: "12px",
                }}
                labelStyle={{ color: "#a0a0b0", marginBottom: "8px" }}
                formatter={(value: number) => `฿${value.toLocaleString()}`}
              />

              <Legend
                wrapperStyle={{ fontSize: "13px", paddingTop: "15px" }}
                iconType="circle"
              />

              <Line
                type="monotone"
                dataKey="revenue"
                name="รายได้"
                stroke="#10b981"
                strokeWidth={2.5}
                dot={{
                  fill: "#10b981",
                  r: 4,
                  strokeWidth: 2,
                  stroke: "#15151f",
                }}
                activeDot={{ r: 6, strokeWidth: 2, stroke: "#10b981" }}
                style={{
                  filter: "drop-shadow(0 0 6px rgba(16, 185, 129, 0.5))",
                }}
              />

              <Line
                type="monotone"
                dataKey="expenses"
                name="ค่าใช้จ่าย"
                stroke="#ef4444"
                strokeWidth={2.5}
                dot={{
                  fill: "#ef4444",
                  r: 4,
                  strokeWidth: 2,
                  stroke: "#15151f",
                }}
                activeDot={{ r: 6, strokeWidth: 2, stroke: "#ef4444" }}
                style={{
                  filter: "drop-shadow(0 0 6px rgba(239, 68, 68, 0.5))",
                }}
              />

              <Line
                type="monotone"
                dataKey="netProfit"
                name="กำไรสุทธิ"
                stroke="#ff3d9a"
                strokeWidth={3}
                dot={{
                  fill: "#ff3d9a",
                  r: 5,
                  strokeWidth: 2,
                  stroke: "#15151f",
                }}
                activeDot={{ r: 7, strokeWidth: 2, stroke: "#ff3d9a" }}
                style={{
                  filter: "drop-shadow(0 0 8px rgba(255, 61, 154, 0.6))",
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </GlowCard>

        <GlowCard className="p-4 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
          <p className="text-sm leading-relaxed text-muted-foreground">
            <span className="text-primary">💡 AI Insight:</span>{" "}
            กำไรสุทธิเพิ่มขึ้นอย่างต่อเนื่อง 5 ปีซ้อน โดยในปี 2024 เติบโต
            +32.4% จากปีก่อน ซึ่งเป็นผลจากการลดค่าใช้จ่ายลง 6.7%
            ในขณะที่รายได้เพิ่มขึ้น 16%
          </p>
        </GlowCard>

        <p className="text-xs text-center text-muted-foreground px-4">
          *ข้อมูลงบการเงินดึงอัตโนมัติจากฐานข้อมูลกรมพัฒนาธุรกิจการค้า
          กระทรวงพาณิชย์*
        </p>
      </div>
    </div>
  );
}