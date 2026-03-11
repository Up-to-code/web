"use client";

import { Circle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { MOCK_CONVERSATIONS } from "../_lib/inboxStore";
import { cn } from "@/lib/utils";

/**
 * WHY:   The inbox is now a fundamental part of the workspace layout, providing persistent conversation access.
 * WHAT:  A vertical rail component that renders the list of active chat threads.
 * HOW:   Uses role-aware mock data for now; ties into the routing system to highlight active threads.
 */
export default function WorkspaceInboxSidebar({ 
  activeId, 
  onSelect, 
  mode = "sidebar" 
}: { 
  activeId?: string | null;
  onSelect?: (id: string) => void;
  mode?: "sidebar" | "inline";
}) {
  const router = useRouter();
  const pathname = usePathname();

  // If in sidebar mode, use the URL to determine active state
  const currentActiveId = mode === "sidebar" 
    ? (pathname.startsWith("/ws/inbox/") ? pathname.split("/").pop() : (pathname === "/ws" ? "conv-ai" : null))
    : activeId;

  const handleSelect = (id: string) => {
    if (onSelect) {
      onSelect(id);
    } else {
      if (id === "conv-ai") {
        router.push("/ws");
      } else {
        router.push(`/ws/inbox/${id}`);
      }
    }
  };

  return (
    <div className={cn(
        "flex h-full flex-col bg-white",
        mode === "sidebar" ? "w-[320px] border-l border-slate-200" : "w-full"
    )}>
      <div className="p-6 border-b border-slate-100 bg-white sticky top-0 z-10">
        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">البريد الوارد</div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {MOCK_CONVERSATIONS.map((conv) => {
          const isActive = currentActiveId === conv.id;
          
          return (
            <button
              key={conv.id}
              onClick={() => handleSelect(conv.id)}
              className={cn(
                "group relative w-full text-right p-6 border-b border-slate-50 flex gap-4 transition-all duration-200",
                isActive 
                  ? "bg-slate-50 border-r-4 border-r-blue-600" 
                  : "hover:bg-slate-50/50 border-r-4 border-r-transparent"
              )}
            >
              <div className={cn(
                "w-12 h-12 flex items-center justify-center shrink-0 text-sm font-black transition-all",
                conv.avatarLabel === "AI" ? "bg-blue-600 text-white" : "bg-slate-950 text-white",
                isActive && "scale-105"
              )}>
                {conv.avatarLabel}
              </div>
              
              <div className="min-w-0 flex-1">
                <div className="flex justify-between items-start mb-0.5">
                  <div className={cn(
                    "text-xs font-black truncate transition-colors",
                    isActive ? "text-blue-700" : "text-slate-950 group-hover:text-blue-600"
                  )}>
                    {conv.contactName}
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 shrink-0 mr-2">{conv.lastTime}</div>
                </div>
                
                <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{conv.contactRole}</div>
                
                <div className={cn(
                    "text-[11px] font-medium truncate leading-normal transition-colors",
                    isActive ? "text-slate-600" : "text-slate-500"
                )}>
                  {conv.lastMessage}
                </div>

                {conv.unread > 0 && !isActive && (
                  <div className="mt-2 flex items-center gap-1.5">
                    <Circle className="h-2 w-2 fill-blue-600 text-blue-600 animate-pulse" />
                    <span className="text-[10px] font-black text-blue-600 tracking-wider">جديد</span>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="p-4 border-t border-slate-100 bg-slate-50/50">
        <button className="w-full py-3 px-4 bg-white border border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:text-blue-600 hover:border-blue-200 transition">
          محطة عمل جديدة +
        </button>
      </div>
    </div>
  );
}
