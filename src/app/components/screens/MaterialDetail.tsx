import { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Share2,
  Bell,
  BarChart3,
} from "lucide-react";
import { GlowCard } from "../GlowCard";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type TimeFilter = "7 วัน" | "30 วัน" | "3 เดือน" | "6 เดือน";

const timeFilters: TimeFilter[] = ["7 วัน", "30 วัน", "3 เดือน", "6 เดือน"];

interface PricePoint {
  date: string;
  price: number;
}

interface Supplier {
  name: string;
  avgPrice: number;
}

interface MaterialData {
  id: string;
  name: string;
  suppliers: Supplier[];
  aiRecommendation: string;
  priceHistory: Record<TimeFilter, PricePoint[]>;
}

const materialsData: Record<string, MaterialData> = {
  "material-a": {
    id: "material-a",
    name: "วัตถุดิบ A",
    priceHistory: {
      "7 วัน": [
        { date: "13 มี.ค.", price: 108 },
        { date: "14 มี.ค.", price: 110 },
        { date: "15 มี.ค.", price: 112 },
        { date: "16 มี.ค.", price: 115 },
        { date: "17 มี.ค.", price: 118 },
        { date: "18 มี.ค.", price: 120 },
        { date: "19 มี.ค.", price: 120 },
      ],
      "30 วัน": [
        { date: "สัปดาห์ 1", price: 102 },
        { date: "สัปดาห์ 2", price: 106 },
        { date: "สัปดาห์ 3", price: 111 },
        { date: "สัปดาห์ 4", price: 120 },
      ],
      "3 เดือน": [
        { date: "ม.ค.", price: 95 },
        { date: "ก.พ.", price: 104 },
        { date: "มี.ค.", price: 120 },
      ],
      "6 เดือน": [
        { date: "ต.ค.", price: 88 },
        { date: "พ.ย.", price: 92 },
        { date: "ธ.ค.", price: 97 },
        { date: "ม.ค.", price: 102 },
        { date: "ก.พ.", price: 110 },
        { date: "มี.ค.", price: 120 },
      ],
    },
    suppliers: [
      { name: "Supplier A", avgPrice: 115 },
      { name: "Supplier B", avgPrice: 114 },
      { name: "Supplier C", avgPrice: 118 },
    ],
    aiRecommendation:
      "ราคาวัตถุดิบ A มีแนวโน้มเพิ่มขึ้นต่อเนื่อง ควรพิจารณาซื้อภายในไม่กี่วันข้างหน้าเพื่อหลีกเลี่ยงต้นทุนที่สูงขึ้น",
  },
  "material-b": {
    id: "material-b",
    name: "วัตถุดิบ B",
    priceHistory: {
      "7 วัน": [
        { date: "13 มี.ค.", price: 98 },
        { date: "14 มี.ค.", price: 100 },
        { date: "15 มี.ค.", price: 99 },
        { date: "16 มี.ค.", price: 97 },
        { date: "17 มี.ค.", price: 96 },
        { date: "18 มี.ค.", price: 95 },
        { date: "19 มี.ค.", price: 95 },
      ],
      "30 วัน": [
        { date: "สัปดาห์ 1", price: 104 },
        { date: "สัปดาห์ 2", price: 101 },
        { date: "สัปดาห์ 3", price: 98 },
        { date: "สัปดาห์ 4", price: 95 },
      ],
      "3 เดือน": [
        { date: "ม.ค.", price: 110 },
        { date: "ก.พ.", price: 102 },
        { date: "มี.ค.", price: 95 },
      ],
      "6 เดือน": [
        { date: "ต.ค.", price: 115 },
        { date: "พ.ย.", price: 111 },
        { date: "ธ.ค.", price: 108 },
        { date: "ม.ค.", price: 104 },
        { date: "ก.พ.", price: 100 },
        { date: "มี.ค.", price: 95 },
      ],
    },
    suppliers: [
      { name: "Supplier A", avgPrice: 98 },
      { name: "Supplier D", avgPrice: 96 },
      { name: "Supplier E", avgPrice: 99 },
    ],
    aiRecommendation:
      "ราคาวัตถุดิบ B กำลังลดลง อาจรออีกเล็กน้อยก่อนสั่งซื้อเพื่อประหยัดต้นทุน",
  },
  "material-c": {
    id: "material-c",
    name: "วัตถุดิบ C",
    priceHistory: {
      "7 วัน": [
        { date: "13 มี.ค.", price: 206 },
        { date: "14 มี.ค.", price: 205 },
        { date: "15 มี.ค.", price: 207 },
        { date: "16 มี.ค.", price: 208 },
        { date: "17 มี.ค.", price: 209 },
        { date: "18 มี.ค.", price: 210 },
        { date: "19 มี.ค.", price: 210 },
      ],
      "30 วัน": [
        { date: "สัปดาห์ 1", price: 201 },
        { date: "สัปดาห์ 2", price: 204 },
        { date: "สัปดาห์ 3", price: 207 },
        { date: "สัปดาห์ 4", price: 210 },
      ],
      "3 เดือน": [
        { date: "ม.ค.", price: 198 },
        { date: "ก.พ.", price: 204 },
        { date: "มี.ค.", price: 210 },
      ],
      "6 เดือน": [
        { date: "ต.ค.", price: 192 },
        { date: "พ.ย.", price: 195 },
        { date: "ธ.ค.", price: 198 },
        { date: "ม.ค.", price: 201 },
        { date: "ก.พ.", price: 206 },
        { date: "มี.ค.", price: 210 },
      ],
    },
    suppliers: [
      { name: "Supplier F", avgPrice: 207 },
      { name: "Supplier G", avgPrice: 206 },
      { name: "Supplier H", avgPrice: 210 },
    ],
    aiRecommendation:
      "ราคาวัตถุดิบ C ค่อนข้างคงที่ สามารถซื้อได้ในช่วงนี้ หรือพิจารณา Supplier G ที่มีราคาเฉลี่ยต่ำสุด",
  },
  "material-d": {
    id: "material-d",
    name: "วัตถุดิบ D",
    priceHistory: {
      "7 วัน": [
        { date: "13 มี.ค.", price: 57 },
        { date: "14 มี.ค.", price: 56 },
        { date: "15 มี.ค.", price: 58 },
        { date: "16 มี.ค.", price: 59 },
        { date: "17 มี.ค.", price: 60 },
        { date: "18 มี.ค.", price: 60 },
        { date: "19 มี.ค.", price: 60 },
      ],
      "30 วัน": [
        { date: "สัปดาห์ 1", price: 54 },
        { date: "สัปดาห์ 2", price: 56 },
        { date: "สัปดาห์ 3", price: 58 },
        { date: "สัปดาห์ 4", price: 60 },
      ],
      "3 เดือน": [
        { date: "ม.ค.", price: 52 },
        { date: "ก.พ.", price: 56 },
        { date: "มี.ค.", price: 60 },
      ],
      "6 เดือน": [
        { date: "ต.ค.", price: 49 },
        { date: "พ.ย.", price: 51 },
        { date: "ธ.ค.", price: 53 },
        { date: "ม.ค.", price: 55 },
        { date: "ก.พ.", price: 58 },
        { date: "มี.ค.", price: 60 },
      ],
    },
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
    priceHistory: {
      "7 วัน": [
        { date: "13 มี.ค.", price: 141 },
        { date: "14 มี.ค.", price: 142 },
        { date: "15 มี.ค.", price: 141 },
        { date: "16 มี.ค.", price: 140 },
        { date: "17 มี.ค.", price: 140 },
        { date: "18 มี.ค.", price: 140 },
        { date: "19 มี.ค.", price: 140 },
      ],
      "30 วัน": [
        { date: "สัปดาห์ 1", price: 146 },
        { date: "สัปดาห์ 2", price: 144 },
        { date: "สัปดาห์ 3", price: 142 },
        { date: "สัปดาห์ 4", price: 140 },
      ],
      "3 เดือน": [
        { date: "ม.ค.", price: 148 },
        { date: "ก.พ.", price: 144 },
        { date: "มี.ค.", price: 140 },
      ],
      "6 เดือน": [
        { date: "ต.ค.", price: 152 },
        { date: "พ.ย.", price: 149 },
        { date: "ธ.ค.", price: 147 },
        { date: "ม.ค.", price: 145 },
        { date: "ก.พ.", price: 143 },
        { date: "มี.ค.", price: 140 },
      ],
    },
    suppliers: [
      { name: "Supplier L", avgPrice: 141 },
      { name: "Supplier M", avgPrice: 140 },
      { name: "Supplier N", avgPrice: 143 },
    ],
    aiRecommendation:
      "ราคาคงที่และมีแนวโน้มลดลงเล็กน้อย สามารถซื้อได้ในราคานี้ หรือรออีกเล็กน้อยเพื่อดูแนวโน้ม",
  },
  "material-f": {
    id: "material-f",
    name: "วัตถุดิบ F",
    priceHistory: {
      "7 วัน": [
        { date: "13 มี.ค.", price: 77 },
        { date: "14 มี.ค.", price: 76 },
        { date: "15 มี.ค.", price: 78 },
        { date: "16 มี.ค.", price: 79 },
        { date: "17 มี.ค.", price: 80 },
        { date: "18 มี.ค.", price: 80 },
        { date: "19 มี.ค.", price: 80 },
      ],
      "30 วัน": [
        { date: "สัปดาห์ 1", price: 73 },
        { date: "สัปดาห์ 2", price: 75 },
        { date: "สัปดาห์ 3", price: 78 },
        { date: "สัปดาห์ 4", price: 80 },
      ],
      "3 เดือน": [
        { date: "ม.ค.", price: 70 },
        { date: "ก.พ.", price: 75 },
        { date: "มี.ค.", price: 80 },
      ],
      "6 เดือน": [
        { date: "ต.ค.", price: 66 },
        { date: "พ.ย.", price: 69 },
        { date: "ธ.ค.", price: 71 },
        { date: "ม.ค.", price: 73 },
        { date: "ก.พ.", price: 77 },
        { date: "มี.ค.", price: 80 },
      ],
    },
    suppliers: [
      { name: "Supplier O", avgPrice: 78 },
      { name: "Supplier P", avgPrice: 79 },
      { name: "Supplier Q", avgPrice: 81 },
    ],
    aiRecommendation:
      "ราคาเพิ่มขึ้นต่อเนื่อง ควรซื้อเร็วหรือเจรจาราคากับ Supplier O เพื่อล็อกราคาไว้",
  },
};

