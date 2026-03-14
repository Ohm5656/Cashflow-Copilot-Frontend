import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowRight, Sparkles, Building, DollarSign, Package } from "lucide-react";
import { GlowCard } from "../GlowCard";

interface Material {
  name: string;
  supplier: string;
  avgPrice: string;
  frequency: string;
}

export function Signup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // Step 1 - Business Info
  const [companyName, setCompanyName] = useState("");
  const [businessType, setBusinessType] = useState("");

  // Step 2 - Cash Info
  const [currentCash, setCurrentCash] = useState("");

  // Step 3 - Materials
  const [materials, setMaterials] = useState<Material[]>([
    { name: "", supplier: "", avgPrice: "", frequency: "" }
  ]);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Complete signup
      navigate("/");
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate("/login");
    }
  };

  const addMaterial = () => {
    setMaterials([...materials, { name: "", supplier: "", avgPrice: "", frequency: "" }]);
  };

  const removeMaterial = (index: number) => {
    if (materials.length > 1) {
      setMaterials(materials.filter((_, i) => i !== index));
    }
  };

  const updateMaterial = (index: number, field: keyof Material, value: string) => {
    const updated = [...materials];
    updated[index][field] = value;
    setMaterials(updated);
  };

  const canProceed = () => {
    if (step === 1) return companyName && businessType;
    if (step === 2) return currentCash;
    if (step === 3) return materials.some(m => m.name && m.supplier);
    return false;
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-background via-background to-primary/5 py-8">
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary glow-pink-sm mb-3">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl mb-1 text-glow-pink">สมัครสมาชิก</h1>
          <p className="text-sm text-muted-foreground">เริ่มต้นใช้งาน Cashflow Copilot</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all ${
                s === step
                  ? "w-8 bg-gradient-to-r from-primary to-secondary glow-pink-sm"
                  : s < step
                  ? "w-6 bg-primary/50"
                  : "w-6 bg-muted/30"
              }`}
            />
          ))}
        </div>

        {/* Step Content */}
        <GlowCard className="p-6 border-primary/20 glow-pink-sm">
          {/* Step 1 - Business Info */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <Building className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg">ข้อมูลธุรกิจ</h2>
                  <p className="text-xs text-muted-foreground">Step 1 of 3</p>
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2">ชื่อบริษัท</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-4 py-3 bg-muted/30 border border-muted/50 rounded-xl focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="ชื่อบริษัท / ร้านค้า"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">ประเภทธุรกิจ</label>
                <select
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  className="w-full px-4 py-3 bg-muted/30 border border-muted/50 rounded-xl focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                >
                  <option value="">เลือกประเภทธุรกิจ</option>
                  <option value="retail">ค้าปลีก</option>
                  <option value="wholesale">ค้าส่ง</option>
                  <option value="manufacturing">ผลิต</option>
                  <option value="food">อาหารและเครื่องดื่ม</option>
                  <option value="service">บริการ</option>
                  <option value="other">อื่นๆ</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 2 - Cash Info */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg">เงินสดปัจจุบัน</h2>
                  <p className="text-xs text-muted-foreground">Step 2 of 3</p>
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2">เงินสดในบัญชีตอนนี้ (บาท)</label>
                <input
                  type="number"
                  value={currentCash}
                  onChange={(e) => setCurrentCash(e.target.value)}
                  className="w-full px-4 py-3 bg-muted/30 border border-muted/50 rounded-xl focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="0.00"
                />
              </div>

              <div className="bg-primary/5 border border-primary/10 rounded-xl p-4">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  💡 ข้อมูลนี้จะถูกใช้ในการคำนวณ Cash Runway เริ่มต้น เพื่อช่วยให้คุณทราบว่าธุรกิจสามารถดำเนินการต่อไปได้อีกกี่วัน
                </p>
              </div>
            </div>
          )}

          {/* Step 3 - Materials */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <Package className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg">วัตถุดิบหลัก</h2>
                  <p className="text-xs text-muted-foreground">Step 3 of 3</p>
                </div>
              </div>

              <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {materials.map((material, index) => (
                  <div key={index} className="bg-muted/20 rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-muted-foreground">วัตถุดิบ #{index + 1}</p>
                      {materials.length > 1 && (
                        <button
                          onClick={() => removeMaterial(index)}
                          className="text-xs text-red-400 hover:text-red-300"
                        >
                          ลบ
                        </button>
                      )}
                    </div>

                    <input
                      type="text"
                      value={material.name}
                      onChange={(e) => updateMaterial(index, "name", e.target.value)}
                      className="w-full px-3 py-2 bg-background/50 border border-muted/50 rounded-lg text-sm focus:outline-none focus:border-primary/50"
                      placeholder="ชื่อวัตถุดิบ"
                    />

                    <input
                      type="text"
                      value={material.supplier}
                      onChange={(e) => updateMaterial(index, "supplier", e.target.value)}
                      className="w-full px-3 py-2 bg-background/50 border border-muted/50 rounded-lg text-sm focus:outline-none focus:border-primary/50"
                      placeholder="ซัพพลายเออร์"
                    />

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={material.avgPrice}
                        onChange={(e) => updateMaterial(index, "avgPrice", e.target.value)}
                        className="w-full px-3 py-2 bg-background/50 border border-muted/50 rounded-lg text-sm focus:outline-none focus:border-primary/50"
                        placeholder="ราคาเฉลี่ย"
                      />
                      <input
                        type="text"
                        value={material.frequency}
                        onChange={(e) => updateMaterial(index, "frequency", e.target.value)}
                        className="w-full px-3 py-2 bg-background/50 border border-muted/50 rounded-lg text-sm focus:outline-none focus:border-primary/50"
                        placeholder="ความถี่ (เช่น รายสัปดาห์)"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={addMaterial}
                className="w-full py-2 border border-dashed border-primary/30 text-primary rounded-xl hover:bg-primary/5 transition-all text-sm"
              >
                + เพิ่มวัตถุดิบ
              </button>

              <div className="bg-primary/5 border border-primary/10 rounded-xl p-4">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  💡 คุณสามารถเพิ่มหรือแก้ไขวัตถุดิบได้ในภายหลังที่หน้าตั้งค่า
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-3 mt-8">
            <button
              onClick={handleBack}
              className="flex-1 py-3 border border-muted/30 text-muted-foreground rounded-xl hover:bg-muted/10 transition-all"
            >
              {step === 1 ? "กลับ" : "ย้อนกลับ"}
            </button>
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex-1 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-lg hover:shadow-primary/50 transition-all glow-pink-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {step === 3 ? "เสร็จสิ้น" : "ถัดไป"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </GlowCard>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            มีบัญชีอยู่แล้ว?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-primary hover:underline"
            >
              เข้าสู่ระบบ
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
