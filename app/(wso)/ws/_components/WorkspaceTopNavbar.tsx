"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Building2, Mail } from "lucide-react";
import type { SessionUser } from "@/lib/serverSession";
import type { WorkspaceOrganizationDisplay } from "../_lib/organizationDisplay";
import { cn } from "@/lib/utils";

/**
 * WHY:   Workspace screens need one shared top navbar for identity, organization context, and incoming signals.
 * WHAT:  Renders the user card, organization summary, mobile nav trigger slot, and notifications/messages badges.
 * HOW:   Receives serializable user, organization, and optional mobile-navigation UI from the workspace shell.
 */
export default function WorkspaceTopNavbar({
  user,
  organization,
  mobileNavigation,
}: {
  user: Pick<SessionUser, "name" | "email">;
  organization: WorkspaceOrganizationDisplay;
  mobileNavigation?: React.ReactNode;
}) {
  const userLabel = user.name || user.email || "مستخدم أنان";
  const userInitial = userLabel.slice(0, 1).toUpperCase();
  const pathname = usePathname();
  const isInboxActive = pathname.startsWith("/ws/inbox");

  return (
    <div className="border-b border-slate-200 bg-white">
      <div className="flex w-full items-center justify-between gap-3 px-6 py-4 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          {mobileNavigation ? <div className="lg:hidden">{mobileNavigation}</div> : null}

          <div className="flex min-w-0 items-center gap-3">
            <div className="flex min-w-0 items-center gap-3 border border-slate-200 bg-white px-3 py-2">
              <div className="flex h-11 w-11 items-center justify-center border border-slate-200 bg-white text-sm font-black text-slate-950">
                {userInitial}
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm font-black text-slate-950">{userLabel}</div>
                <div className="truncate text-xs font-medium text-slate-500">{user.email || "حساب العمل"}</div>
              </div>
            </div>

            <div className="hidden min-w-[320px] items-center gap-3 border border-slate-200 bg-white px-4 py-3 lg:flex">
              <div className="flex h-10 w-10 items-center justify-center border border-slate-200 bg-white text-slate-950">
                <Building2 className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm font-black text-slate-950">{organization.name}</div>
                <div className="truncate text-xs font-medium text-slate-500">{organization.navbarSubtitle}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <SignalButton
            label="الإشعارات"
            count={0}
            href="/ws/notifications"
            icon={<Bell className="h-4 w-4" />}
          />
          <SignalButton
            label="الرسائل"
            count={3}
            href="/ws/inbox"
            isActive={isInboxActive}
            icon={<Mail className="h-4 w-4" />}
          />
        </div>
      </div>
    </div>
  );
}

function SignalButton({
  label,
  count,
  href,
  icon,
  isActive,
}: {
  label: string;
  count: number;
  href: string;
  icon: React.ReactNode;
  isActive?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "relative inline-flex items-center gap-3 border px-5 py-3 text-[10px] font-black uppercase tracking-[0.15em] transition-all",
        isActive
          ? "border-blue-600 bg-blue-600 text-white"
          : "border-slate-200 bg-white text-slate-950 hover:bg-slate-50"
      )}
      aria-label={`${label}: ${count}`}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
      {count > 0 ? (
        <span className={cn(
          "inline-flex min-w-6 items-center justify-center rounded-full px-2 py-0.5 text-[11px] font-black",
          isActive ? "bg-white text-blue-600" : "bg-blue-600 text-white"
        )}>
          {count}
        </span>
      ) : null}
    </Link>
  );
}
