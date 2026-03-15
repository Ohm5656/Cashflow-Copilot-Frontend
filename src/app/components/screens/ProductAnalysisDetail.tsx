import { ArrowLeft, TrendingUp, TrendingDown, Sparkles } from "lucide-react";
import { useNavigate } from "react-router";
import { GlowCard } from "../GlowCard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface Product {
  name: string;
  margin: number;
  revenue: number;
  status: "high" | "medium" | "low" | "negative";
}

const productData: Product[] = [
  { name: "Product B", margin: 42, revenue: 125000, status: "high" },
  { name: "Product F", margin: 37, revenue: 98000, status: "high" },
  { name: "Product A", margin: 28, revenue: 156000, status: "medium" },
  { name: "Product C", margin: 22, revenue: 87000, status: "medium" },
  { name: "Product E", margin: 15, revenue: 65000, status: "low" },
  { name: "Product G", margin: 2, revenue: 42000, status: "low" },
  { name: "Product D", margin: -5, revenue: 38000, status: "negative" },
];

export function ProductAnalysisDetail() {
  const navigate = useNavigate();

  const getBarColor = (status: string) => {
    switch (status) {
      case "high":
        return "#10b981";
      case "medium":
        return "#3b82f6";
      case "low":
        return "#f59e0b";
      case "negative":
        return "#ef4444";
      default:
        return "#ff3d9a";
    }
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      high: { label: "กำไรสูง", color: "bg-green-500/20 text-green-400" },
      medium: { label: "ปานกลาง", color: "bg-blue-500/20 text-blue-400" },
      low: { label: "กำไรต่ำ", color: "bg-orange-500/20 text-orange-400" },
      negative: { label: "ขาดทุน", color: "bg-red-500/20 text-red-400" },
    };
    return badges[status as keyof typeof badges] || badges.medium;
  };

  const topProducts = productData.filter((p) => p.status === "high");
  const lowMarginProducts = productData.filter(
    (p) => p.status === "low" || p.status === "negative"
  );

  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-24">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate("/")}
          className="w-10 h-10 rounded-full bg-muted/30 hover:bg-muted/50 flex items-center justify-center transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl text-glow-pink">Product Analysis</h1>
          <p className="text-sm text-muted-foreground">
            วิเคราะห์ผลกำไรแต่ละสินค้า
          </p>
        </div>
      </div>

      {/* Top Profitable Products */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-5 h-5 text-green-400" />
          <h3 className="text-green-400">สินค้ากำไรสูงสุด</h3>
        </div>
        <div className="space-y-3">
          {topProducts.map((product, index) => (
            <GlowCard
              key={product.name}
              className="p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20 hover:glow-pink-sm transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <span className="text-green-400 font-medium">
                      #{index + 1}
                    </span>
                  </div>
                  <div>
                    <h4 className="mb-1">{product.name}</h4>
                    <p className="text-xs text-muted-foreground">
                      รายรับ ฿{product.revenue.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl text-green-400 font-medium">
                    {product.margin}%
                  </p>
                  <p className="text-xs text-muted-foreground">กำไร</p>
                </div>
              </div>
            </GlowCard>
          ))}
        </div>
      </div>

      {/* Low Margin Warning */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <TrendingDown className="w-5 h-5 text-red-400" />
          <h3 className="text-red-400">สินค้ากำไรต่ำ / ขาดทุน</h3>
        </div>
        <div className="space-y-3">
          {lowMarginProducts.map((product) => {
            const badge = getStatusBadge(product.status);
            return (
              <GlowCard
                key={product.name}
                className="p-4 bg-gradient-to-br from-red-500/5 to-orange-500/5 border-red-500/20 hover:glow-pink-sm transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4>{product.name}</h4>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${badge.color}`}
                      >
                        {badge.label}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      รายรับ ฿{product.revenue.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-2xl font-medium ${
                        product.margin < 0 ? "text-red-400" : "text-orange-400"
                      }`}
                    >
                      {product.margin}%
                    </p>
                    <p className="text-xs text-muted-foreground">กำไร</p>
                  </div>
                </div>
              </GlowCard>
            );
          })}
        </div>
      </div>

      {/* Profit Margin Chart */}
      <GlowCard className="p-5 border-primary/20 glow-pink-sm">
        <h3 className="mb-4 flex items-center gap-2">
          📊 กราฟอัตรากำไรแต่ละสินค้า
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={productData} layout="vertical">
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.05)"
            />
            <XAxis
              type="number"
              stroke="#a0a0b0"
              fontSize={11}
              tickLine={false}
              tickFormatter={(value) => `${value}%`}
            />
            <YAxis
              type="category"
              dataKey="name"
              stroke="#a0a0b0"
              fontSize={11}
              tickLine={false}
              width={80}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1a1a28",
                border: "1px solid rgba(255, 61, 154, 0.2)",
                borderRadius: "12px",
                color: "#f0f0f5",
              }}
              formatter={(value: any) => [`${value}%`, "กำไร"]}
              labelStyle={{ color: "#a0a0b0" }}
            />
            <Bar dataKey="margin" radius={[0, 8, 8, 0]}>
              {productData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.status)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        <div className="flex items-center justify-center flex-wrap gap-4 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-xs text-muted-foreground">กำไรสูง</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-xs text-muted-foreground">ปานกลาง</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span className="text-xs text-muted-foreground">กำไรต่ำ</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-xs text-muted-foreground">ขาดทุน</span>
          </div>
        </div>
      </GlowCard>

      {/* AI Suggestions */}
      <GlowCard className="p-5 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20 glow-pink-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-pink-sm">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-glow-pink">คำแนะนำจาก AI</h3>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
            <div className="text-xl"></div>
            <div className="flex-1">
              <h4 className="text-sm mb-1 text-green-400">
                โปรโมท Product B
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                สินค้ากำไรสูงสุด 42% ควรเพิ่มการตลาดและสต็อก คาดว่าจะเพิ่มกำไรได้{" "}
                <span className="text-green-400">฿52,000/เดือน</span>
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
            <div className="text-xl"></div>
            <div className="flex-1">
              <h4 className="text-sm mb-1 text-red-400">
                ลดสต็อก Product D
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                สินค้าขาดทุน -5% ควรหยุดผลิตชั่วคราวและหาวิธีลดต้นทุนหรือเพิ่มราคาขาย
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
            <div className="text-xl"></div>
            <div className="flex-1">
              <h4 className="text-sm mb-1 text-orange-400">
                ปรับกลยุทธ์ Product G
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                กำไรเพียง 2% แนะนำให้ลดต้นทุนวัตถุดิบ 8-10% หรือเพิ่มราคาขาย 5%
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <div className="text-xl"></div>
            <div className="flex-1">
              <h4 className="text-sm mb-1 text-blue-400">
                โฟกัสสินค้า High-Margin
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                มุ่งเน้น Product B และ F ที่มีกำไรสูง จะช่วยเพิ่มกำไรรวมได้{" "}
                <span className="text-blue-400">+28%</span>
              </p>
            </div>
          </div>
        </div>
      </GlowCard>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-3">
        <GlowCard className="p-3 text-center bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
          <p className="text-xs text-muted-foreground mb-1">สินค้ากำไรสูง</p>
          <p className="text-2xl text-green-400">2</p>
        </GlowCard>
        <GlowCard className="p-3 text-center bg-gradient-to-br from-orange-500/10 to-amber-500/10 border-orange-500/20">
          <p className="text-xs text-muted-foreground mb-1">สินค้ากำไรต่ำ</p>
          <p className="text-2xl text-orange-400">2</p>
        </GlowCard>
        <GlowCard className="p-3 text-center bg-gradient-to-br from-red-500/10 to-rose-500/10 border-red-500/20">
          <p className="text-xs text-muted-foreground mb-1">สินค้าขาดทุน</p>
          <p className="text-2xl text-red-400">1</p>
        </GlowCard>
      </div>
    </div>
  );
}
