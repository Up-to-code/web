"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { AIMotionState } from "@/app/(wso)/ws/_components/AIMotion";
import AgApprovalFooter from "@/components/shared/ag-aui/AgApprovalFooter";
import type { AgVoiceState } from "@/components/shared/ag-aui/AgVoiceControl";
import { resolveAgUiTurn } from "@/components/shared/ag-aui/sdk/orchestration";
import { AG_UI_COMPONENT_REGISTRY } from "@/components/shared/ag-aui/sdk/registry";
import type { AgUiCardDefinition } from "@/components/shared/ag-aui/sdk/types";
import MessageRow from "./MessageRow";
import TypingIndicator from "./TypingIndicator";
import CommandBar from "./CommandBar";

type ChatMsg =
  | { role: "user"; content: string }
  | {
      role: "bot";
      content?: string;
      cards?: AgUiCardDefinition[];
      variant?: "info";
      avatarState?: AIMotionState;
    };

const INITIAL_CHAT: ChatMsg[] = [
  {
    role: "bot",
    content:
      "أستطيع إدارة العمل معك بطريقتين: تتحرك مباشرة داخل المساحات، أو تتركني أجمع البيانات وأبني مسودة قابلة للاعتماد داخل نفس المحادثة.",
    variant: "info",
    avatarState: "idle",
  },
  {
    role: "user",
    content: "أرني آخر تحديث لمشروع واجهة الياسمين.",
  },
  {
    role: "bot",
    content: "أعطيتك مثالاً أولياً على طريقة عرض آخر تحديث، ويمكنك الآن متابعة أي أمر تشغيلي جديد.",
    avatarState: "success",
  },
];

const SUGGESTIONS = [
  "أريد إنشاء مشروع جديد",
  "انشر عرضاً لهذا المشروع",
  "أرسل العرض إلى وسيط",
  "أرني آخر تحديث لهذا المشروع",
  "ما أفضل منتج أبنيه في الملقا؟",
];

const PROCESS_STAGES: Array<{ label: string; state: AIMotionState; delay: number }> = [
  { label: "جاري فهم الطلب وربطه بالمساحة المناسبة...", state: "searching", delay: 450 },
  { label: "تجميع الحقول والعلاقات التشغيلية...", state: "thinking", delay: 600 },
  { label: "تحليل الخيارات وبناء المسودة...", state: "analyzing", delay: 650 },
  { label: "مطابقة المشروع والأشخاص والخيط المناسب...", state: "matching", delay: 600 },
  { label: "تجهيز النتيجة بصيغة قابلة للتنفيذ...", state: "tool", delay: 500 },
];

/**
 * WHY:   The AI workspace should act as a second control plane, not just a reply sandbox.
 * WHAT:  Drives conversational CRUD/search flows through AG-UI draft cards, approvals, and mock execution results.
 * HOW:   Keeps a local card registry plus staged typing/streaming so future backend tools can plug into the same envelope.
 */
