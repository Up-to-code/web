"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Clock, Circle, MessageCircle } from "lucide-react";
import { MOCK_CONVERSATIONS, type Conversation } from "../../../_lib/inboxStore";

/**
 * WHY:   The main workspace layout now handles the conversation list via WorkspaceInboxSidebar.
 * WHAT:  A focused message thread component that fills the center workspace content area.
 * HOW:   Receives a conversation ID and renders the historical message bubbles and reply input.
 */
export default function InboxThreadView({ conversationId }: { conversationId?: string }) {
  const conversation = MOCK_CONVERSATIONS.find(c => c.id === conversationId);
  const [messages, setMessages] = useState(conversation?.messages || []);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [newMessage]);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    const msg = { id: `m-${Date.now()}`, sender: "me" as const, text: newMessage, time: "الآن" };
    setMessages(prev => [...prev, msg]);
    setNewMessage("");
  };

  if (!conversation) {
    return (
      <div className="flex h-[calc(100vh-160px)] items-center justify-center bg-slate-50/10">
        <div className="text-center">
          <MessageCircle className="h-16 w-16 text-slate-200 mx-auto mb-6" />
          <h2 className="text-xl font-black text-slate-900 mb-2">اختر محادثة</h2>
          <p className="text-sm font-medium text-slate-400">ابدأ بالتواصل مع فريقك أو المساعد الذكي من القائمة الجانبية.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-white">
      {/* Thread Header */}
      <div className="px-8 py-4 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-slate-950 text-white flex items-center justify-center text-xs font-black">
            {conversation.avatarLabel}
          </div>
          <div>
            <div className="text-sm font-black text-slate-950 leading-none">{conversation.contactName}</div>
            <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">{conversation.contactRole}</div>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-[9px] font-black text-emerald-600 uppercase tracking-widest border border-emerald-50 bg-emerald-50/30 px-3 py-1.5">
          <Circle className="h-2 w-2 fill-emerald-500 text-emerald-500" />
          متصل
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-5 bg-white">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[70%] p-5 border ${
              msg.sender === "me"
                ? "bg-blue-600 border-blue-600 text-white"
                : "bg-slate-50 border-slate-100 text-slate-900"
            }`}>
              <div className="text-sm font-bold leading-relaxed">{msg.text}</div>
              <div className={`text-[10px] font-black mt-3 flex items-center gap-2 ${
                msg.sender === "me" ? "text-blue-200" : "text-slate-400"
              }`}>
                <Clock className="h-3 w-3" />
                {msg.time}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Reply Input Area */}
      <div className="p-4 border-t border-slate-100 bg-white">
        <div className="flex gap-3 items-end max-w-5xl mx-auto">
          <textarea
            ref={textareaRef}
            rows={1}
            placeholder="اكتب رسالة..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            className="flex-1 border-2 border-slate-100 bg-slate-50 py-3 px-5 text-sm font-bold text-slate-900 outline-none focus:bg-white focus:border-blue-600 focus:ring-0 transition-all resize-none max-h-48 overflow-y-auto"
          />
          <button
            onClick={handleSend}
            className="bg-slate-950 px-6 py-3 text-[10px] font-black uppercase tracking-widest text-white hover:bg-blue-600 transition-colors flex items-center gap-2 mb-[1px]"
          >
            <Send className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">إرسال</span>
          </button>
        </div>
      </div>
    </div>
  );
}
