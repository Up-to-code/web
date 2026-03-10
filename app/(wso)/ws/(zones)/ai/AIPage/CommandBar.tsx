"use client";

import { ChevronLeft, Plus } from "lucide-react";
import AgVoiceControl, {
  type AgVoiceState,
} from "@/components/shared/ag-aui/AgVoiceControl";

/**
 * WHY:   The assistant command bar is the primary interaction surface and needs to carry the same brand identity as the chat thread.
 * WHAT:  Renders suggestions, the text input, and a standard microphone/send cluster.
 * HOW:   Receives all value/state handlers from the page orchestrator while leaving brand motion to assistant identity elements.
 */
export default function CommandBar({
  input,
  suggestions,
  voiceState,
  onChange,
  onSend,
  onVoiceToggle,
}: {
  input: string;
  suggestions: string[];
  voiceState: AgVoiceState;
  onChange: (value: string) => void;
  onSend: (overrideText?: string) => void;
  onVoiceToggle: () => void;
}) {
  return (
    <div className="absolute bottom-0 left-0 z-20 w-full bg-white px-6 py-6">
      <div className="mx-auto max-w-3xl space-y-4">
        <div className="flex flex-wrap justify-center gap-2">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => onSend(suggestion)}
              className="bg-slate-50 px-4 py-2 text-xs font-black uppercase tracking-widest text-slate-400 transition hover:text-blue-600 rounded-none"
            >
              {suggestion}
            </button>
          ))}
        </div>

        <div className="flex min-h-14 h-14 items-stretch bg-slate-50">
          <div className="flex shrink-0 items-center gap-4 px-4">
            <AgVoiceControl state={voiceState} onToggle={onVoiceToggle} />
            <button type="button" className="p-1.5 transition hover:text-blue-600">
              <Plus className="h-4 w-4 text-slate-600" />
            </button>
          </div>

          <input
            type="text"
            value={input}
            onChange={(event) => onChange(event.target.value)}
            onKeyDown={(event) => event.key === "Enter" && !event.shiftKey && onSend()}
            placeholder="اسأل أنان شيئاً..."
            className="min-w-0 flex-1 bg-transparent px-4 text-right text-sm font-bold text-slate-900 outline-none placeholder:text-slate-300"
            dir="rtl"
          />

          <div className="flex shrink-0 items-center gap-3 px-3 py-2">
            <button
              type="button"
              onClick={() => onSend()}
              className="flex shrink-0 items-center gap-2 bg-slate-950 px-8 py-2.5 text-xs font-black uppercase tracking-widest text-white transition hover:bg-blue-600 rounded-none"
            >
              <span>إرسال</span>
              <ChevronLeft className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-slate-300">
          <span>أنان العقاري v1.0</span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
            {voiceState === "listening"
              ? "استماع مباشر"
              : voiceState === "thinking"
                ? "تحليل الطلب"
                : voiceState === "streaming"
                  ? "يبث النتيجة"
                  : voiceState === "error"
                    ? "توقف الميكروفون"
                    : "النظام يعمل"}
          </span>
        </div>
      </div>
    </div>
  );
}
