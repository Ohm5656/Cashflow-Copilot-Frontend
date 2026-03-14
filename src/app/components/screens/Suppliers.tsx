import { TrendingUp, TrendingDown, ChevronRight } from "lucide-react";
import { GlowCard } from "../GlowCard";
import { useNavigate } from "react-router";

interface Material {
  id: string;
  name: string;
  currentPrice: number;
  change: number;
}

const materials: Material[] = [
  { id: "material-a", name: "วัตถุดิบ A", currentPrice: 120, change: 11.1 },
  { id: "material-b", name: "วัตถุดิบ B", currentPrice: 95, change: -3.1 },
  { id: "material-c", name: "วัตถุดิบ C", currentPrice: 210, change: 1.9 },
  { id: "material-d", name: "วัตถุดิบ D", currentPrice: 60, change: 5.3 },
  { id: "material-e", name: "วัตถุดิบ E", currentPrice: 140, change: -0.7 },
  { id: "material-f", name: "วัตถุดิบ F", currentPrice: 80, change: 3.9 },
];

export function Suppliers() {
  const navigate = useNavigate();

  const handleMaterialClick = (materialId: string) => {
    navigate(`/suppliers/${materialId}`);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <h1 className="mb-2">ติดตามราคาซัพพลาย</h1>
        <p className="text-muted-foreground">วัตถุดิบที่ใช้ในธุรกิจ</p>
      </div>

      {/* Material Watchlist */}
      <div className="space-y-3">
        {materials.map((material) => {
          const isPositive = material.change > 0;

          return (
            <GlowCard
              key={material.id}
              onClick={() => handleMaterialClick(material.id)}
              className="p-4 cursor-pointer hover:border-primary/30 hover:glow-pink-sm transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div
                    className={`w-1.5 h-14 rounded-full ${
                      isPositive ? "bg-red-400 glow-red-sm" : "bg-green-400 glow-green-sm"
                    }`}
                  />
                  <div className="flex-1">
                    <h3 className="mb-1">{material.name}</h3>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl text-glow-pink">
                        ฿{material.currentPrice}
                      </span>
                      <div
                        className={`flex items-center gap-1 text-sm ${
                          isPositive ? "text-red-400" : "text-green-400"
                        }`}
                      >
                        {isPositive ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
                        <span>
                          {isPositive ? "+" : ""}
                          {material.change}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </GlowCard>
          );
        })}
      </div>

      {/* Info Text */}
      <p className="text-sm text-muted-foreground text-center pt-4">
        แตะที่วัตถุดิบเพื่อดูรายละเอียดราคา
      </p>
    </div>
  );
}
