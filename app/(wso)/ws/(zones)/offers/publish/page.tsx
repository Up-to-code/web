import AgApprovalCard from "@/components/shared/ag-aui/AgApprovalCard";
import AgPropertyForm from "@/components/shared/ag-aui/AgPropertyForm";
import ZonePageIntro from "../../../_components/ZoneShell/ZonePageIntro";

/**
 * WHY:   Offers need a direct-mode publish route separate from the browsing marketplace tabs.
 * WHAT:  Renders the mock offer publish workflow for a selected project or unit.
 * HOW:   Uses the AG property form as draft input and follows it with a publish approval summary.
 */
export default function PublishOfferPage() {
  return (
    <div className="flex min-h-full flex-col">
      <ZonePageIntro
        eyebrow="العروض"
        title="نشر عرض"
        description="حدد المشروع أو الوحدة، العمولة، والوصف قبل طرح العرض داخل السوق."
      />
      <div className="grid gap-6 px-6 py-6 lg:grid-cols-[1fr_340px] lg:px-8 lg:py-8">
        <div className="max-w-3xl">
          <AgPropertyForm />
        </div>
        <AgApprovalCard
          title="مراجعة العرض قبل النشر"
          description="سيتم عرض المشروع على الوسطاء المعتمدين بعد التأكد من نسبة العمولة وتفاصيل الوحدة."
          type="info"
        />
      </div>
    </div>
  );
}
