"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getWorkspaceZones } from "@/app/(wso)/ws/_lib/zones";
import { cn } from "@/lib/utils";
import type { SidebarProps } from "./types";
import { MessageSquare, Plus } from "lucide-react";

const CONVERSATIONS = [
  { id: "1", title: "محادثة حديثة", preview: "آخر رسالة...", time: "2m" },
  { id: "2", title: "تحليل السوق", preview: "ما أفضل منتج...", time: "1h" },
  { id: "3", title: "مشروع جديد", preview: "أريد إنشاء...", time: "Yesterday" },
];

/**
 * WHY:   Desktop and mobile workspace navigation must stay in sync to avoid role drift across shells.
 * WHAT:  Renders the shared role-aware navigation items and current-user identity block.
 * HOW:   Reads the current pathname to mark active zones and calls `onNavigate` when a link is selected.
 */
export default function SidebarContent({
  user,
  organization,
  role,
  mode = "desktop",
  onNavigate,
  titleId,
}: Pick<SidebarProps, "user" | "organization" | "role" | "mode" | "onNavigate" | "titleId">) {
  const pathname = usePathname();
  const navItems = getWorkspaceZones(role);

  return (
    <div
      className={cn(
        "flex min-h-full flex-col bg-slate-950 text-white",
        mode === "desktop" ? "h-full border-e border-white/5" : "w-full shadow-2xl",
      )}
    >
      <div className="border-b border-white/5 px-6 py-6">
        <div
          id={titleId}
          className="text-2xl font-black tracking-tighter text-white"
        >
          {organization.name}
        </div>
        <div className="mt-3 inline-flex items-center gap-3">
          <span className="h-px w-8 bg-blue-500" />
          <div className="text-xs font-bold text-slate-400">{organization.sidebarSubtitle}</div>
        </div>
      </div>

      <nav aria-label="Workspace navigation" className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== "/ws" && pathname.startsWith(`${item.href}/`));

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 border px-4 py-3 text-[11px] font-black tracking-[0.18em] transition-all",
                isActive
                  ? "border-blue-600 bg-blue-600 text-white shadow-none"
                  : "border-transparent text-slate-400 hover:border-white/5 hover:bg-white/5 hover:text-white",
              )}
            >
              <Icon className={cn("h-4 w-4", isActive ? "text-white" : "text-slate-500")} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/5 px-3 py-4">
        <div className="mb-3 flex items-center justify-between px-3">
          <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">المحادثات</span>
          <Link
            href="/ws/ai"
            onClick={onNavigate}
            className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-slate-400 hover:border-blue-500 hover:text-blue-400 transition"
          >
            <Plus className="h-3 w-3" />
          </Link>
        </div>
        <div className="space-y-1 max-h-48 overflow-y-auto">
          {CONVERSATIONS.map((conv) => (
            <Link
              key={conv.id}
              href={`/ws/ai?thread=${conv.id}`}
              onClick={onNavigate}
              className={cn(
                "flex items-start gap-3 border border-transparent px-3 py-2 transition hover:bg-white/5",
                pathname === `/ws/ai` && "bg-white/5 border-white/10"
              )}
            >
              <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
              <div className="min-w-0 flex-1">
                <div className="truncate text-[10px] font-bold text-slate-300">{conv.title}</div>
                <div className="truncate text-[9px] text-slate-500">{conv.preview}</div>
              </div>
              <span className="shrink-0 text-[9px] text-slate-500">{conv.time}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="border-t border-white/5 p-4">
        <Link
          href="/ws/me"
          onClick={onNavigate}
          className="group flex items-center gap-3 border border-transparent p-2 transition hover:border-white/5 hover:bg-white/5"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-blue-400/30 bg-blue-500/15 text-xs font-black uppercase text-blue-100">
            {(user.name || user.email || "A").slice(0, 1).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[10px] font-black uppercase tracking-widest text-white">
              {user.name || "مستخدم أنان"}
            </div>
            <div className="truncate text-[9px] font-bold text-slate-500">
              {user.email || "حساب google"}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
