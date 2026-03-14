import { useState } from "react";
import { Activity } from "lucide-react";
import { GlowCard } from "../GlowCard";
import { Slider } from "../ui/slider";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function Simulator() {
  const [salesChange, setSalesChange] = useState([0]);
  const [expenses, setExpenses] = useState([0]);

  // Calculate runway change based on sales and expenses
  const runwayChange = Math.round((salesChange[0] * 0.6 - expenses[0] * 0.4));
  const currentRunway = 36;
  const newRunway = currentRunway + runwayChange;
  const changeValue = newRunway - currentRunway;

  // Generate cash flow data based on the simulation
  const generateCashFlowData = () => {
    const baseBalance = 720000;
    const dailyBurnRate = baseBalance / newRunway;
    
    return [
      { day: "วันนี้", balance: baseBalance },
      { day: "+7", balance: Math.round(baseBalance - dailyBurnRate * 7) },
      { day: "+14", balance: Math.round(baseBalance - dailyBurnRate * 14) },
      { day: "+21", balance: Math.round(baseBalance - dailyBurnRate * 21) },
      { day: "+28", balance: Math.round(baseBalance - dailyBurnRate * 28) },
    ];
  };

  const cashFlowData = generateCashFlowData();

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="text-center">
        <h1 className="mb-2">ทดลองสถานการณ์</h1>
        <p className="text-muted-foreground">จำลองผลกระทบต่อ Cash Runway</p>
      </div>

      {/* Control Sliders */}
      <div className="space-y-3">
        <GlowCard className="p-5">
          <label className="text-sm mb-3 block">ยอดขายเปลี่ยนแปลง</label>
          <div className="mb-3">
            <p className="text-sm mb-2 text-muted-foreground">การเปลี่ยนแปลง: {salesChange[0] > 0 ? '+' : ''}{salesChange[0]}%</p>
            <Slider
              value={salesChange}
              onValueChange={setSalesChange}
              max={20}
              min={-20}
              step={5}
              className="w-full h-2 bg-muted rounded-full"
            />
          </div>
        </GlowCard>

        <GlowCard className="p-5">
          <label className="text-sm mb-3 block">ค่าใช้จ่ายเปลี่ยนแปลง</label>
          <div className="mb-3">
            <p className="text-sm mb-2 text-muted-foreground">การเปลี่ยนแปลง: {expenses[0] > 0 ? '+' : ''}{expenses[0]}%</p>
            <Slider
              value={expenses}
              onValueChange={setExpenses}
              max={20}
              min={-20}
              step={2}
              className="w-full h-2 bg-muted rounded-full"
            />
          </div>
        </GlowCard>
      </div>

      {/* Simulation Results */}
      <GlowCard className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/30">
        <h3 className="mb-6 flex items-center gap-2">
          <Activity className="w-5 h-5" />
          ผลการจำลอง
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">ปัจจุบัน</span>
            <span className="text-2xl">{currentRunway} วัน</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">ใหม่</span>
            <span className="text-3xl text-primary text-glow-pink">{newRunway} วัน</span>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-border/30">
            <span className="text-sm text-muted-foreground">เปลี่ยนแปลง</span>
            <span className={`text-xl ${changeValue >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {changeValue > 0 ? '+' : ''}{changeValue} วัน
            </span>
          </div>
        </div>
      </GlowCard>

{/* Cash Flow Chart */}
<GlowCard className="p-6">
  <div className="mb-4">
    <h3>กระแสเงินสดคาดการณ์</h3>
    <p className="text-sm text-muted-foreground mt-1">เงินสดคงเหลือตามจำนวนวัน</p>
  </div>

  <ResponsiveContainer width="100%" height={300}>
    <LineChart
      data={cashFlowData}
      margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
    >
      <CartesianGrid
        strokeDasharray="3 3"
        stroke="rgba(255, 61, 154, 0.1)"
        vertical={false}
      />

      <XAxis
        dataKey="day"
        stroke="#a0a0b0"
        tick={{ fill: "#a0a0b0", fontSize: 12 }}
      />

      <YAxis
        stroke="#a0a0b0"
        tick={{ fill: "#a0a0b0", fontSize: 12 }}
        width={60}
      />

      <Tooltip
        contentStyle={{
          backgroundColor: "#15151f",
          border: "1px solid rgba(255, 61, 154, 0.3)",
          borderRadius: "12px",
        }}
        formatter={(value: number) => [`฿${value.toLocaleString()}`, "เงินสดคงเหลือ"]}
      />

      <Line
        type="monotone"
        dataKey="balance"
        stroke="#ff3d9a"
        strokeWidth={3}
        dot={{
          fill: "#ff3d9a",
          r: 5,
          filter: "drop-shadow(0 0 8px rgba(255, 61, 154, 0.6))",
        }}
      />
    </LineChart>
  </ResponsiveContainer>
</GlowCard>
    </div>
  );
}