import { useState } from "react";
import { ArrowLeft, Building2, Mail, Phone, Globe, Lock, LogOut, Trash2 } from "lucide-react";
import { GlowCard } from "../GlowCard";
import { Link } from "react-router";

export function SettingsAccount() {
  const [companyName, setCompanyName] = useState("บริษัท ABC จำกัด");
  const [businessType, setBusinessType] = useState("ร้านค้าปลีก");
  const [email, setEmail] = useState("contact@abc.co.th");
  const [phone, setPhone] = useState("02-123-4567");
  const [currency, setCurrency] = useState("THB (บาท)");

  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-24">
      {/* Header */}
      <div>
        <Link to="/settings" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4">
          <ArrowLeft className="w-4 h-4" />
          กลับ
        </Link>
        <h1 className="mb-2">บัญชี</h1>
        <p className="text-muted-foreground">จัดการข้อมูลบริษัทและการตั้งค่าทั่วไป</p>
      </div>

      {/* Company Information */}
      <div>
        <h2 className="text-lg mb-4">ข้อมูลบริษัท</h2>
        <GlowCard className="p-6 space-y-5">
          <div>
            <label className="text-sm text-muted-foreground mb-2 block flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              ชื่อบริษัท
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div>
            <label className="text-sm text-muted-foreground mb-2 block flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              ประเภทธุรกิจ
            </label>
            <input
              type="text"
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div>
            <label className="text-sm text-muted-foreground mb-2 block flex items-center gap-2">
              <Mail className="w-4 h-4" />
              อีเมล
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div>
            <label className="text-sm text-muted-foreground mb-2 block flex items-center gap-2">
              <Phone className="w-4 h-4" />
              เบอร์โทร
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div>
            <label className="text-sm text-muted-foreground mb-2 block flex items-center gap-2">
              <Globe className="w-4 h-4" />
              สกุลเงิน
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
            >
              <option value="THB (บาท)">THB (บาท)</option>
              <option value="USD (ดอลลาร์)">USD (ดอลลาร์)</option>
              <option value="EUR (ยูโร)">EUR (ยูโร)</option>
            </select>
          </div>

          <button className="w-full bg-gradient-to-r from-primary to-secondary text-white rounded-xl py-3 font-medium glow-pink-sm hover:opacity-90 transition-opacity">
            บันทึกการเปลี่ยนแปลง
          </button>
        </GlowCard>
      </div>

      {/* Security */}
      <div>
        <h2 className="text-lg mb-4">ความปลอดภัย</h2>
        <GlowCard className="p-6 space-y-3">
          <button className="w-full flex items-center gap-3 p-4 rounded-xl bg-background/30 hover:bg-background/50 transition-colors text-left">
            <Lock className="w-5 h-5 text-primary" />
            <span className="flex-1">เปลี่ยนรหัสผ่าน</span>
          </button>

          <button className="w-full flex items-center gap-3 p-4 rounded-xl bg-background/30 hover:bg-background/50 transition-colors text-left">
            <LogOut className="w-5 h-5 text-yellow-500" />
            <span className="flex-1">ออกจากระบบ</span>
          </button>

          <button className="w-full flex items-center gap-3 p-4 rounded-xl bg-background/30 hover:bg-red-500/10 transition-colors text-left border border-transparent hover:border-red-500/30">
            <Trash2 className="w-5 h-5 text-red-500" />
            <span className="flex-1 text-red-500">ลบบัญชี</span>
          </button>
        </GlowCard>
      </div>
    </div>
  );
}
