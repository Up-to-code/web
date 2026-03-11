"use client";

import React from "react";
import { ArrowUp, Mic } from "lucide-react";
import { cn } from "@/lib/utils";

interface InstitutionalChatInputProps {
  value: string;
  onChange: (val: string) => void;
  onSend: () => void;
  isSending?: boolean;
  placeholder?: string;
}

export default function InstitutionalChatInput({
  value,
  onChange,
  onSend,
  isSending,
  placeholder = "اسأل أنان، أو ابدأ بإنشاء عرض، أو ابحث في مشاريعك...",
}: InstitutionalChatInputProps) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 240)}px`;
    }
  }, [value]);

  return (
    <div className="relative w-full border-2 border-zinc-200 bg-white shadow-sm rounded-none transition-all duration-400 hover:border-blue-600 focus-within:border-blue-600 overflow-hidden">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSend();
          }
        }}
        placeholder={placeholder}
        className="w-full resize-none border-none bg-transparent px-8 py-6 text-lg font-bold text-slate-900 placeholder-slate-300 outline-none"
        rows={1}
        style={{ minHeight: "100px" }}
        dir="rtl"
      />
      
      <div className="flex items-center justify-between border-t-2 border-zinc-50 bg-slate-50/50 px-6 py-3">
        <div className="text-[10px] font-black uppercase tracking-widest text-slate-300">
          اضغط ENTER للإرسال • SHIFT + ENTER لسطر جديد
        </div>

        <div className="flex items-center gap-2">
          <button className="flex h-12 w-12 items-center justify-center border-2 border-zinc-100 bg-white text-slate-400 transition-all hover:border-blue-600 hover:text-blue-600 rounded-none shadow-sm">
            <Mic className="h-6 w-6" />
          </button>
          <button
            onClick={() => onSend()}
            disabled={!value.trim() || isSending}
            className={cn(
              "flex h-12 w-12 items-center justify-center transition-all duration-300 rounded-none shadow-sm",
              value.trim() && !isSending 
                ? "bg-blue-600 text-white hover:bg-blue-700" 
                : "bg-slate-100 text-slate-300 cursor-not-allowed border-2 border-transparent"
            )}
          >
            <ArrowUp className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
