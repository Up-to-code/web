"use client";

import { useState } from "react";

/**
 * WHY:   The workspace settings area needs a simple invite flow that maps to the existing team-invite API.
 * WHAT:  Renders the invite form and posts it to `/api/workspace/team-invites`.
 * HOW:   Keeps submission state local and shows the result inline without leaving the page.
 */
export default function InviteMemberForm() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"manager" | "member" | "viewer">("member");
  const [status, setStatus] = useState<string | null>(null);

  return (
    <form
      className="grid gap-4 border border-slate-200 bg-white p-5 md:max-w-xl"
      onSubmit={async (event) => {
        event.preventDefault();
        setStatus("جاري إرسال الدعوة...");
        const response = await fetch("/api/workspace/team-invites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, role }),
        });
        if (!response.ok) {
          setStatus("تعذر إرسال الدعوة.");
          return;
        }
        setEmail("");
        setRole("member");
        setStatus("تم إرسال الدعوة بنجاح.");
      }}
    >
      <div>
        <label className="text-xs font-black tracking-[0.18em] text-slate-500">البريد الإلكتروني</label>
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mt-2 w-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-950 outline-none"
          placeholder="name@company.com"
          type="email"
          dir="ltr"
        />
      </div>
      <div>
        <label className="text-xs font-black tracking-[0.18em] text-slate-500">الدور</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {(["manager", "member", "viewer"] as const).map((entry) => (
            <button
              key={entry}
              type="button"
              onClick={() => setRole(entry)}
              className={`border px-4 py-2 text-[10px] font-black tracking-[0.18em] ${
                role === entry ? "border-blue-500 bg-blue-500 text-white" : "border-slate-200 bg-white text-slate-600"
              }`}
            >
              {entry}
            </button>
          ))}
        </div>
      </div>
      <button
        type="submit"
        className="inline-flex w-fit items-center justify-center border border-blue-500 bg-blue-500 px-5 py-3 text-xs font-black tracking-[0.18em] text-white"
      >
        إرسال الدعوة
      </button>
      {status ? <div className="text-sm font-medium text-slate-600">{status}</div> : null}
    </form>
  );
}
