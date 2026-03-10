import Link from "next/link";
import ZonePageIntro from "../../../_components/ZoneShell/ZonePageIntro";

const HISTORY_ITEMS = [
  {
    id: "analysis-malqa",
    title: "تحليل عوائد حي الملقا",
    summary: "مراجعة عوائد استثمارية وربطها بمخططات الأسعار والمنافسين.",
    href: "/ws/ai?q=تحليل%20عوائد%20حي%20الملقا",
  },
  {
    id: "deal-review",
    title: "تقييم صفقة شمال الرياض",
    summary: "تقدير احتمالية الإغلاق والعوامل المؤثرة على المخاطر والزمن.",
    href: "/ws/ai?q=تقييم%20صفقة%20شمال%20الرياض",
  },
];

/**
 * WHY:   The AI zone needs a second route in local navigation so the shell behaves like the other zones.
 * WHAT:  Renders a lightweight history screen with reusable entrypoints back into the AI conversation.
 * HOW:   Uses a static local list of recent mock workflows and links each item back into the chat route.
 */
export default function HistoryPage() {
  return (
    <div className="flex min-h-full flex-col">
      <ZonePageIntro
        eyebrow="المساعد الذكي"
        title="السجل"
        description="مسارات عمل وتجارب حديثة يمكن إعادة تشغيلها من شاشة المحادثة."
      />

      <div className="grid gap-4 px-6 py-6 lg:px-8 lg:py-8">
        {HISTORY_ITEMS.map((item) => (
          <Link key={item.id} href={item.href} className="border-2 border-slate-200 bg-white p-5 transition hover:border-blue-600">
            <h2 className="text-lg font-black text-slate-950">{item.title}</h2>
            <p className="mt-2 text-sm font-medium leading-6 text-slate-500">{item.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
