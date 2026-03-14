import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, TrendingUp, TrendingDown, Sparkles, ChevronLeft, ChevronRight, Share2, Bell, BarChart3 } from "lucide-react";
import { GlowCard } from "../GlowCard";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const timeFilters = ["7 วัน", "30 วัน", "3 เดือน", "6 เดือน"];

interface MaterialData {
  id: string;
  name: string;
  currentPrice: number;
  change: number;
  minPrice: number;
  maxPrice: number;
  priceData: { date: string; price: number }[];
  suppliers: {
    name: string;
    avgPrice: number;
  }[];
  aiRecommendation: string;
}

const materialsData: Record<string, MaterialData> = {
  "material-a": {
    id: "material-a",
    name: "วัตถุดิบ A",
    currentPrice: 120,
    change: 8.0,
    minPrice: 108,
    maxPrice: 125,
    priceData: [
      { date: "13 มี.ค.", price: 108 },
      { date: "14 มี.ค.", price: 110 },
      { date: "15 มี.ค.", price: 112 },
      { date: "16 มี.ค.", price: 115 },
      { date: "17 มี.ค.", price: 118 },
      { date: "18 มี.ค.", price: 120 },
      { date: "19 มี.ค.", price: 120 },
    ],
    suppliers: [
      { name: "Supplier A", avgPrice: 115 },
      { name: "Supplier B", avgPrice: 114 },
      { name: "Supplier C", avgPrice: 118 },
    ],
    aiRecommendation:
      "ราคาวัตถุดิบ A มีแนวโน้มเพิ่มขึ้นอย่างต่อเนื่องใน 2 สัปดาห์ที่ผ่านมา ควรพิจารณาซื้อวัตถุดิบในช่วง 3 วันข้างหน้าเพื่อหลีกเลี่ยงต้นทุนที่สูงขึ้น",
  },
  "material-b": {
    id: "material-b",
    name: "วัตถุดิบ B",
    currentPrice: 95,
    change: -3.0,
    minPrice: 88,
    maxPrice: 102,
    priceData: [
      { date: "13 มี.ค.", price: 98 },
      { date: "14 มี.ค.", price: 100 },
      { date: "15 มี.ค.", price: 99 },
      { date: "16 มี.ค.", price: 97 },
      { date: "17 มี.ค.", price: 96 },
      { date: "18 มี.ค.", price: 95 },
      { date: "19 มี.ค.", price: 95 },
    ],
    suppliers: [
      { name: "Supplier A", avgPrice: 98 },
      { name: "Supplier D", avgPrice: 96 },
      { name: "Supplier E", avgPrice: 99 },
    ],
    aiRecommendation:
      "ราคาวัตถุดิบกำลังลดลง อาจรออีกเล็กน้อยก่อนสั่งซื้อเพื่อประหยัดต้นทุน คาดว่าราคาจะลดลงอีก 2-3% ในสัปดาห์หน้า",
  },
  "material-c": {
    id: "material-c",
    name: "วัตถุดิบ C",
    currentPrice: 210,
    change: 2.0,
    minPrice: 198,
    maxPrice: 215,
    priceData: [
      { date: "13 มี.ค.", price: 206 },
      { date: "14 มี.ค.", price: 205 },
      { date: "15 มี.ค.", price: 207 },
      { date: "16 มี.ค.", price: 208 },
      { date: "17 มี.ค.", price: 209 },
      { date: "18 มี.ค.", price: 210 },
      { date: "19 มี.ค.", price: 210 },
    ],
    suppliers: [
      { name: "Supplier F", avgPrice: 207 },
      { name: "Supplier G", avgPrice: 206 },
      { name: "Supplier H", avgPrice: 210 },
    ],
    aiRecommendation:
      "ราคาวัตถุดิบ C คงที่และมีแนวโน้มเพิ่มขึ้นเล็กน้อย สามารถซื้อได้ในช่วงนี้ หรือรอโปรโมชั่นจาก Supplier G ที่มีราคาเฉลี่ยต่ำสุด",
  },
  "material-d": {
    id: "material-d",
    name: "วัตถุดิบ D",
    currentPrice: 60,
    change: 5.0,
    minPrice: 55,
    maxPrice: 64,
    priceData: [
      { date: "13 มี.ค.", price: 57 },
      { date: "14 มี.ค.", price: 56 },
      { date: "15 มี.ค.", price: 58 },
      { date: "16 มี.ค.", price: 59 },
      { date: "17 มี.ค.", price: 60 },
      { date: "18 มี.ค.", price: 60 },
      { date: "19 มี.ค.", price: 60 },
    ],
    suppliers: [
      { name: "Supplier I", avgPrice: 58 },
      { name: "Supplier J", avgPrice: 59 },
      { name: "Supplier K", avgPrice: 61 },
    ],
    aiRecommendation:
      "ราคาเพิ่มขึ้นเล็กน้อยแต่ยังอยู่ในช่วงที่เหมาะสม ควรซื้อจาก Supplier I ที่ให้ราคาเฉลี่ยต่ำสุด",
  },
  "material-e": {
    id: "material-e",
    name: "วัตถุดิบ E",
    currentPrice: 140,
    change: -1.0,
    minPrice: 135,
    maxPrice: 148,
    priceData: [
      { date: "13 มี.ค.", price: 141 },
      { date: "14 มี.ค.", price: 142 },
      { date: "15 มี.ค.", price: 141 },
      { date: "16 มี.ค.", price: 140 },
      { date: "17 มี.ค.", price: 140 },
      { date: "18 มี.ค.", price: 140 },
      { date: "19 มี.ค.", price: 140 },
    ],
    suppliers: [
      { name: "Supplier L", avgPrice: 141 },
      { name: "Supplier M", avgPrice: 140 },
      { name: "Supplier N", avgPrice: 143 },
    ],
    aiRecommendation:
      "ราคาคงที่และมีแนวโน้มลดลงเล็กน้อย สามารถซื้อได้ในราคานี้ หรือรอ 2-3 วันเพื่อดูแนวโน้ม",
  },
  "material-f": {
    id: "material-f",
    name: "วัตถุดิบ F",
    currentPrice: 80,
    change: 4.0,
    minPrice: 75,
    maxPrice: 84,
    priceData: [
      { date: "13 มี.ค.", price: 77 },
      { date: "14 มี.ค.", price: 76 },
      { date: "15 มี.ค.", price: 78 },
      { date: "16 มี.ค.", price: 79 },
      { date: "17 มี.ค.", price: 80 },
      { date: "18 มี.ค.", price: 80 },
      { date: "19 มี.ค.", price: 80 },
    ],
    suppliers: [
      { name: "Supplier O", avgPrice: 78 },
      { name: "Supplier P", avgPrice: 79 },
      { name: "Supplier Q", avgPrice: 81 },
    ],
    aiRecommendation:
      "ราคาเพิ่มขึ้นอย่างต่อเนื่อง ควรซื้อเร็วที่สุดหรือเจรจาราคากับ Supplier O เพื่อล็อกราคาไว้",
  },
};

