import Link from "next/link";
import { Bell, Building2, Mail } from "lucide-react";
import type { SessionUser } from "@/lib/serverSession";
import type { WorkspaceOrganizationDisplay } from "../_lib/organizationDisplay";

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

  return (
    <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)]">
      <div className="flex w-full items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          {mobileNavigation ? <div className="lg:hidden">{mobileNavigation}</div> : null}

          <div className="flex min-w-0 items-center gap-3">
            <div className="flex min-w-0 items-center gap-3 border border-slate-200 bg-white px-3 py-2">
              <div className="flex h-11 w-11 items-center justify-center border border-blue-200 bg-blue-50 text-sm font-black text-blue-700">
                {userInitial}
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm font-black text-slate-950">{userLabel}</div>
                <div className="truncate text-xs font-medium text-slate-500">{user.email || "حساب العمل"}</div>
              </div>
            </div>

            <div className="hidden min-w-[320px] items-center gap-3 border border-slate-200 bg-white px-4 py-3 lg:flex">
              <div className="flex h-10 w-10 items-center justify-center border border-slate-200 bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] text-blue-700">
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
            count={0}
            href="/ws/offers/inbox"
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
}: {
  label: string;
  count: number;
  href: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="relative inline-flex items-center gap-2 border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
      aria-label={`${label}: ${count}`}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
      {count > 0 ? (
        <span className="inline-flex min-w-6 items-center justify-center rounded-full bg-blue-600 px-2 py-0.5 text-[11px] font-black text-white">
          {count}
        </span>
      ) : null}
    </Link>
  );
}
