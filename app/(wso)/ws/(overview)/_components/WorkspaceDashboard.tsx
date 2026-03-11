"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowUp, Mic, Globe, Cpu, ImageIcon, Paperclip, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import WorkspaceZoneGrid from "./WorkspaceZoneGrid";
import InstitutionalChatInput from "@/components/shared/InstitutionalChatInput";
import { formatWorkspaceOrganizationName } from "../../_lib/organizationDisplay";
import { getWorkspaceZones, type WorkspaceRole, type ZoneDescriptor } from "../../_lib/zones";
import { chatThreadStore, type ChatMessage } from "../../_lib/chatThreadStore";
import type { SessionUser } from "@/lib/serverSession";
import { AIMotionLogo, type AIMotionState } from "../../_components/AIMotion";
import MessageRow from "../../_components/Chat/MessageRow";
import TypingIndicator from "../../_components/Chat/TypingIndicator";
import { resolveAgUiTurn } from "@/components/shared/ag-aui/sdk/orchestration";
import { AG_UI_COMPONENT_REGISTRY } from "@/components/shared/ag-aui/sdk/registry";
import AgApprovalFooter from "@/components/shared/ag-aui/AgApprovalFooter";

type Organization = {
  id: string;
  type: "broker" | "red";
  name: string;
  slug: string;
  status: "active" | "pending" | null;
  isVerified: boolean;
};

type WorkspaceDashboardProps = {
  user: SessionUser;
  organizations: Organization[];
  role?: WorkspaceRole;
};

const SUGGESTIONS = [
  "إنشاء عرض لعميل",
  "تحليل سوق الملقا",
  "ما أفضل منتج أبنيه في التجمع؟",
  "أرسل العرض إلى وسيط",
];

const PROCESS_STAGES: Array<{ label: string; state: AIMotionState; delay: number }> = [
  { label: "جاري فهم الطلب وربطه بالمساحة المناسبة...", state: "searching", delay: 450 },
  { label: "تجميع الحقول والعلاقات التشغيلية...", state: "thinking", delay: 600 },
  { label: "تحليل الخيارات وبناء المسودة...", state: "analyzing", delay: 650 },
  { label: "مطابقة المشروع والأشخاص والخيط المناسب...", state: "matching", delay: 600 },
  { label: "تجهيز النتيجة بصيغة قابلة للتنفيذ...", state: "tool", delay: 500 },
];

