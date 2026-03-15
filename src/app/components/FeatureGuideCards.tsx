import { useState } from "react";
import {
  X,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  Upload,
  TrendingUp,
  Package,
  Wallet,
  Activity,
  AlertTriangle,
  Settings as SettingsIcon,
  FileText,
  ArrowDownCircle,
  ArrowUpCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface FeatureGuideCardsProps {
  onComplete: () => void;
}

const featureCards = [
  {
    id: 1,
    icon: Sparkles,
    title: "ยินดีต้อนรับสู่ FlowCast",
    description:
      "ระบบ AI Financial Assistant ที่จะช่วยวิเคราะห์สุขภาพการเงินของธุรกิจ SME ของคุณ",
    features: [
      "วิเคราะห์ความเสี่ยงทางการเงินอัตโนมัติด้วย AI",
      "ติดตามราคาวัตถุดิบและแจ้งเตือนความผิดปกติ",
      "คำนวณ Cash Runway และจำลองสถานการณ์ธุรกิจ",
      "ข้อมูลเชิงลึกและคำแนะนำเฉพาะสำหรับธุรกิจคุณ",
    ],
    color: "from-pink-500 to-fuchsia-500",
    bgColor: "from-pink-500/20 to-fuchsia-500/20",
  },
  {
    id: 2,
    icon: Upload,
    title: "เริ่มต้นด้วยการอัปโหลด Bank Statement",
    description: "สำคัญมาก! เพื่อให้ AI วิเคราะห์ได้แม่นยำที่สุด",
    features: [
      "อัปโหลด Bank Statement ย้อนหลัง 1 ปี",
      "ระบบจะวิเคราะห์ธุรกรรม รายรับ-รายจ่าย",
      "อัปเดต Statement ทุกเดือนเพื่อข้อมูลที่เป็นปัจจุบัน",
      "ข้อมูลของคุณปลอดภัย เข้ารหัสและเก็บอย่างมั่นคง",
    ],
    color: "from-purple-500 to-violet-600",
    bgColor: "from-purple-500/20 to-violet-600/20",
    highlight: true,
  },
  {
    id: 3,
    icon: ArrowDownCircle,
    title: "อัปโหลดบิลเงินเข้าบริษัท",
    description: "บันทึกรายรับของธุรกิจ เพื่อให้ระบบวิเคราะห์กระแสเงินสดได้ครบถ้วน",
    features: [
      "อัปโหลดบิล / ใบเสร็จ / หลักฐานเงินเข้าจากลูกค้า",
      "ใช้สำหรับวิเคราะห์รายรับจริงของบริษัท",
      "ช่วยให้ AI แยกเงินเข้าปกติและเงินเข้าผิดปกติได้แม่นขึ้น",
      "ยิ่งข้อมูลรายรับครบ การคาดการณ์ Cash Runway จะยิ่งแม่นยำ",
    ],
    color: "from-emerald-500 to-green-600",
    bgColor: "from-emerald-500/20 to-green-600/20",
    highlight: true,
  },
  {
    id: 4,
    icon: ArrowUpCircle,
    title: "อัปโหลดบิลเงินออกบริษัท",
    description:
      "บันทึกรายจ่ายของธุรกิจ เช่น ค่าวัตถุดิบ ค่าไฟ ค่าขนส่ง และค่าใช้จ่ายอื่น ๆ",
    features: [
      "อัปโหลดบิล / ใบกำกับภาษี / ใบเสร็จค่าใช้จ่าย",
      "ใช้วิเคราะห์ต้นทุนจริงและค่าใช้จ่ายรายเดือน",
      "ช่วยให้ AI ตรวจจับค่าใช้จ่ายผิดปกติได้แม่นขึ้น",
      "จำเป็นต่อการคำนวณกำไร ขาดทุน และการเตือนความเสี่ยงทางการเงิน",
    ],
    color: "from-rose-500 to-red-500",
    bgColor: "from-rose-500/20 to-red-500/20",
    highlight: true,
  },
 
  {
    id: 9,
    icon: SettingsIcon,
    title: "หน้า Settings",
    description: "จัดการข้อมูลธุรกิจและการตั้งค่า",
    features: [
      "บัญชีบริษัท - แก้ไขข้อมูลธุรกิจ",
      "นำเข้าข้อมูล - อัปโหลด Statement และข้อมูล",
      "จัดการสินค้าคงคลัง - วัตถุดิบและสินค้า",
      "เปลี่ยนธีมสี - ปรับหน้าตาแอปตามใจชอบ",
    ],
    color: "from-indigo-500 to-purple-600",
    bgColor: "from-indigo-500/20 to-purple-600/20",
  },
  
  {
    id: 11,
    icon: CheckCircle2,
    title: "พร้อมเริ่มต้นแล้ว!",
    description:
      "อย่าลืมอัปโหลด Statement และบิลรับ-จ่าย เพื่อให้ AI วิเคราะห์ได้อย่างแม่นยำ",
    features: [
      "ไปที่ ตั้งค่า → นำเข้าข้อมูล",
      "อัปโหลด Bank Statement ย้อนหลัง 1 ปี",
      "อัปโหลดบิลเงินเข้าบริษัท และบิลเงินออกบริษัท",
      "เริ่มใช้งาน FlowCast AI ได้เต็มประสิทธิภาพ!",
    ],
    color: "from-pink-500 to-fuchsia-500",
    bgColor: "from-pink-500/20 to-fuchsia-500/20",
  },
];

export function FeatureGuideCards({
  onComplete,
}: FeatureGuideCardsProps) {
  const [currentCard, setCurrentCard] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const card = featureCards[currentCard];
  const Icon = card.icon;

  const handleNext = () => {
    if (currentCard < featureCards.length - 1) {
      setCurrentCard(currentCard + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = () => {
    setIsVisible(false);
    setTimeout(() => {
      onComplete();
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        <motion.div
          key={currentCard}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden z-10"
        >
          <div className="relative bg-gradient-to-br from-card/98 to-card/95 backdrop-blur-xl border-2 border-primary/40 rounded-3xl shadow-2xl overflow-hidden">
            <div
              className={`absolute inset-0 bg-gradient-to-br ${card.bgColor} blur-2xl opacity-50 -z-10 pointer-events-none`}
            />

            <button
              onClick={handleSkip}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-muted/30 hover:bg-muted/50 transition-colors z-10 backdrop-blur-sm border border-border/30"
              type="button"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>

            <div
              className={`bg-gradient-to-r ${card.color} p-8 pb-12 relative overflow-hidden`}
            >
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl" />
              </div>

              <div className="flex justify-center mb-4 relative">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center shadow-xl"
                >
                  <Icon className="w-10 h-10 text-white" />
                </motion.div>
              </div>

              <div className="text-center relative">
                <h2 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
                  {card.title}
                </h2>
                <p className="text-white/90 text-sm leading-relaxed max-w-xl mx-auto">
                  {card.description}
                </p>
              </div>

              <div className="flex items-center justify-center gap-2 mt-6 relative">
                {featureCards.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 rounded-full transition-all ${
                      index === currentCard
                        ? "w-8 bg-white shadow-lg"
                        : index < currentCard
                        ? "w-2 bg-white/70"
                        : "w-2 bg-white/30"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="p-8 overflow-y-auto max-h-[calc(90vh-400px)]">
              <div className="space-y-4">
                {card.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className={`flex items-start gap-4 p-4 rounded-xl transition-all ${
                      card.highlight
                        ? "bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/20 hover:border-primary/40"
                        : "bg-muted/20 border border-muted/30 hover:bg-muted/30"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center flex-shrink-0 shadow-md`}
                    >
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-sm leading-relaxed pt-1">{feature}</p>
                  </motion.div>
                ))}
              </div>

              {card.id === 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6 p-5 bg-gradient-to-br from-primary/20 via-secondary/20 to-blue-500/20 border-2 border-primary/30 rounded-2xl backdrop-blur-sm"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <FileText className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm mb-1 bg-gradient-to-r from-primary via-secondary to-blue-400 bg-clip-text text-transparent">
                        วิธีอัปโหลด Bank Statement
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        ไปที่เมนู{" "}
                        <span className="text-foreground font-medium">
                          ตั้งค่า
                        </span>{" "}
                        →
                        <span className="text-foreground font-medium">
                          {" "}
                          นำเข้าข้อมูล
                        </span>{" "}
                        → คลิก{" "}
                        <span className="text-foreground font-medium">
                          อัปโหลด Statement
                        </span>
                        <br />
                        รองรับไฟล์ PDF, CSV, Excel
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {card.id === 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6 p-5 bg-gradient-to-br from-emerald-500/20 via-green-500/20 to-teal-500/20 border-2 border-emerald-500/30 rounded-2xl backdrop-blur-sm"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <ArrowDownCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm mb-1 text-emerald-400">
                        ตัวอย่างข้อมูลเงินเข้าบริษัท
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        เช่น ใบเสร็จจากลูกค้า, หลักฐานโอนเงินเข้า, รายการขาย,
                        รายรับจากคำสั่งซื้อ
                        <br />
                        ข้อมูลนี้ช่วยให้ AI วิเคราะห์รายรับจริงและแนวโน้มรายได้ได้แม่นขึ้น
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {card.id === 4 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6 p-5 bg-gradient-to-br from-rose-500/20 via-red-500/20 to-orange-500/20 border-2 border-rose-500/30 rounded-2xl backdrop-blur-sm"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <ArrowUpCircle className="w-6 h-6 text-rose-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm mb-1 text-rose-400">
                        ตัวอย่างข้อมูลเงินออกบริษัท
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        เช่น บิลค่าวัตถุดิบ, ค่าไฟ, ค่าขนส่ง, ค่าแรง, ค่าเช่า,
                        หรือค่าใช้จ่ายดำเนินงานอื่น ๆ
                        <br />
                        ข้อมูลนี้ช่วยให้ AI ตรวจจับต้นทุนผิดปกติและคำนวณกำไรขาดทุนได้ครบขึ้น
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="border-t border-border/50 bg-card/50 backdrop-blur-sm p-6">
              <div className="flex items-center justify-between gap-4">
                <div className="text-sm text-muted-foreground font-medium">
                  {currentCard + 1} / {featureCards.length}
                </div>

                <div className="flex gap-3 flex-1 justify-end">
                  {currentCard > 0 && (
                    <button
                      onClick={handleBack}
                      className="px-5 py-3 border border-muted/40 rounded-xl hover:bg-muted/20 hover:border-primary/30 transition-all flex items-center gap-2 text-sm font-medium"
                      type="button"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      ย้อนกลับ
                    </button>
                  )}

                  <button
                    onClick={handleNext}
                    className={`px-6 py-3 bg-gradient-to-r ${card.color} text-white rounded-xl hover:shadow-xl hover:shadow-primary/50 transition-all flex items-center gap-2 font-medium relative overflow-hidden group`}
                    type="button"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    <span className="relative text-sm">
                      {currentCard === featureCards.length - 1
                        ? "เริ่มใช้งาน"
                        : "ถัดไป"}
                    </span>
                    <ArrowRight className="w-4 h-4 relative" />
                  </button>

                  {currentCard === 0 && (
                    <button
                      onClick={handleSkip}
                      className="px-4 py-3 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
                      type="button"
                    >
                      ข้าม
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}