"use client";

import { useState } from "react";
import type { OrganizationInviteDisplay, OrganizationMemberDisplay } from "@/app/(wso)/ws/_lib/entities";

/**
 * WHY:   Organization members need a practical management surface before backend role-mutation support is added.
 * WHAT:  Renders current members plus pending invites and supports local-only role reassignment in the UI.
 * HOW:   Starts from server-rendered data and keeps demo role changes entirely in local state.
 */
export default function MembersWorkspace({
  initialMembers,
  invites,
}: {
  initialMembers: OrganizationMemberDisplay[];
  invites: OrganizationInviteDisplay[];
}) {
  const [members, setMembers] = useState(initialMembers);

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {members.map((member) => (
          <article key={member.id} className="border border-slate-200 bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-base font-black text-slate-950">{member.name}</div>
                <div className="mt-1 text-sm font-medium text-slate-500">{member.email}</div>
              </div>
              <span className="border border-blue-200 bg-blue-50 px-2 py-1 text-[10px] font-black tracking-[0.16em] text-blue-700">
                {member.statusLabel}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {(["manager", "member", "viewer"] as const).map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() =>
                    setMembers((current) =>
                      current.map((entry) => (entry.id === member.id ? { ...entry, role } : entry)),
                    )
                  }
                  className={`border px-3 py-2 text-[10px] font-black tracking-[0.18em] ${
                    member.role === role
                      ? "border-blue-500 bg-blue-500 text-white"
                      : "border-slate-200 bg-white text-slate-600"
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-black text-slate-950">الدعوات المعلقة</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {invites.map((invite) => (
            <article key={invite.id} className="border border-slate-200 bg-white p-4">
              <div className="text-sm font-black text-slate-950">{invite.email}</div>
              <div className="mt-2 text-xs font-medium text-slate-500">تنتهي {invite.expiresLabel}</div>
              <div className="mt-4 flex items-center justify-between">
                <span className="border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-black tracking-[0.16em] text-slate-600">
                  {invite.role}
                </span>
                <span className="text-[10px] font-black tracking-[0.16em] text-blue-700">{invite.status}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