export function MaterialDetail() {
  const { materialId } = useParams();
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState("7 วัน");

  const material = materialId ? materialsData[materialId] : null;

  // Get all material IDs for navigation
  const materialIds = Object.keys(materialsData);
  const currentIndex = materialIds.findIndex(id => id === materialId);
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < materialIds.length - 1;

  const navigateToMaterial = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex >= 0 && newIndex < materialIds.length) {
      navigate(`/suppliers/${materialIds[newIndex]}`);
    }
  };

  if (!material) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">ไม่พบข้อมูลวัตถุดิบ</p>
        <button
          onClick={() => navigate("/suppliers")}
          className="mt-4 px-6 py-2 bg-primary/20 text-primary rounded-full hover:bg-primary/30 transition-all"
        >
          กลับ
        </button>
      </div>
    );
  }

  const isPositive = material.change > 0;

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Header with Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate("/suppliers")}
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>กลับ</span>
        </button>

        {/* Material Navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigateToMaterial('prev')}
            disabled={!hasPrevious}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
              hasPrevious
                ? "bg-muted/50 hover:bg-muted/70 text-foreground"
                : "bg-muted/20 text-muted-foreground/30 cursor-not-allowed"
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-xs text-muted-foreground px-2">
            {currentIndex + 1}/{materialIds.length}
          </span>
          <button
            onClick={() => navigateToMaterial('next')}
            disabled={!hasNext}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
              hasNext
                ? "bg-muted/50 hover:bg-muted/70 text-foreground"
                : "bg-muted/20 text-muted-foreground/30 cursor-not-allowed"
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button className="w-9 h-9 rounded-full bg-muted/50 hover:bg-muted/70 flex items-center justify-center transition-all">
            <Bell className="w-4 h-4" />
          </button>
          <button className="w-9 h-9 rounded-full bg-muted/50 hover:bg-muted/70 flex items-center justify-center transition-all">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Material Header */}
      <div className="text-center">
        <h1 className="mb-4">{material.name}</h1>
        <div className="inline-block">
          <p className="text-5xl mb-2 text-glow-pink">฿{material.currentPrice}</p>
          <div
            className={`flex items-center justify-center gap-2 text-lg ${
              isPositive ? "text-red-400" : "text-green-400"
            }`}
          >
            {isPositive ? (
              <TrendingUp className="w-5 h-5" />
            ) : (
              <TrendingDown className="w-5 h-5" />
            )}
            <span>
              {isPositive ? "+" : ""}
              {material.change}%
            </span>
          </div>
        </div>
      </div>

      {/* Price Range */}
      <GlowCard className="p-5 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20 text-center">
        <p className="text-sm text-muted-foreground mb-2">ช่วงราคา</p>
        <p className="text-xl">
          <span className="text-green-400">฿{material.minPrice}</span>
          <span className="text-muted-foreground mx-3">—</span>
          <span className="text-red-400">฿{material.maxPrice}</span>
        </p>
      </GlowCard>

      {/* Time Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {timeFilters.map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
              selectedFilter === filter
                ? "bg-primary/20 text-primary border border-primary/30 glow-pink-sm"
                : "bg-muted/50 text-muted-foreground hover:bg-muted/70"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Price Chart - TradingView Style */}
      <GlowCard className="p-4 bg-card/50 border-primary/20">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm text-muted-foreground">กราฟราคา</p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>O: ฿{material.priceData[0].price}</span>
            <span className="text-green-400">H: ฿{material.maxPrice}</span>
            <span className="text-red-400">L: ฿{material.minPrice}</span>
            <span>C: ฿{material.currentPrice}</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={material.priceData}>
            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff3d9a" stopOpacity={0.4} />
                <stop offset="50%" stopColor="#ff3d9a" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#ff3d9a" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255, 61, 154, 0.1)"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              stroke="#606070"
              tick={{ fontSize: 11, fill: "#a0a0b0" }}
              axisLine={{ stroke: "#303040" }}
            />
            <YAxis
              stroke="#606070"
              tick={{ fontSize: 11, fill: "#a0a0b0" }}
              axisLine={{ stroke: "#303040" }}
              domain={[material.minPrice - 3, material.maxPrice + 3]}
              tickFormatter={(value) => `฿${value}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#15151f",
                border: "1px solid rgba(255, 61, 154, 0.4)",
                borderRadius: "12px",
                boxShadow: "0 0 20px rgba(255, 61, 154, 0.2)",
                padding: "8px 12px"
              }}
              labelStyle={{ color: "#a0a0b0", marginBottom: "4px" }}
              formatter={(value: number) => [`฿${value}`, "ราคา"]}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#ff3d9a"
              strokeWidth={2.5}
              fill="url(#priceGradient)"
              dot={{ fill: "#ff3d9a", r: 3, strokeWidth: 2, stroke: "#15151f" }}
              activeDot={{ r: 5, strokeWidth: 2, stroke: "#ff3d9a", fill: "#ff3d9a" }}
              style={{ filter: "drop-shadow(0 0 8px rgba(255, 61, 154, 0.5))" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </GlowCard>

      {/* Price Statistics */}
      <div className="grid grid-cols-2 gap-3">
        <GlowCard className="p-4 text-center">
          <p className="text-xs text-muted-foreground mb-2">ราคาปัจจุบัน</p>
          <p className="text-2xl text-glow-pink">฿{material.currentPrice}</p>
        </GlowCard>
        <GlowCard className="p-4 text-center">
          <p className="text-xs text-muted-foreground mb-2">เปลี่ยนแปลง</p>
          <p className={`text-2xl ${isPositive ? "text-red-400" : "text-green-400"}`}>
            {isPositive ? "+" : ""}
            {material.change}%
          </p>
        </GlowCard>
        <GlowCard className="p-4 text-center">
          <p className="text-xs text-muted-foreground mb-2">ราคาต่ำสุด (7 วัน)</p>
          <p className="text-2xl text-green-400">฿{material.minPrice}</p>
        </GlowCard>
        <GlowCard className="p-4 text-center">
          <p className="text-xs text-muted-foreground mb-2">ราคาสูงสุด (7 วัน)</p>
          <p className="text-2xl text-red-400">฿{material.maxPrice}</p>
        </GlowCard>
      </div>

      {/* Technical Analysis */}
      <GlowCard className="p-5 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border-blue-500/20">
        <h3 className="mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-blue-400" />
          วิเคราะห์เทคนิค
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">แนวโน้ม</p>
            <p className={`text-sm ${isPositive ? "text-red-400" : "text-green-400"}`}>
              {isPositive ? "📈 ขาขึ้น" : "📉 ขาลง"}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">ความผันผวน</p>
            <p className="text-sm text-yellow-400">
              {Math.abs(material.change) > 5 ? "⚡ สูง" : "✓ ปกติ"}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">ราคาเฉลี่ย 7 วัน</p>
            <p className="text-sm text-blue-400">฿{Math.round((material.minPrice + material.maxPrice) / 2)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">คำแนะนำ</p>
            <p className={`text-sm ${isPositive && material.change > 3 ? "text-green-400" : material.change < -2 ? "text-yellow-400" : "text-muted-foreground"}`}>
              {isPositive && material.change > 3 ? "✓ ซื้อเร็ว" : material.change < -2 ? "⏳ รอดู" : "→ ปกติ"}
            </p>
          </div>
        </div>
      </GlowCard>

      {/* Supplier Comparison */}
      <div>
        <h3 className="mb-3">เปรียบเทียบซัพพลายเออร์</h3>
        <div className="space-y-3">
          {material.suppliers.map((supplier, idx) => {
            const isLowestPrice = supplier.avgPrice === Math.min(...material.suppliers.map(s => s.avgPrice));
            return (
              <GlowCard key={idx} className={`p-4 ${isLowestPrice ? 'border-green-500/30 bg-gradient-to-br from-green-500/5 to-emerald-500/5' : ''}`}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4>{supplier.name}</h4>
                      {isLowestPrice && (
                        <span className="text-xs px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full border border-green-500/30">
                          ราคาต่ำสุด
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground mb-1">ราคาเฉลี่ย</p>
                    <p className="text-xl text-glow-pink">฿{supplier.avgPrice}</p>
                  </div>
                </div>
                {isLowestPrice && (
                  <button className="w-full mt-3 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:shadow-lg hover:shadow-green-500/30 transition-all text-sm">
                    ติดต่อซื้อ
                  </button>
                )}
              </GlowCard>
            );
          })}
        </div>
      </div>

      {/* AI Recommendation */}
      <GlowCard className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/30 glow-pink-sm p-5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-green-400 mb-2">💡 AI แนะนำ</h3>
            <p className="text-sm leading-relaxed">{material.aiRecommendation}</p>
          </div>
        </div>
      </GlowCard>
    </div>
  );
}
