import { useState } from "react";
import { Send, Sparkles, X } from "lucide-react";
import { GlowCard } from "../GlowCard";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const suggestedQuestions = [
  "ธุรกิจของฉันเสี่ยงตรงไหน",
  "ควรลดต้นทุนตรงไหน",
  "ควรซื้อวัตถุดิบตอนนี้ไหม",
  "สินค้าไหนกำไรดีที่สุด",
  "ถ้ายอดขายลดลงจะอยู่ได้อีกกี่วัน",
];

interface AIChatProps {
  onClose: () => void;
}

export function AIChat({ onClose }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "สวัสดีครับ ผมคือ AI CFO Assistant ของคุณ มีอะไรให้ผมช่วยไหมครับ?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: text,
      isUser: true,
      timestamp: new Date(),
    };

    // Simulate AI response
    const aiResponse: Message = {
      id: messages.length + 2,
      text: getAIResponse(text),
      isUser: false,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage, aiResponse]);
    setInputText("");
  };

  const getAIResponse = (question: string): string => {
    if (question.includes("เสี่ยง")) {
      return "จากการวิเคราะห์ข้อมูล ธุรกิจของคุณมีความเสี่ยงอยู่ที่ระดับ 68% เนื่องจาก Cash Runway เหลือเพียง 36 วัน และค่าวัตถุดิบเพิ่มขึ้น 18% ในเดือนนี้ ควรเพิ่มเงินสำรองหรือเจรจาราคากับซัพพลายเออร์";
    } else if (question.includes("ลดต้นทุน")) {
      return "แนะนำให้ลดค่าใช้จ่ายที่ไม่จำเป็น 8% และเลื่อนการซื้อวัตถุดิบ 4 วัน จะช่วยเพิ่ม Cash Runway จาก 36 วัน เป็น 48 วัน";
    } else if (question.includes("ซื้อวัตถุดิบ")) {
      return "ตอนนี้ราคาวัตถุดิบอยู่ในช่วงสูง แนะนำให้รอ 3-5 วัน เพราะ AI คาดการณ์ว่าราคาจะลดลง 5-7% หรือสามารถเปลี่ยนไปใช้ Supplier B ที่ราคาถูกกว่า 10%";
    } else if (question.includes("กำไร")) {
      return "สินค้า A มีกำไรสุทธิสูงสุดที่ 35% ขณะที่สินค้า C มีกำไรเพียง 12% แนะนำให้เพิ่มสต็อกและการตลาดสินค้า A มากขึ้น";
    } else if (question.includes("ยอดขายลด")) {
      return "หากยอดขายลดลง 10% Cash Runway จะลดเหลือเพียง 24 วัน ควรเตรียมแผนสำรองเงินหรือลดค่าใช้จ่ายทันที";
    }
    return "ขอบคุณสำหรับคำถามครับ ผมจะวิเคราะห์ข้อมูลและให้คำแนะนำที่ดีที่สุดให้คุณครับ";
  };

  const handleQuickQuestion = (question: string) => {
    handleSend(question);
  };

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-xl z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-pink-sm">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-glow-pink">AI Assistant</h2>
            <p className="text-xs text-muted-foreground">CFO สำหรับธุรกิจของคุณ</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-9 h-9 rounded-full bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
          >
            <div
              className={`max-w-[85%] rounded-2xl p-4 ${
                message.isUser
                  ? "bg-gradient-to-br from-primary to-secondary text-white glow-pink-sm"
                  : "bg-card/80 backdrop-blur-sm border border-border/50"
              }`}
            >
              <p className="text-sm leading-relaxed">{message.text}</p>
            </div>
          </div>
        ))}

        {/* Suggested Questions */}
        {messages.length === 1 && (
          <div className="space-y-3 pt-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <p className="text-sm text-muted-foreground text-center">คำถามที่มักถามบ่อย:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {suggestedQuestions.map((question, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickQuestion(question)}
                  className="px-4 py-2 rounded-full bg-muted/50 hover:bg-primary/20 hover:border-primary/30 border border-border/50 text-sm transition-all hover:scale-105"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border/50">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend(inputText)}
            placeholder="ถามคำถามเกี่ยวกับธุรกิจของคุณ..."
            className="flex-1 px-4 py-3 rounded-2xl bg-muted/50 border border-border/50 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
          <button
            onClick={() => handleSend(inputText)}
            className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-pink-sm hover:scale-105 transition-transform"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}