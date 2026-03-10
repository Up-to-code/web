"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getWorkspaceZones } from "@/app/(wso)/ws/_lib/zones";
import { cn } from "@/lib/utils";
import type { SidebarProps } from "./types";

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
      <div className="border-b border-white/5 px-6 py-8">
        <div
          id={titleId}
          className="text-3xl font-black tracking-tighter text-white"
        >
          {organization.name}
        </div>
        <div className="mt-4 inline-flex items-center gap-3">
          <span className="h-px w-10 bg-blue-500" />
          <div className="text-xs font-bold text-slate-400">{organization.sidebarSubtitle}</div>
        </div>
      </div>

      <nav aria-label="Workspace navigation" className="flex-1 space-y-2 px-4 py-8">
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
                "flex items-center gap-4 border px-5 py-4 text-[11px] font-black tracking-[0.18em] transition-all",
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

      <div className="border-t border-white/5 p-6">
        <Link
          href="/ws/me"
          onClick={onNavigate}
          className="group flex items-center gap-4 border border-transparent p-3 transition hover:border-white/5 hover:bg-white/5"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-blue-400/30 bg-blue-500/15 text-xs font-black uppercase text-blue-100">
            {(user.name || user.email || "A").slice(0, 1).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[10px] font-black uppercase tracking-widest text-white">
              {user.name || "مستخدم أنان"}
            </div>
            <div className="truncate text-[10px] font-bold text-slate-500">
              {user.email || "حساب google"}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
