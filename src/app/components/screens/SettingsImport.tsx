import { useState } from "react";
import { ArrowLeft, Upload, FileText, CheckCircle2, X } from "lucide-react";
import { GlowCard } from "../GlowCard";
import { Link } from "react-router";

interface UploadSection {
  id: string;
  title: string;
  description: string;
  acceptedFormats: string;
}

const uploadSections: UploadSection[] = [
  {
    id: "bank-statement",
    title: "Bank Statement",
    description: "ใช้คำนวณยอดเงินจริงปัจจุบันจากบัญชีธนาคาร",
    acceptedFormats: "PDF, Excel, CSV",
  },
  {
    id: "invoices",
    title: "Invoice / Bills",
    description: "ใช้คาดการณ์เงินเข้าออกจากบิลนำเข้าและส่งออก",
    acceptedFormats: "PDF, Excel, CSV",
  },
  {
    id: "sales-data",
    title: "Sales Data",
    description: "ใช้วิเคราะห์แนวโน้มยอดขายและคำนวณ cash flow",
    acceptedFormats: "Excel, CSV",
  },
];

export function SettingsImport() {
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: File | null }>({});
  const [uploadSuccess, setUploadSuccess] = useState<{ [key: string]: boolean }>({});

  const handleFileUpload = (sectionId: string, file: File) => {
    setUploadedFiles((prev) => ({ ...prev, [sectionId]: file }));
    // Simulate upload success
    setTimeout(() => {
      setUploadSuccess((prev) => ({ ...prev, [sectionId]: true }));
    }, 1000);
  };

  const removeFile = (sectionId: string) => {
    setUploadedFiles((prev) => ({ ...prev, [sectionId]: null }));
    setUploadSuccess((prev) => ({ ...prev, [sectionId]: false }));
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-24">
      {/* Header */}
      <div>
        <Link to="/settings" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4">
          <ArrowLeft className="w-4 h-4" />
          กลับ
        </Link>
        <h1 className="mb-2">นำเข้าข้อมูล</h1>
        <p className="text-muted-foreground">อัปโหลดข้อมูลการเงินเพื่อให้ระบบวิเคราะห์แม่นยำขึ้น</p>
      </div>

      {/* Upload Sections */}
      <div className="space-y-5">
        {uploadSections.map((section) => {
          const file = uploadedFiles[section.id];
          const isSuccess = uploadSuccess[section.id];

          return (
            <GlowCard key={section.id} className="p-6">
              <div className="mb-4">
                <h3 className="mb-2">{section.title}</h3>
                <p className="text-sm text-muted-foreground mb-1">{section.description}</p>
                <p className="text-xs text-muted-foreground">รองรับ: {section.acceptedFormats}</p>
              </div>

              {/* Upload Area */}
              {!file ? (
                <label
                  htmlFor={`file-${section.id}`}
                  className="block border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all group"
                >
                  <input
                    id={`file-${section.id}`}
                    type="file"
                    accept=".pdf,.xlsx,.xls,.csv"
                    className="hidden"
                    onChange={(e) => {
                      const selectedFile = e.target.files?.[0];
                      if (selectedFile) {
                        handleFileUpload(section.id, selectedFile);
                      }
                    }}
                  />
                  <Upload className="w-12 h-12 mx-auto mb-3 text-muted-foreground group-hover:text-primary transition-colors" />
                  <p className="text-sm mb-1">อัปโหลดไฟล์</p>
                  <p className="text-xs text-muted-foreground">
                    ลากไฟล์มาวาง หรือคลิกเพื่อเลือกไฟล์
                  </p>
                </label>
              ) : (
                <div
                  className={`border-2 rounded-xl p-5 flex items-center gap-4 ${
                    isSuccess
                      ? "border-green-500/50 bg-green-500/10"
                      : "border-primary/50 bg-primary/10"
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center flex-shrink-0">
                    {isSuccess ? (
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                    ) : (
                      <FileText className="w-6 h-6 text-primary" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024).toFixed(2)} KB
                      {isSuccess && " • อัปโหลดสำเร็จ"}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFile(section.id)}
                    className="w-8 h-8 rounded-lg bg-background hover:bg-red-500/20 flex items-center justify-center transition-colors flex-shrink-0"
                  >
                    <X className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              )}
            </GlowCard>
          );
        })}
      </div>

      {/* Info Card */}
      <GlowCard className="p-5 bg-primary/5 border-primary/30">
        <p className="text-sm text-muted-foreground">
          💡 <strong>หมายเหตุ:</strong> ข้อมูลที่อัปโหลดจะถูกเข้ารหัสและเก็บอย่างปลอดภัย
          ระบบจะใช้ข้อมูลเพื่อวิเคราะห์และคาดการณ์กระแสเงินสดให้แม่นยำยิ่งขึ้น
        </p>
      </GlowCard>
    </div>
  );
}
