import { useState } from "react";
import { ArrowLeft, Plus, Search, Edit2, Trash2, Package } from "lucide-react";
import { GlowCard } from "../GlowCard";
import { Link } from "react-router";

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  costPerUnit: number;
  unit: string;
  supplier: string;
}

const mockInventory: InventoryItem[] = [
  {
    id: "1",
    name: "แป้งสาลี",
    category: "วัตถุดิบหลัก",
    costPerUnit: 45,
    unit: "กก.",
    supplier: "บริษัท A จำกัด",
  },
  {
    id: "2",
    name: "น้ำตาล",
    category: "วัตถุดิบหลัก",
    costPerUnit: 28,
    unit: "กก.",
    supplier: "บริษัท B จำกัด",
  },
  {
    id: "3",
    name: "เนย",
    category: "วัตถุดิบหลัก",
    costPerUnit: 180,
    unit: "กก.",
    supplier: "บริษัท C จำกัด",
  },
];

export function SettingsInventory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [inventory, setInventory] = useState(mockInventory);

  const filteredInventory = inventory.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-24">
      {/* Header */}
      <div>
        <Link to="/settings" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4">
          <ArrowLeft className="w-4 h-4" />
          กลับ
        </Link>
        <h1 className="mb-2">จัดการซัพพลาย</h1>
        <p className="text-muted-foreground">เพิ่ม แก้ไข หรือลบวัตถุดิบของธุรกิจ</p>
      </div>

      {/* Search and Add */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="ค้นหาวัตถุดิบ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-background/50 border border-border rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-gradient-to-r from-primary to-secondary text-white rounded-xl px-6 py-3 font-medium glow-pink-sm hover:opacity-90 transition-opacity flex items-center gap-2 whitespace-nowrap"
        >
          <Plus className="w-5 h-5" />
          เพิ่ม
        </button>
      </div>

      {/* Inventory List */}
      {filteredInventory.length === 0 ? (
        <GlowCard className="p-12 text-center">
          <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="mb-2 text-muted-foreground">ไม่พบวัตถุดิบ</h3>
          <p className="text-sm text-muted-foreground">
            {searchTerm ? "ลองค้นหาด้วยคำอื่น" : "เริ่มต้นด้วยการเพิ่มวัตถุดิบใหม่"}
          </p>
        </GlowCard>
      ) : (
        <div className="space-y-3">
          {filteredInventory.map((item) => (
            <GlowCard key={item.id} className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="mb-2">{item.name}</h3>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>หมวดหมู่: {item.category}</p>
                    <p>ต้นทุน: ฿{item.costPerUnit.toLocaleString()} / {item.unit}</p>
                    <p>ซัพพลายเออร์: {item.supplier}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="w-10 h-10 rounded-lg bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors">
                    <Edit2 className="w-4 h-4 text-primary" />
                  </button>
                  <button className="w-10 h-10 rounded-lg bg-red-500/10 hover:bg-red-500/20 flex items-center justify-center transition-colors">
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
            </GlowCard>
          ))}
        </div>
      )}

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
          <GlowCard className="w-full max-w-md bg-background p-6 space-y-5 animate-in slide-in-from-bottom">
            <div className="flex items-center justify-between">
              <h2 className="text-xl">เพิ่มวัตถุดิบใหม่</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">ชื่อวัตถุดิบ</label>
                <input
                  type="text"
                  className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                  placeholder="เช่น แป้งสาลี"
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">หมวดหมู่</label>
                <input
                  type="text"
                  className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                  placeholder="เช่น วัตถุดิบหลัก"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">ต้นทุนต่อหน่วย</label>
                  <input
                    type="number"
                    className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                    placeholder="45"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">หน่วย</label>
                  <input
                    type="text"
                    className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                    placeholder="กก."
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">ซัพพลายเออร์</label>
                <input
                  type="text"
                  className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                  placeholder="เช่น บริษัท A จำกัด"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 bg-background/50 border border-border rounded-xl py-3 font-medium hover:bg-background/70 transition-colors"
              >
                ยกเลิก
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 bg-gradient-to-r from-primary to-secondary text-white rounded-xl py-3 font-medium glow-pink-sm hover:opacity-90 transition-opacity"
              >
                เพิ่มวัตถุดิบ
              </button>
            </div>
          </GlowCard>
        </div>
      )}
    </div>
  );
}
