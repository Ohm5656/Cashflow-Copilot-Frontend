import { useState, useEffect } from "react";
import { X, ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface TourStep {
  id: number;
  title: string;
  description: string;
  targetSelector?: string;
  position?: "top" | "bottom" | "left" | "right" | "center";
}

const tourSteps: TourStep[] = [
  {
    id: 1,
    title: "ยินดีต้อนรับสู่ Cashflow Copilot AI! 🎉",
    description:
      "แอสซิสแทนต์ทางการเงินที่ขับเคลื่อนด้วย AI เพื่อช่วยให้ธุรกิจของคุณเติบโตอย่างมั่นคง มาเริ่มต้นเรียนรู้ฟีเจอร์หลักกันเลย",
    position: "center",
  },
  {
    id: 2,
    title: "AI Risk Score - ตัววัดสุขภาพธุรกิจ",
    description:
      "คะแนนนี้แสดงความเสี่ยงของธุรกิจคุณในระดับ 0-100 คำนวณจาก AI จากกระแสเงินสด สินค้าคงคลัง และแนวโน้มการเติบโต",
    targetSelector: "[data-tour='risk-score']",
    position: "bottom",
  },
  {
    id: 3,
    title: "กราฟกำไรย้อนหลัง 3 เดือน",
    description:
      "ดูภาพรวมรายรับ รายจ่าย และกำไรสุทธิ AI จะช่วยวิเคราะห์แนวโน้มและให้คำแนะนำเชิงลึก",
    targetSelector: "[data-tour='profit-chart']",
    position: "top",
  },
  {
    id: 4,
    title: "สินค้าที่ทำให้เงินจม / สินค้ากำไรสูง",
    description:
      "คลิกดูรายละเอียดสินค้าแต่ละตัว AI จะบอกว่าสินค้าไหนจมเงิน สินค้าไหนทำกำไรได้ดี พร้อมคำแนะนำการจัดการสต็อก",
    targetSelector: "[data-tour='material-cards']",
    position: "top",
  },
  {
    id: 5,
    title: "เมนูซัพพลาย - เปรียบเทียบราคา",
    description:
      "ดูราคาวัตถุดิบแต่ละรายการ เปรียบเทียบซัพพลายเออร์ และติดตามการขึ้นลงของราคาแบบเรียลไทม์",
    targetSelector: "[data-tour='nav-suppliers']",
    position: "bottom",
  },
  {
    id: 6,
    title: "ตั้งค่าและนำเข้าข้อมูล",
    description:
      "อัปโหลด Statement, Invoice, Bills และข้อมูลยอดขาย AI จะช่วยวิเคราะห์และสร้างรายงานให้คุณอัตโนมัติ เริ่มต้นใช้งานได้เลย!",
    targetSelector: "[data-tour='nav-settings']",
    position: "top",
  },
];

interface ProductTourProps {
  onComplete: () => void;
}

export function ProductTour({ onComplete }: ProductTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetPosition, setTargetPosition] = useState<DOMRect | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  const step = tourSteps[currentStep];

  useEffect(() => {
    if (step.targetSelector) {
      const element = document.querySelector(step.targetSelector);
      if (element) {
        const rect = element.getBoundingClientRect();
        setTargetPosition(rect);
        
        // Smooth scroll to element
        element.scrollIntoView({ 
          behavior: "smooth", 
          block: "center",
          inline: "center"
        });
      }
    } else {
      setTargetPosition(null);
    }
  }, [currentStep, step.targetSelector]);

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
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

  const getTooltipPosition = () => {
    if (!targetPosition || !step.position) {
      // Center position for welcome screen
      return {
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      };
    }

    const padding = 20;
    const arrowSize = 12;

    switch (step.position) {
      case "bottom":
        return {
          top: `${targetPosition.bottom + padding}px`,
          left: `${targetPosition.left + targetPosition.width / 2}px`,
          transform: "translateX(-50%)",
        };
      case "top":
        return {
          top: `${targetPosition.top - padding}px`,
          left: `${targetPosition.left + targetPosition.width / 2}px`,
          transform: "translate(-50%, -100%)",
        };
      case "left":
        return {
          top: `${targetPosition.top + targetPosition.height / 2}px`,
          left: `${targetPosition.left - padding}px`,
          transform: "translate(-100%, -50%)",
        };
      case "right":
        return {
          top: `${targetPosition.top + targetPosition.height / 2}px`,
          left: `${targetPosition.right + padding}px`,
          transform: "translateY(-50%)",
        };
      default:
        return {
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        };
    }
  };

  const getArrowPosition = () => {
    if (!targetPosition || !step.position) return null;

    const arrowSize = 12;

    switch (step.position) {
      case "bottom":
        return {
          top: "-6px",
          left: "50%",
          transform: "translateX(-50%) rotate(45deg)",
        };
      case "top":
        return {
          bottom: "-6px",
          left: "50%",
          transform: "translateX(-50%) rotate(45deg)",
        };
      case "left":
        return {
          top: "50%",
          right: "-6px",
          transform: "translateY(-50%) rotate(45deg)",
        };
      case "right":
        return {
          top: "50%",
          left: "-6px",
          transform: "translateY(-50%) rotate(45deg)",
        };
      default:
        return null;
    }
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50">
        {/* Dark Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={handleSkip}
        />

        {/* Spotlight Highlight */}
        {targetPosition && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute pointer-events-none"
            style={{
              top: `${targetPosition.top - 8}px`,
              left: `${targetPosition.left - 8}px`,
              width: `${targetPosition.width + 16}px`,
              height: `${targetPosition.height + 16}px`,
              boxShadow: `0 0 0 4px rgba(var(--color-primary), 0.5),
                          0 0 0 9999px rgba(0, 0, 0, 0.7)`,
              borderRadius: "12px",
              transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />
        )}

        {/* Tooltip Card */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          className="absolute w-[90vw] max-w-md"
          style={getTooltipPosition()}
        >
          {/* Arrow */}
          {getArrowPosition() && (
            <div
              className="absolute w-3 h-3 bg-card border-l border-t border-primary/20"
              style={getArrowPosition()}
            />
          )}

          {/* Card Content */}
          <div className="relative bg-card/95 backdrop-blur-xl border border-primary/30 rounded-2xl p-6 shadow-2xl glow-pink-md">
            {/* Close Button */}
            <button
              onClick={handleSkip}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-muted/20 hover:bg-muted/40 transition-colors"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>

            {/* Step Indicator */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary glow-pink-sm">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="flex gap-1">
                {tourSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 rounded-full transition-all ${
                      index === currentStep
                        ? "w-6 bg-primary"
                        : index < currentStep
                        ? "w-4 bg-primary/50"
                        : "w-4 bg-muted/30"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground ml-auto">
                {currentStep + 1}/{tourSteps.length}
              </span>
            </div>

            {/* Content */}
            <div className="space-y-3 mb-6">
              <h3 className="text-xl text-glow-pink">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-3">
              {currentStep > 0 && (
                <button
                  onClick={handleBack}
                  className="flex-1 py-3 px-4 border border-muted/30 rounded-xl hover:bg-muted/10 transition-all flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>ย้อนกลับ</span>
                </button>
              )}

              <button
                onClick={currentStep === 0 ? handleSkip : handleNext}
                className={`${
                  currentStep === 0 ? "flex-1" : "flex-[2]"
                } py-3 px-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-lg hover:shadow-primary/50 transition-all glow-pink-sm flex items-center justify-center gap-2 font-medium`}
              >
                <span>
                  {currentStep === 0
                    ? "เริ่มทัวร์"
                    : currentStep === tourSteps.length - 1
                    ? "เสร็จสิ้น"
                    : "ถัดไป"}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {currentStep === 0 && (
                <button
                  onClick={handleSkip}
                  className="px-4 py-3 text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  ข้าม
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
