import { useState } from "react";
import {
  Activity,
  Plus,
  Minus,
  TrendingUp,
  TrendingDown,
  RotateCcw,
} from "lucide-react";
import { GlowCard } from "../GlowCard";
import { Slider } from "../ui/slider";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

export function Simulator() {
  const [salesChange, setSalesChange] = useState(0);
  const [expenseChange, setExpenseChange] = useState(0);

  // Calculate runway change based on sales and expenses
  const runwayChange = Math.round(salesChange * 0.6 - expenseChange * 0.4);
  const currentRunway = 36;
  const newRunway = Math.max(1, currentRunway + runwayChange);
  const changeValue = newRunway - currentRunway;

  // Generate cash flow data based on the simulation
  const generateCashFlowData = () => {
    const baseBalance = 450000;
    const currentDailyBurnRate = baseBalance / currentRunway;
    const newDailyBurnRate = baseBalance / newRunway;

    const data = [];
    const days = Math.max(newRunway, currentRunway) + 7;

    for (let i = 0; i <= days; i += 7) {
      data.push({
        day: i === 0 ? "วันนี้" : `+${i}`,
        currentBalance: Math.max(0, baseBalance - currentDailyBurnRate * i),
        newBalance: Math.max(0, baseBalance - newDailyBurnRate * i),
      });
    }

    return data;
  };

  const cashFlowData = generateCashFlowData();

  // Handler functions
  const handleSalesChange = (value: number) => {
    const clamped = Math.max(-30, Math.min(30, value));
    setSalesChange(clamped);
  };

  const handleExpenseChange = (value: number) => {
    const clamped = Math.max(-30, Math.min(30, value));
    setExpenseChange(clamped);
  };

  const handleBestCase = () => {
    setSalesChange(20);
    setExpenseChange(-10);
  };

  const handleWorstCase = () => {
    setSalesChange(-20);
    setExpenseChange(15);
  };

  const handleReset = () => {
    setSalesChange(0);
    setExpenseChange(0);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-24">
      <div className="text-center">
        <h1 className="mb-2 text-2xl text-glow-pink">ทดลองสถานการณ์</h1>
        <p className="text-sm text-muted-foreground">
          จำลองผลกระทบต่อ Cash Runway
        </p>
      </div>

      {/* SECTION 1 — Sales Change */}
      <GlowCard className="p-5 border-primary/20" data-tour="sales-slider">
        <label className="text-sm mb-4 block font-medium">
          ยอดขายเปลี่ยนแปลง
        </label>

        {/* Plus/Minus Buttons with Display */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <button
            onClick={() => handleSalesChange(salesChange - 5)}
            className="w-10 h-10 rounded-full bg-muted/30 hover:bg-muted/50 flex items-center justify-center transition-all border border-muted/50 hover:border-primary/50"
          >
            <Minus className="w-5 h-5" />
          </button>

          <div className="min-w-[100px] text-center">
            <span
              className={`text-3xl font-medium ${
                salesChange > 0
                  ? "text-green-400"
                  : salesChange < 0
                  ? "text-red-400"
                  : "text-foreground"
              }`}
            >
              {salesChange > 0 ? "+" : ""}
              {salesChange}%
            </span>
          </div>

          <button
            onClick={() => handleSalesChange(salesChange + 5)}
            className="w-10 h-10 rounded-full bg-muted/30 hover:bg-muted/50 flex items-center justify-center transition-all border border-muted/50 hover:border-primary/50"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Slider */}
        <div className="mb-4">
          <Slider
            value={[salesChange]}
            onValueChange={(value) => handleSalesChange(value[0])}
            max={30}
            min={-30}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>-30%</span>
            <span>0%</span>
            <span>+30%</span>
          </div>
        </div>

        {/* Manual Input */}
        <div className="flex items-center gap-2">
          <label className="text-xs text-muted-foreground whitespace-nowrap">
            กรอกตัวเลข:
          </label>
          <div className="flex items-center gap-1 flex-1">
            <input
              type="number"
              value={salesChange}
              onChange={(e) => handleSalesChange(Number(e.target.value))}
              className="flex-1 px-3 py-2 bg-muted/30 border border-muted/50 rounded-lg focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-center"
              placeholder="0"
            />
            <span className="text-muted-foreground">%</span>
          </div>
        </div>
      </GlowCard>

      {/* SECTION 2 — Expense Change */}
      <GlowCard className="p-5 border-primary/20">
        <label className="text-sm mb-4 block font-medium">
          ค่าใช้จ่ายเปลี่ยนแปลง
        </label>

        {/* Plus/Minus Buttons with Display */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <button
            onClick={() => handleExpenseChange(expenseChange - 5)}
            className="w-10 h-10 rounded-full bg-muted/30 hover:bg-muted/50 flex items-center justify-center transition-all border border-muted/50 hover:border-primary/50"
          >
            <Minus className="w-5 h-5" />
          </button>

          <div className="min-w-[100px] text-center">
            <span
              className={`text-3xl font-medium ${
                expenseChange > 0
                  ? "text-red-400"
                  : expenseChange < 0
                  ? "text-green-400"
                  : "text-foreground"
              }`}
            >
              {expenseChange > 0 ? "+" : ""}
              {expenseChange}%
            </span>
          </div>

          <button
            onClick={() => handleExpenseChange(expenseChange + 5)}
            className="w-10 h-10 rounded-full bg-muted/30 hover:bg-muted/50 flex items-center justify-center transition-all border border-muted/50 hover:border-primary/50"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Slider */}
        <div className="mb-4">
          <Slider
            value={[expenseChange]}
            onValueChange={(value) => handleExpenseChange(value[0])}
            max={30}
            min={-30}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>-30%</span>
            <span>0%</span>
            <span>+30%</span>
          </div>
        </div>

        {/* Manual Input */}
        <div className="flex items-center gap-2">
          <label className="text-xs text-muted-foreground whitespace-nowrap">
            กรอกตัวเลข:
          </label>
          <div className="flex items-center gap-1 flex-1">
            <input
              type="number"
              value={expenseChange}
              onChange={(e) => handleExpenseChange(Number(e.target.value))}
              className="flex-1 px-3 py-2 bg-muted/30 border border-muted/50 rounded-lg focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-center"
              placeholder="0"
            />
            <span className="text-muted-foreground">%</span>
          </div>
        </div>
      </GlowCard>

      {/* SECTION 3 — Quick Scenario Buttons */}
      <div className="grid grid-cols-3 gap-3" data-tour="scenario-buttons">
        <button
          onClick={handleBestCase}
          className="p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 hover:border-green-500/50 transition-all hover:glow-pink-sm flex flex-col items-center gap-2"
        >
          <TrendingUp className="w-6 h-6 text-green-400" />
          <span className="text-xs font-medium text-green-400">Best Case</span>
          <span className="text-[10px] text-muted-foreground text-center">
            ขาย +20%
            <br />
            ค่าใช้จ่าย -10%
          </span>
        </button>

        <button
          onClick={handleWorstCase}
          className="p-4 rounded-xl bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/30 hover:border-red-500/50 transition-all hover:glow-pink-sm flex flex-col items-center gap-2"
        >
          <TrendingDown className="w-6 h-6 text-red-400" />
          <span className="text-xs font-medium text-red-400">Worst Case</span>
          <span className="text-[10px] text-muted-foreground text-center">
            ขาย -20%
            <br />
            ค่าใช้จ่าย +15%
          </span>
        </button>

        <button
          onClick={handleReset}
          className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/30 hover:border-primary/50 transition-all hover:glow-pink-sm flex flex-col items-center gap-2"
        >
          <RotateCcw className="w-6 h-6 text-primary" />
          <span className="text-xs font-medium text-primary">Reset</span>
          <span className="text-[10px] text-muted-foreground text-center">
            รีเซ็ตค่า
            <br />
            เริ่มต้นใหม่
          </span>
        </button>
      </div>

      {/* SECTION 4 — Simulation Result */}
      <GlowCard className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/30 glow-pink-sm" data-tour="simulation-result">
        <h3 className="mb-6 flex items-center gap-2 text-glow-pink">
          <Activity className="w-5 h-5" />
          ผลการจำลอง
        </h3>
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Runway ปัจจุบัน
            </span>
            <span className="text-2xl">{currentRunway} วัน</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Runway ใหม่</span>
            <span className="text-3xl text-primary text-glow-pink">
              {newRunway} วัน
            </span>
          </div>
          <div className="flex items-center justify-between pt-5 border-t border-border/30">
            <span className="text-sm text-muted-foreground">เปลี่ยนแปลง</span>
            <div className="flex items-center gap-2">
              {changeValue >= 0 ? (
                <TrendingUp className="w-5 h-5 text-green-400" />
              ) : (
                <TrendingDown className="w-5 h-5 text-red-400" />
              )}
              <span
                className={`text-2xl font-medium ${
                  changeValue >= 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                {changeValue > 0 ? "+" : ""}
                {changeValue} วัน
              </span>
            </div>
          </div>
        </div>

        {/* AI Insight */}
        {changeValue !== 0 && (
          <div className="mt-6 p-4 rounded-lg bg-muted/20 border border-primary/20">
            <div className="flex items-start gap-3">
              <span className="text-xl">💡</span>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {changeValue > 0 ? (
                    <>
                      <span className="text-green-400 font-medium">
                        ดีขึ้น!
                      </span>{" "}
                      การปรับเปลี่ยนนี้จะช่วยขยายระยะเวลาที่ธุรกิจสามารถดำเนินการต่อไปได้อีก{" "}
                      {Math.abs(changeValue)} วัน
                    </>
                  ) : (
                    <>
                      <span className="text-red-400 font-medium">
                        ระวัง!
                      </span>{" "}
                      สถานการณ์นี้จะทำให้ระยะเวลาดำเนินการลดลง{" "}
                      {Math.abs(changeValue)} วัน
                      ควรพิจารณามาตรการเพิ่มเติม
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        )}
      </GlowCard>

      {/* SECTION 5 — Cash Runway Chart */}
      <GlowCard className="p-6 border-primary/20">
        <div className="mb-4">
          <h3 className="flex items-center gap-2">📊 กราฟ Cash Runway</h3>
          <p className="text-sm text-muted-foreground mt-1">
            เปรียบเทียบเงินสดคงเหลือ: ปัจจุบัน vs สถานการณ์ใหม่
          </p>
        </div>

        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={cashFlowData}>
            <defs>
              <linearGradient id="currentGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a0a0b0" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#a0a0b0" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="newGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff3d9a" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#ff3d9a" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.05)"
            />
            <XAxis
              dataKey="day"
              stroke="#a0a0b0"
              fontSize={11}
              tickLine={false}
            />
            <YAxis
              stroke="#a0a0b0"
              fontSize={11}
              tickLine={false}
              tickFormatter={(value) => `฿${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1a1a28",
                border: "1px solid rgba(255, 61, 154, 0.2)",
                borderRadius: "12px",
                color: "#f0f0f5",
              }}
              formatter={(value: any) => [`฿${value.toLocaleString()}`, ""]}
              labelStyle={{ color: "#a0a0b0" }}
            />
        
            <Area
              type="monotone"
              dataKey="newBalance"
              stroke="#ff3d9a"
              strokeWidth={3}
              fill="url(#newGradient)"
              name="สถานการณ์ใหม่"
              dot={{ fill: "#ff3d9a", r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>

        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
        
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary"></div>
            <span className="text-xs text-muted-foreground">
              สถานการณ์ใหม่
            </span>
          </div>
        </div>
      </GlowCard>
    </div>
  );
}