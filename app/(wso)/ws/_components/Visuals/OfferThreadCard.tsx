import type { OfferThreadItem } from "../../_lib/entities";

/**
 * WHY:   The offers inbox should represent sender-recipient threads instead of generic task cards.
 * WHAT:  Renders one compact offer thread with direction, linked project or unit, status, and next action.
 * HOW:   Uses a dense 300px-friendly card shell so inbox browsing stays operational rather than document-heavy.
 */
export default function OfferThreadCard({
  thread,
}: {
  thread: OfferThreadItem;
}) {
  const statusTone =
    thread.status === "approved"
      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
      : thread.status === "awaiting-response"
        ? "border-amber-200 bg-amber-50 text-amber-700"
        : thread.status === "completed"
          ? "border-blue-200 bg-blue-50 text-blue-700"
          : "border-slate-200 bg-slate-50 text-slate-600";

  return (
    <article className="w-full max-w-[300px] border border-slate-200 bg-white">
      <div className="space-y-4 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-[10px] font-black tracking-[0.2em] text-blue-700">خيط ربط</div>
            <h3 className="mt-2 text-base font-black text-slate-950">{thread.subject}</h3>
          </div>
          <div className={`border px-2 py-1 text-[9px] font-black tracking-[0.16em] ${statusTone}`}>
            {thread.status}
          </div>
        </div>

        <div className="grid gap-2 text-sm font-medium text-slate-600">
          <div>من: {thread.sender.name}</div>
          <div>إلى: {thread.recipient.name}</div>
          <div>المشروع: {thread.relation.project?.title ?? "غير محدد"}</div>
          <div>الوحدة: {thread.relation.unit?.label ?? "على مستوى المشروع"}</div>
        </div>

        <p className="text-sm font-medium leading-6 text-slate-600">{thread.summary}</p>

        <div className="border-t border-slate-200 pt-3">
          <div className="text-[10px] font-black tracking-[0.18em] text-slate-400">آخر تحديث</div>
          <div className="mt-1 text-sm font-black text-slate-950">{thread.lastUpdate}</div>
          <div className="mt-2 text-[11px] font-medium text-blue-700">{thread.nextAction}</div>
        </div>
      </div>
    </article>
  );
}
