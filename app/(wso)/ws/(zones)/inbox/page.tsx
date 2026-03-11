"use client";

import { useState } from "react";
import WorkspaceInboxSidebar from "../../_components/WorkspaceInboxSidebar";
import InboxThreadView from "./InboxPage/InboxThreadView";
import { MessageCircle } from "lucide-react";

/**
 * WHY:   The user prefers the inbox as a standalone page rather than a persistent layout component.
 * WHAT:  Renders the 2-pane inbox experience (conversation list + active thread) as a standard workspace page.
 * HOW:   Manages the active conversation ID locally and coordinates between the sidebar list and the thread view.
 */
export default function InboxIndexPage() {
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);

  return (
    <div className="flex h-full overflow-hidden bg-white">
      {/* Local Sidebar (Conversation List) */}
      <div className="w-80 shrink-0 border-l border-slate-200">
        <WorkspaceInboxSidebar 
          activeId={activeConversationId} 
          onSelect={setActiveConversationId} 
          mode="inline"
        />
      </div>

      {/* Main Thread Area */}
      <div className="flex-1 min-w-0 bg-white">
        {activeConversationId ? (
          <InboxThreadView conversationId={activeConversationId} />
        ) : (
          <div className="flex flex-col items-center justify-center h-full bg-slate-50/30">
            <MessageCircle className="h-16 w-16 text-slate-200 mb-6" />
            <h2 className="text-xl font-black text-slate-900 mb-2">اختر محادثة للبدء</h2>
            <p className="text-sm font-medium text-slate-400">تواصل مع فريقك أو المساعد الذكي من القائمة الجانبية.</p>
          </div>
        )}
      </div>
    </div>
  );
}
