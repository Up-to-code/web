import AgPropertyForm from "@/components/shared/ag-aui/AgPropertyForm";
import ZonePageIntro from "../../../_components/ZoneShell/ZonePageIntro";

/**
 * WHY:   Projects need a direct-mode creation route to complement AI-driven draft creation.
 * WHAT:  Renders the mock create-project flow.
 * HOW:   Reuses the existing AG property form as the initial direct entrypoint.
 */
export default function CreateProjectPage() {
  return (
    <div className="flex min-h-full flex-col">
      <ZonePageIntro
        eyebrow="المشاريع"
        title="إنشاء مشروع"
        description="ابدأ إنشاء مشروع جديد يدوياً أو تابع نفس المخطط لاحقاً عبر المساعد الذكي."
      />
      <div className="px-6 py-6 lg:px-8 lg:py-8">
        <div className="max-w-3xl">
          <AgPropertyForm />
        </div>
      </div>
    </div>
  );
}