export default function WorkspaceDashboard({
  user,
  organizations,
  role,
}: WorkspaceDashboardProps) {
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timeoutRefs = useRef<number[]>([]);

  const [value, setValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [typingLabel, setTypingLabel] = useState("جاري التحليل...");
  const [typingMotion, setTypingMotion] = useState<AIMotionState>("thinking");

  const primaryOrganization = organizations[0];
  const zones = getWorkspaceZones(role);

  const clearScheduledFrames = () => {
    timeoutRefs.current.forEach((id) => window.clearTimeout(id));
    timeoutRefs.current = [];
  };

  const updateBotMessage = (messageIndex: number, content: string) => {
    setMessages((prev) =>
      prev.map((message, index) =>
        index === messageIndex && message.role === "bot"
          ? { ...message, content, avatarState: "tool" as AIMotionState }
          : message,
      ),
    );
  };

  const appendBotTurn = (text: string) => {
    const turn = resolveAgUiTurn(text);
    const baseMessageIndex = messages.length + 1; // +1 because we just added the user message

    setMessages((prev) => [
      ...prev,
      { role: "bot", content: "", avatarState: "tool" },
    ]);

    const chunks = turn.assistantText.split(" ");
    chunks.forEach((_, index) => {
      timeoutRefs.current.push(
        window.setTimeout(() => {
          updateBotMessage(baseMessageIndex, chunks.slice(0, index + 1).join(" "));
        }, index * 45),
      );
    });

    const finishTextDelay = chunks.length * 45 + 90;

    timeoutRefs.current.push(
      window.setTimeout(() => {
        setMessages((prev) => {
          const finalMessages = [...prev];
          // Update the last bot message with cards
          finalMessages[baseMessageIndex] = {
            role: "bot",
            content: turn.assistantText,
            cards: turn.cards,
            avatarState: turn.executionState === "completed" ? "success" : "matching",
          };

          if (turn.followupQuestion) {
            finalMessages.push({
              role: "bot",
              content: turn.followupQuestion,
              avatarState: "focus",
            });
          }
          return finalMessages;
        });
        setIsBotTyping(false);
        setIsSending(false);
      }, finishTextDelay),
    );
  };

  const handleSend = (overrideText?: string) => {
    const text = (overrideText ?? value).trim();
    if (!text || isSending) return;

    clearScheduledFrames();
    setIsSending(true);
    setValue("");

    // Add user message locally
    const userMsg: ChatMessage = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);

    // Fake bot sequence
    setIsBotTyping(true);
    setTypingMotion(PROCESS_STAGES[0].state);
    setTypingLabel(PROCESS_STAGES[0].label);

    let elapsed = 0;
    PROCESS_STAGES.forEach((stage, index) => {
      elapsed += index === 0 ? 0 : PROCESS_STAGES[index - 1].delay;
      timeoutRefs.current.push(
        window.setTimeout(() => {
          setTypingMotion(stage.state);
          setTypingLabel(stage.label);
        }, elapsed),
      );
    });

    const finishDelay = PROCESS_STAGES.reduce((total, stage) => total + stage.delay, 0) + 320;
    timeoutRefs.current.push(
      window.setTimeout(() => {
        appendBotTurn(text);
      }, finishDelay),
    );
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messages, isBotTyping]);

  useEffect(() => () => clearScheduledFrames(), []);

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-slate-50">
      {/* Main Content Area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-6 lg:px-8"
      >
        {/* 1. Initial State: Stark Centered Layout (Hero + Input + Grid) */}
        {messages.length === 0 ? (
          <div className="mx-auto flex h-full min-h-full w-full max-w-5xl flex-col items-center justify-center py-20">
            <div className="mb-12 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="mb-12">
                <AIMotionLogo state="idle" size="hero" />
              </div>
              <h1 className="text-center font-Cairo text-5xl font-black uppercase tracking-tighter text-slate-900 md:text-6xl">
                كيف يمكنني مساعدتك؟
              </h1>
            </div>

            <div className="w-full max-w-4xl space-y-4">
              {/* Quick Actions Bar - Floating Above Input */}
              <div className="flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-150">
                <button className="flex items-center gap-2 border-2 border-zinc-200 bg-white px-4 py-2 transition-all hover:border-blue-600 hover:bg-blue-50 group rounded-none">
                  <Plus className="h-4 w-4 text-slate-400 group-hover:text-blue-600" />
                  <span className="text-[11px] font-black uppercase tracking-widest text-slate-900">إنشاء مشروع</span>
                </button>
                <button className="flex items-center gap-2 border-2 border-zinc-200 bg-white px-4 py-2 transition-all hover:border-blue-600 hover:bg-blue-50 group rounded-none">
                  <ImageIcon className="h-4 w-4 text-slate-400 group-hover:text-blue-600" />
                  <span className="text-[11px] font-black uppercase tracking-widest text-slate-900">تحليل صورة</span>
                </button>
              </div>

              <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                <InstitutionalChatInput
                  value={value}
                  onChange={setValue}
                  onSend={handleSend}
                  isSending={isSending}
                />
              </div>

              <div className="animate-in fade-in slide-in-from-bottom-2 duration-700 delay-200">
                <div className="mb-10 flex items-center justify-center gap-6">
                  <div className="h-[2px] w-20 bg-slate-200" />
                  <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">بروتوكول الوصول المؤسسي</h2>
                  <div className="h-[2px] w-20 bg-slate-200" />
                </div>
                <WorkspaceZoneGrid
                  organizationName={formatWorkspaceOrganizationName(primaryOrganization.name)}
                  userName={user.name ?? null}
                  zones={zones}
                />
              </div>
            </div>
          </div>
        ) : (
          /* 2. Chatting State: Top-aligned thread */
          <div className="mx-auto w-full max-w-4xl py-12 pb-48">
            <div className="flex flex-col gap-24">
              {messages.map((msg, index) => (
                <MessageRow
                  key={index}
                  isUser={msg.role === "user"}
                  content={msg.content}
                  avatarState={(msg as any).avatarState}
                >
                  {(msg as any).cards?.map((card: any) => {
                    if (card.componentId === "approval_footer") {
                      return <AgApprovalFooter key={card.id} {...card.props} />;
                    }
                    // @ts-ignore - dynamic registry lookup
                    const ComponentView = AG_UI_COMPONENT_REGISTRY[card.componentId];
                    return ComponentView ? <ComponentView key={card.id} {...card.props} /> : null;
                  })}
                </MessageRow>
              ))}
              {isBotTyping && <TypingIndicator state={typingMotion} text={typingLabel} />}
            </div>
          </div>
        )}
      </div>

      {/* 3. Fixed Bottom Input (Only visible during conversation) */}
      {messages.length > 0 && (
        <div className="pointer-events-none absolute bottom-0 left-0 z-20 w-full px-6 pb-5 lg:px-8">
          <div className="pointer-events-auto mx-auto max-w-4xl space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Quick Actions Bar - Persistent in Conversation */}
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 border-2 border-zinc-200 bg-white/90 backdrop-blur-sm px-4 py-2 transition-all hover:border-blue-600 hover:bg-white group rounded-none shadow-sm">
                <Plus className="h-4 w-4 text-slate-400 group-hover:text-blue-600" />
                <span className="text-[11px] font-black uppercase tracking-widest text-slate-900">إنشاء مشروع</span>
              </button>
            </div>

            <InstitutionalChatInput
              value={value}
              onChange={setValue}
              onSend={handleSend}
              isSending={isSending}
            />
          </div>
        </div>
      )}
    </div>
  );
}
