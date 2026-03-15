import { Wallet, AlertTriangle, TrendingDown, Calendar, DollarSign, AlertCircle } from "lucide-react";
import { GlowCard } from "../GlowCard";

export function CashRunway() {
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="text-center">
        <h1 className="mb-2">เงินสด</h1>
        <p className="text-muted-foreground">ติดตามและคาดการณ์เงินสด</p>
      </div>

      {/* Main Runway Display */}
      <GlowCard className="bg-gradient-to-br from-primary/20 to-secondary/20 border-primary/50 glow-pink p-8 text-center" data-tour="runway-card">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary mb-4 glow-pink">
          <Wallet className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-sm text-muted-foreground mb-2">Cash Runway</h2>
        <p className="text-6xl mb-4 text-glow-pink">36 วัน</p>
        <p className="text-muted-foreground text-sm">อยู่ได้ถึง 19 เมษายน 2026</p>
      </GlowCard>

{/* Financial Insight Cards */}
<div className="space-y-3">
  <GlowCard className="min-h-[104px] p-5 hover:glow-pink-sm transition-all">
    <div className="flex items-center gap-4 h-full">
      <div className="w-12 h-12 rounded-2xl bg-green-500/15 border border-green-500/30 flex items-center justify-center flex-shrink-0">
        <DollarSign className="w-5 h-5 text-green-400" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm text-muted-foreground mb-2">เงินสดจริงปัจจุบัน</p>
        <p className="text-3xl font-semibold leading-none text-white tracking-tight">
          ฿180,000
        </p>
      </div>
    </div>
  </GlowCard>

  <GlowCard className="min-h-[104px] p-5 hover:glow-pink-sm transition-all">
    <div className="flex items-center gap-4 h-full">
      <div className="w-12 h-12 rounded-2xl bg-pink-500/15 border border-pink-500/30 flex items-center justify-center flex-shrink-0">
        <Calendar className="w-5 h-5 text-pink-400" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm text-muted-foreground mb-1">วันที่เงินสดจะหมด</p>
        <p className="text-2xl font-semibold leading-tight text-white tracking-tight">
          19 เมษายน 2026
        </p>
      </div>
    </div>
  </GlowCard>
</div>

      {/* Emergency Scenario Card */}
      <GlowCard className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border-red-500/30 p-5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center border border-red-500/30 flex-shrink-0">
            <AlertTriangle className="w-5 h-5 text-red-400" />
          </div>
          <div>
            <h3 className="mb-1">กรณีฉุกเฉิน</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              หากยอดขายลดลง 10%
              <br />
              <span className="text-red-400">Runway เหลือ 24 วัน</span>
            </p>
          </div>
        </div>
      </GlowCard>

      {/* Cash Reconciliation Card */}
      <GlowCard className="bg-gradient-to-br from-yellow-500/10 to-amber-500/10 border-yellow-500/30 p-5" data-tour="cash-verification">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center border border-yellow-500/30 flex-shrink-0">
            <AlertCircle className="w-5 h-5 text-yellow-400" />
          </div>
          <div className="flex-1">
            <h3 className="mb-3">ตรวจสอบความถูกต้องของเงินสด</h3>
            <div className="space-y-2 mb-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Expected Cash (จากบิล):</span>
                <span className="text-foreground">฿180,000</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Bank Statement:</span>
                <span className="text-foreground">฿165,000</span>
              </div>
              <div className="h-px bg-border my-2"></div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Difference:</span>
                <span className="text-yellow-400 font-medium">฿15,000</span>
              </div>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
              <p className="text-sm text-yellow-400 leading-relaxed">
                ⚠️ พบความแตกต่างของข้อมูลเงินสด อาจมีธุรกรรมที่ไม่ได้บันทึก
              </p>
            </div>
          </div>
        </div>
      </GlowCard>
    </div>
  );
}