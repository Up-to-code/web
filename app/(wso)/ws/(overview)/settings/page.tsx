import ZonePageIntro from "../../_components/ZoneShell/ZonePageIntro";
import BrandStatStrip from "../../_components/WorkspaceBrand/BrandStatStrip";
import { getWorkspaceOrganizationTeam } from "../../_lib/organizationTeam";

/**
 * WHY:   Organization settings need a top-level summary page under the overview shell.
 * WHAT:  Renders the primary organization summary plus counts for members and pending invites.
 * HOW:   Loads the current organization team data from the shared settings helper.
 */
export default async function WorkspaceSettingsPage() {
  const { organization, members, invites } = await getWorkspaceOrganizationTeam();

  return (
    <div className="flex min-h-full flex-col">
      <ZonePageIntro
        eyebrow="الإعدادات"
        title="إعدادات المنظمة"
        description="إدارة الأعضاء، الدعوات، والأدوار من داخل مساحة العمل."
      />
      <div className="space-y-6 px-6 py-6 lg:px-8 lg:py-8">
        <BrandStatStrip
          items={[
            { label: "المنظمة", value: organization?.name ?? "بدون منظمة", tone: "blue" },
            { label: "الأعضاء", value: members.length },
            { label: "الدعوات", value: invites.length },
            { label: "الحالة", value: organization?.status ?? "غير متوفر" },
          ]}
        />

        <div className="grid gap-6 lg:grid-cols-2 mt-8">
          <section className="border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-black text-slate-950 mb-4">تعديل بيانات المنظمة</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-xs font-black tracking-widest text-slate-500 mb-2">الاسم</label>
                <input
                  type="text"
                  defaultValue={organization?.name ?? ""}
                  className="w-full border-2 border-slate-200 px-4 py-3 text-sm font-bold text-slate-900 transition focus:border-blue-600 outline-none"
                />
              </div>
              <button type="button" className="bg-slate-950 px-6 py-3 text-xs font-black tracking-widest text-white transition hover:bg-blue-600">
                حفظ التعديلات
              </button>
            </form>
          </section>

          <section className="border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-black text-slate-950 mb-4">دعوة عضو جديد</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-xs font-black tracking-widest text-slate-500 mb-2">البريد الإلكتروني</label>
                <input
                  type="email"
                  placeholder="name@domain.com"
                  className="w-full border-2 border-slate-200 px-4 py-3 text-sm font-bold text-slate-900 transition focus:border-blue-600 outline-none text-left"
                  dir="ltr"
                />
              </div>
              <div>
                <label className="block text-xs font-black tracking-widest text-slate-500 mb-2">الدور</label>
                <select className="w-full border-2 border-slate-200 px-4 py-3 text-sm font-bold text-slate-900 transition outline-none appearance-none">
                  <option>مدير (Admin)</option>
                  <option>مستخدم (Member)</option>
                  <option>مراقب (Viewer)</option>
                </select>
              </div>
              <button type="button" className="bg-blue-600 px-6 py-3 text-xs font-black tracking-widest text-white transition hover:bg-slate-950 w-full">
                إرسال دعوة
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
