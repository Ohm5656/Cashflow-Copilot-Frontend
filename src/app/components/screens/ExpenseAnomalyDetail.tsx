import { ArrowLeft, AlertTriangle, TrendingUp, Sparkles } from "lucide-react";
import { useNavigate } from "react-router";
import { GlowCard } from "../GlowCard";

interface AnomalyEvent {
  id: number;
  date: string;
  title: string;
  percentage: string;
  type: "warning" | "danger";
  amount?: string;
}

const anomalyTimeline: AnomalyEvent[] = [
  {
    id: 1,
    date: "10 มี.ค. 2026",
    title: "ต้นทุนวัตถุดิบพุ่ง",
    percentage: "+18%",
    type: "danger",
    amount: "฿45,000",
  },
  {
    id: 3,
    date: "3 มี.ค. 2026",
    title: "ค่าขนส่งสูงผิดปกติ",
    percentage: "+25%",
    type: "danger",
    amount: "฿12,000",
  },
  {
    id: 4,
    date: "1 มี.ค. 2026",
    title: "ค่าบรรจุภัณฑ์เพิ่มขึ้น",
    percentage: "+8%",
    type: "warning",
    amount: "฿3,500",
  },
];

const aiExplanations = [
  {
    id: 1,
    icon: "",
    title: "ราคาน้ำมันปาล์มในตลาดโลกพุ่ง",
    description:
      "ราคาน้ำมันปาล์มดิบเพิ่มขึ้น 22% ในเดือนมีนาคม ส่งผลกระทบต่อต้นทุนวัตถุดิบโดยตรง",
    color: "orange",
  },


  {
    id: 4,
    icon: "",
    title: "ราคาน้ำมันดีเซลขึ้น",
    description:
      "ราคาน้ำมันดีเซลเพิ่มขึ้น 18% ส่งผลให้ค่าขนส่งและลอจิสติกส์สูงขึ้นตาม",
    color: "red",
  },
];

export function ExpenseAnomalyDetail() {
  const navigate = useNavigate();

  const getColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      orange: "from-orange-500/10 to-amber-500/10 border-orange-500/20",
      purple: "from-purple-500/10 to-pink-500/10 border-purple-500/20",
      blue: "from-blue-500/10 to-cyan-500/10 border-blue-500/20",
      red: "from-red-500/10 to-rose-500/10 border-red-500/20",
    };
    return colors[color] || colors.purple;
  };

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
          <h1 className="text-2xl text-glow-pink">Expense Anomaly</h1>
          <p className="text-sm text-muted-foreground">
            รายละเอียดค่าใช้จ่ายผิดปกติ
          </p>
        </div>
      </div>

      {/* Summary Alert */}
      <GlowCard className="p-5 bg-gradient-to-br from-red-500/10 to-orange-500/10 border-red-500/30 glow-pink-sm">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-6 h-6 text-red-400" />
          </div>
          <div className="flex-1">
            <h3 className="mb-2 text-red-400">พบความผิดปกติ 4 รายการ</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              ค่าใช้จ่ายเพิ่มขึ้นรวม{" "}
              <span className="text-red-400 font-medium">฿60,500</span> หรือ{" "}
              <span className="text-red-400 font-medium">+18.3%</span>{" "}
              จากเดือนที่แล้ว
            </p>
          </div>
        </div>
      </GlowCard>

      {/* Section 1 — Anomaly Timeline */}
      <div>
        <h3 className="mb-4 flex items-center gap-2">
           Timeline ความผิดปกติ
        </h3>
        <div className="space-y-3">
          {anomalyTimeline.map((event, index) => (
            <GlowCard
              key={event.id}
              className={`p-4 border-l-4 ${
                event.type === "danger"
                  ? "border-l-red-500 bg-red-500/5"
                  : "border-l-orange-500 bg-orange-500/5"
              } hover:glow-pink-sm transition-all`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-muted/50 text-muted-foreground">
                      {event.date}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        event.type === "danger"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-orange-500/20 text-orange-400"
                      }`}
                    >
                      {event.percentage}
                    </span>
                  </div>
                  <h4 className="mb-1">{event.title}</h4>
                  {event.amount && (
                    <p className="text-sm text-muted-foreground">
                      เพิ่มขึ้น{" "}
                      <span
                        className={
                          event.type === "danger"
                            ? "text-red-400"
                            : "text-orange-400"
                        }
                      >
                        {event.amount}
                      </span>
                    </p>
                  )}
                </div>
                <TrendingUp
                  className={`w-5 h-5 ${
                    event.type === "danger" ? "text-red-400" : "text-orange-400"
                  }`}
                />
              </div>
            </GlowCard>
          ))}
        </div>
      </div>

      {/* Section 2 — AI Explanation */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-pink-sm">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-glow-pink">สาเหตุที่เป็นไปได้</h3>
        </div>

        <div className="space-y-3">
          {aiExplanations.map((explanation) => (
            <GlowCard
              key={explanation.id}
              className={`p-4 bg-gradient-to-br ${getColorClasses(
                explanation.color
              )} hover:glow-pink-sm transition-all`}
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl flex-shrink-0">
                  {explanation.icon}
                </div>
                <div className="flex-1">
                  <h4 className="mb-2">{explanation.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {explanation.description}
                  </p>
                </div>
              </div>
            </GlowCard>
          ))}
        </div>
      </div>


    </div>
  );
}
