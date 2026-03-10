import { requireWorkspaceData } from "../../_lib/workspaceData";

/**
 * WHY:   The profile screen still lives under the overview workspace chrome after the shell split.
 * WHAT:  Renders the signed-in user's basic identity and current workspace role.
 * HOW:   Loads the workspace snapshot and formats the profile panel locally.
 */
export default async function WorkspaceMePage() {
  const workspace = await requireWorkspaceData("/ws/me");

  return (
    <div className="space-y-8 p-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-black tracking-tight text-slate-950">الملف الشخصي</h1>
        <p className="text-sm font-medium text-slate-500">إدارة معلومات الحساب والإعدادات الشخصية.</p>
      </header>

      <div className="max-w-2xl rounded-3xl border border-slate-200 bg-white p-8">
        <div className="mb-8 flex items-center gap-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-950 text-3xl font-black text-white">
            {workspace.user.name?.[0] || workspace.user.email?.[0]}
          </div>
          <div>
            <div className="text-2xl font-black text-slate-950">{workspace.user.name || "مستخدم أنان"}</div>
            <div className="text-sm font-medium text-slate-500">{workspace.user.email}</div>
          </div>
        </div>

        <div className="grid gap-4 border-t border-slate-100 pt-8">
          <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-bold">
            <span className="text-xs uppercase tracking-widest text-slate-500">الدور الحالي</span>
            <span className="text-sm text-slate-950">{workspace.session.role === "developer" ? "مطور" : "وسيط"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