export default function AIPage() {
  const searchParams = useSearchParams();
  const scrollRef = useRef<HTMLDivElement>(null);
  const initialQueryHandled = useRef(false);
  const timeoutRefs = useRef<number[]>([]);
  const messagesRef = useRef<ChatMsg[]>(INITIAL_CHAT);

  const [messages, setMessages] = useState<ChatMsg[]>(INITIAL_CHAT);
  const [input, setInput] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [typingLabel, setTypingLabel] = useState("جاري التحليل...");
  const [typingMotion, setTypingMotion] = useState<AIMotionState>("thinking");
  const [voiceState, setVoiceState] = useState<AgVoiceState>("idle");

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  const clearScheduledFrames = () => {
    timeoutRefs.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
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

  const appendTurn = (text: string) => {
    const turn = resolveAgUiTurn(text);
    const baseMessageIndex = messagesRef.current.length;
    setVoiceState("streaming");
    setMessages((prev) => [
      ...prev,
      {
        role: "bot",
        content: "",
        avatarState: "tool",
      },
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
        const approvalCard: AgUiCardDefinition | null =
          turn.executionState === "ready"
            ? {
                id: `${turn.action.id}-approval`,
                componentId: "approval_footer",
                props: {
                  onApprove: () => {
                    setMessages((current) => [
                      ...current,
                      {
                        role: "bot",
                        content:
                          "تم اعتماد الطلب التجريبي. في الربط الفعلي سأحوّل هذه الموافقة إلى إجراء داخل المساحة المطلوبة.",
                        avatarState: "success",
                      },
                      {
                        role: "bot",
                        cards: [
                          {
                            id: `${turn.action.id}-result`,
                            componentId: "execution_result",
                            props: {
                              title: turn.action.title,
                              description:
                                "تم حفظ النتيجة بصيغة تشغيلية ويمكن لاحقاً ربطها بعملية تنفيذ حقيقية.",
                              status: "done",
                            },
                          },
                        ],
                        avatarState: "success",
                      },
                    ]);
                  },
                  onEdit: () => {
                    setMessages((current) => [
                      ...current,
                      {
                        role: "bot",
                        cards: [
                          {
                            id: `${turn.action.id}-edit`,
                            componentId: "missing_data_prompt",
                            props: {
                              prompt: "اذكر التعديل الذي تريده وسأعيد بناء المسودة قبل التنفيذ.",
                            },
                          },
                        ],
                        avatarState: "focus",
                      },
                    ]);
                  },
                },
              }
            : null;

        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            cards: approvalCard ? [...turn.cards, approvalCard] : turn.cards,
            avatarState: turn.executionState === "completed" ? "success" : "matching",
          },
          ...(turn.followupQuestion
            ? [
                {
                  role: "bot" as const,
                  cards: [
                    {
                      id: `${turn.action.id}-followup`,
                      componentId: "missing_data_prompt" as const,
                      props: { prompt: turn.followupQuestion },
                    },
                  ],
                  avatarState: "focus" as AIMotionState,
                },
              ]
            : []),
        ]);
        setTypingMotion("success");
        setTypingLabel("تم تجهيز الرد التشغيلي");
        setVoiceState("idle");
      }, finishTextDelay),
    );
  };

  const handleSend = (overrideText?: string) => {
    const text = (overrideText ?? input).trim();
    if (!text) {
      return;
    }

    clearScheduledFrames();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setIsBotTyping(true);
    setVoiceState("thinking");
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
        setIsBotTyping(false);
        appendTurn(text);
      }, finishDelay),
    );
  };

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isBotTyping]);

  useEffect(() => {
    const query = searchParams.get("q");
    if (!query || initialQueryHandled.current) {
      return;
    }

    initialQueryHandled.current = true;
    setInput(query);
    window.setTimeout(() => handleSend(query), 0);
  }, [searchParams]);

  useEffect(() => () => clearScheduledFrames(), []);

  return (
    <div className="flex h-full min-h-svh flex-col bg-white">
      <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto pb-56" ref={scrollRef}>
          <div className="mx-auto flex min-w-0 max-w-3xl flex-col gap-12 px-6 py-12">
            {messages.map((msg, index) => {
              const isUser = msg.role === "user";

              return (
                <MessageRow
                  key={`${msg.role}-${index}`}
                  isUser={isUser}
                  content={msg.content}
                  isInfo={msg.role === "bot" && msg.variant === "info"}
                  avatarState={msg.role === "bot" ? msg.avatarState : undefined}
                >
                  {msg.role === "bot" && msg.cards?.length
                    ? msg.cards.map((card) => {
                        if (card.componentId === "approval_footer") {
                          return <AgApprovalFooter key={card.id} {...card.props} />;
                        }
                        const ComponentView = AG_UI_COMPONENT_REGISTRY[card.componentId];
                        return ComponentView ? <ComponentView key={card.id} {...card.props} /> : null;
                      })
                    : null}
                </MessageRow>
              );
            })}

            {isBotTyping ? <TypingIndicator state={typingMotion} text={typingLabel} /> : null}
          </div>
        </div>

        <CommandBar
          input={input}
          suggestions={SUGGESTIONS}
          voiceState={voiceState}
          onChange={setInput}
          onSend={handleSend}
          onVoiceToggle={() =>
            setVoiceState((current) => (current === "listening" ? "idle" : "listening"))
          }
        />
      </div>
    </div>
  );
}