const getTimeframeLabel = (filter: TimeFilter) => {
  if (filter === "7 วัน") return "7 วัน";
  if (filter === "30 วัน") return "30 วัน";
  if (filter === "3 เดือน") return "3 เดือน";
  return "6 เดือน";
};

export function MaterialDetail() {
  const { materialId } = useParams();
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState<TimeFilter>("7 วัน");

  const material = materialId ? materialsData[materialId] : null;

  const materialIds = Object.keys(materialsData);
  const currentIndex = materialIds.findIndex((id) => id === materialId);
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < materialIds.length - 1;

  const navigateToMaterial = (direction: "prev" | "next") => {
    const newIndex = direction === "prev" ? currentIndex - 1 : currentIndex + 1;
    if (newIndex >= 0 && newIndex < materialIds.length) {
      navigate(`/suppliers/${materialIds[newIndex]}`);
    }
  };

  const chartData = useMemo(() => {
    if (!material) return [];
    return material.priceHistory[selectedFilter];
  }, [material, selectedFilter]);

  const stats = useMemo(() => {
    if (!chartData.length) {
      return {
        open: 0,
        close: 0,
        high: 0,
        low: 0,
        changePercent: 0,
        average: 0,
      };
    }

    const prices = chartData.map((item) => item.price);
    const open = prices[0];
    const close = prices[prices.length - 1];
    const high = Math.max(...prices);
    const low = Math.min(...prices);
    const average = Math.round(prices.reduce((sum, p) => sum + p, 0) / prices.length);
    const changePercent = Number((((close - open) / open) * 100).toFixed(1));

    return {
      open,
      close,
      high,
      low,
      changePercent,
      average,
    };
  }, [chartData]);

  const isPositive = stats.changePercent > 0;
  const isNegative = stats.changePercent < 0;

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

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigateToMaterial("prev")}
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
            onClick={() => navigateToMaterial("next")}
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
          <p className="text-5xl mb-2 text-glow-pink">฿{stats.close}</p>
          <div
            className={`flex items-center justify-center gap-2 text-lg ${
              isPositive ? "text-red-400" : isNegative ? "text-green-400" : "text-muted-foreground"
            }`}
          >
            {isPositive ? (
              <TrendingUp className="w-5 h-5" />
            ) : isNegative ? (
              <TrendingDown className="w-5 h-5" />
            ) : null}
            <span>
              {stats.changePercent > 0 ? "+" : ""}
              {stats.changePercent}%
            </span>
          </div>
        </div>
      </div>

      {/* Price Range */}
      <GlowCard className="p-5 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20 text-center">
        <p className="text-sm text-muted-foreground mb-2">ช่วงราคา</p>
        <p className="text-xl">
          <span className="text-green-400">฿{stats.low}</span>
          <span className="text-muted-foreground mx-3">—</span>
          <span className="text-red-400">฿{stats.high}</span>
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

      {/* Price Chart */}
      <GlowCard className="p-4 bg-card/50 border-primary/20">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm text-muted-foreground">กราฟราคา</p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap justify-end">
            <span>O: ฿{stats.open}</span>
            <span className="text-green-400">H: ฿{stats.high}</span>
            <span className="text-red-400">L: ฿{stats.low}</span>
            <span>C: ฿{stats.close}</span>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={chartData}>
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
              domain={[Math.max(0, stats.low - 3), stats.high + 3]}
              tickFormatter={(value) => `฿${value}`}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#15151f",
                border: "1px solid rgba(255, 61, 154, 0.4)",
                borderRadius: "12px",
                boxShadow: "0 0 20px rgba(255, 61, 154, 0.2)",
                padding: "8px 12px",
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
          <p className="text-2xl text-glow-pink">฿{stats.close}</p>
        </GlowCard>

        <GlowCard className="p-4 text-center">
          <p className="text-xs text-muted-foreground mb-2">เปลี่ยนแปลง</p>
          <p
            className={`text-2xl ${
              isPositive ? "text-red-400" : isNegative ? "text-green-400" : "text-muted-foreground"
            }`}
          >
            {stats.changePercent > 0 ? "+" : ""}
            {stats.changePercent}%
          </p>
        </GlowCard>

        <GlowCard className="p-4 text-center">
          <p className="text-xs text-muted-foreground mb-2">
            ราคาต่ำสุด ({getTimeframeLabel(selectedFilter)})
          </p>
          <p className="text-2xl text-green-400">฿{stats.low}</p>
        </GlowCard>

        <GlowCard className="p-4 text-center">
          <p className="text-xs text-muted-foreground mb-2">
            ราคาสูงสุด ({getTimeframeLabel(selectedFilter)})
          </p>
          <p className="text-2xl text-red-400">฿{stats.high}</p>
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
            <p className={`text-sm ${isPositive ? "text-red-400" : isNegative ? "text-green-400" : "text-muted-foreground"}`}>
              {isPositive ? "📈 ขาขึ้น" : isNegative ? "📉 ขาลง" : "→ ทรงตัว"}
            </p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground mb-1">ความผันผวน</p>
            <p className="text-sm text-yellow-400">
              {Math.abs(stats.changePercent) > 5 ? "⚡ สูง" : "✓ ปกติ"}
            </p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground mb-1">
              ราคาเฉลี่ย {getTimeframeLabel(selectedFilter)}
            </p>
            <p className="text-sm text-blue-400">฿{stats.average}</p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground mb-1">คำแนะนำ</p>
            <p
              className={`text-sm ${
                isPositive && stats.changePercent > 3
                  ? "text-green-400"
                  : stats.changePercent < -2
                  ? "text-yellow-400"
                  : "text-muted-foreground"
              }`}
            >
              {isPositive && stats.changePercent > 3
                ? "✓ ซื้อเร็ว"
                : stats.changePercent < -2
                ? "⏳ รอดู"
                : "→ ปกติ"}
            </p>
          </div>
        </div>
      </GlowCard>



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