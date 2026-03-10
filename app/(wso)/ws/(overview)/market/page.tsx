import { redirect } from "next/navigation";
import AgMarketChart from "@/components/shared/ag-aui/AgMarketChart";
import AgMarketHeatmap from "@/components/shared/ag-aui/AgMarketHeatmap";
import AgMarketIntelligence from "@/components/shared/ag-aui/AgMarketIntelligence";
import ZonePageIntro from "../../_components/ZoneShell/ZonePageIntro";
import BrandStatStrip from "../../_components/WorkspaceBrand/BrandStatStrip";
import { requireWorkspaceData } from "../../_lib/workspaceData";

const AREA_INSIGHTS = [
  {
    city: "الرياض",
    area: "الملقا",
    demand: "حار",
    average: "10,500 ر.س/م²",
    mix: "3 غرف + 4 حمامات",
    sell: "42 يوم",
  },
  {
    city: "الرياض",
    area: "حطين",
    demand: "دافئ",
    average: "11,200 ر.س/م²",
    mix: "4 غرف + 5 حمامات",
    sell: "61 يوم",
  },
  {
    city: "جدة",
    area: "أبحر",
    demand: "حار",
    average: "9,400 ر.س/م²",
    mix: "3 غرف + إطلالة بحرية",
    sell: "55 يوم",
  },
];

/**
 * WHY:   Developers need one overview page for demand and market intelligence under the workspace shell.
 * WHAT:  Renders the developer market overview with area-level insights and existing AG market components.
 * HOW:   Restricts the page to developer-style roles and composes it from existing AG-UI analytics cards plus local insight tiles.
 */
export default async function WorkspaceMarketPage() {
  const workspace = await requireWorkspaceData("/ws/market");
  if (!["developer", "RED", "admin"].includes(workspace.session.role ?? "")) {
    redirect("/ws");
  }

  return (
    <div className="flex min-h-full flex-col">
      <ZonePageIntro
        eyebrow="ذكاء السوق"
        title="مركز قراءة السوق"
        description="رؤية فورية للمدن والأحياء والطلب والأسعار لمساعدة المطور على تحديد المنتج والوحدة والسعر الأنسب."
      />
      <div className="space-y-6 px-6 py-6 lg:px-8 lg:py-8">
        <BrandStatStrip
          items={[
            { label: "أكثر مدينة طلباً", value: "الرياض", tone: "blue" },
            { label: "أكثر فئة مطلوبة", value: "3 غرف" },
            { label: "أسرع بيع", value: "42 يوم" },
            { label: "متوسط السعر", value: "10,500 ر.س/م²" },
          ]}
        />

        <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
          <AgMarketIntelligence />
          <AgMarketChart
            title="اتجاه الطلب في المدن"
            trend="+14.2%"
            data={[45, 61, 58, 72, 79, 88, 94]}
          />
        </div>

        <AgMarketHeatmap />

        <section className="space-y-4">
          <h2 className="text-xl font-black text-slate-950">الأحياء والفرص</h2>
          <div className="flex flex-wrap gap-4">
            {AREA_INSIGHTS.map((item) => (
              <article key={`${item.city}-${item.area}`} className="w-full max-w-[300px] border border-slate-200 bg-white p-4">
                <div className="text-[10px] font-black tracking-[0.18em] text-blue-700">{item.city}</div>
                <div className="mt-2 text-lg font-black text-slate-950">{item.area}</div>
                <div className="mt-4 grid gap-2 text-sm font-medium text-slate-600">
                  <div>الحرارة: {item.demand}</div>
                  <div>السعر: {item.average}</div>
                  <div>أفضل مزيج: {item.mix}</div>
                  <div>سرعة البيع: {item.sell}</div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
