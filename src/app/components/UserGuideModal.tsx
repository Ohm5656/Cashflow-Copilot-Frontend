import { useState } from "react";
import { X, BarChart3, Package, Wallet, Activity, Settings, ChevronRight } from "lucide-react";
import { GlowCard } from "./GlowCard";

interface Slide {
  title: string;
  subtitle?: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const slides: Slide[] = [
  {
    title: "คู่มือการใช้งาน Cashflow Copilot AI",
    subtitle: "ผู้ช่วย AI สำหรับบริหารเงินสดธุรกิจอย่างชาญฉลาด",
    description: "ยินดีต้อนรับสู่ Cashflow Copilot AI ระบบที่ช่วยให้คุณเข้าใจสถานะการเงินของธุรกิจได้ง่ายขึ้น",
    icon: Activity,
  },
  {
    title: "หน้า วิเคราะห์",
    description: "ดู AI Risk Score สุขภาพทางการเงิน ค่าใช้จ่ายผิดปกติ และข้อมูลเชิงลึกของธุรกิจ",
    icon: BarChart3,
  },
  {
    title: "หน้า ซัพพลาย",
    description: "จัดการวัตถุดิบ ต้นทุน และข้อมูลสินค้าที่มีผลต่อกำไรและเงินจม",
    icon: Package,
  },
  {
    title: "หน้า เงินสด",
    description: "ติดตาม Cash Runway เงินสดจริงปัจจุบัน วันที่เงินสดจะหมด และตรวจสอบความถูกต้องกับ statement",
    icon: Wallet,
  },
  {
    title: "หน้า ทดลอง",
    description: "จำลองสถานการณ์เมื่อยอดขายหรือค่าใช้จ่ายเปลี่ยน เพื่อดูว่า cash flow และ runway จะเปลี่ยนอย่างไร",
    icon: Activity,
  },
  {
    title: "หน้า ตั้งค่า",
    description: "จัดการข้อมูลบริษัท อัปโหลด statement และตั้งค่าระบบทั้งหมดในที่เดียว",
    icon: Settings,
  },
];

interface UserGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UserGuideModal({ isOpen, onClose }: UserGuideModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onClose();
    }
  };

  const handleSkip = () => {
    onClose();
    setCurrentSlide(0);
  };

  const slide = slides[currentSlide];
  const Icon = slide.icon;
  const isFirstSlide = currentSlide === 0;
  const isLastSlide = currentSlide === slides.length - 1;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <GlowCard className="bg-gradient-to-br from-background to-background/80 p-8 relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-background/50 hover:bg-background flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Content */}
          <div className="text-center space-y-6">
            {/* Icon */}
            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-pink-sm">
              <Icon className="w-10 h-10 text-white" />
            </div>

            {/* Title */}
            <div>
              <h2 className="text-2xl mb-2 text-glow-pink">{slide.title}</h2>
              {slide.subtitle && (
                <p className="text-sm text-primary mb-3">{slide.subtitle}</p>
              )}
              <p className="text-muted-foreground leading-relaxed">{slide.description}</p>
            </div>

            {/* Progress Dots */}
            <div className="flex items-center justify-center gap-2 py-4">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentSlide
                      ? "w-8 bg-primary glow-pink-sm"
                      : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                />
              ))}
            </div>

            {/* Progress Text */}
            <p className="text-sm text-muted-foreground">
              {currentSlide + 1} / {slides.length}
            </p>

            {/* Navigation Buttons */}
            <div className="flex gap-3 pt-4">
              {!isLastSlide && (
                <button
                  onClick={handleSkip}
                  className="flex-1 bg-background/50 border border-border rounded-xl py-3 font-medium hover:bg-background/70 transition-colors"
                >
                  ข้าม
                </button>
              )}
              <button
                onClick={handleNext}
                className="flex-1 bg-gradient-to-r from-primary to-secondary text-white rounded-xl py-3 font-medium glow-pink-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                {isLastSlide ? "เริ่มใช้งาน" : "ถัดไป"}
                {!isLastSlide && <ChevronRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </GlowCard>
      </div>
    </div>
  );
}
