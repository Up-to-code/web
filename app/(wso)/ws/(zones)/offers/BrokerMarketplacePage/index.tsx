import PersonCard, { brokerPresenceToPersonCard } from "../../../_components/Visuals/PersonCard";
import ZonePageIntro from "../../../_components/ZoneShell/ZonePageIntro";
import type { OfferMarketplaceItem } from "../mockData";

/**
 * WHY:   Broker collaboration deserves a dedicated visual view because the broker profile is part of the decision.
 * WHAT:  Shows broker-to-broker collaboration opportunities as property/broker hybrid cards.
 * HOW:   Filters the shared offer dataset by `broker` kind and reuses the shared visual card grid.
 */
export default function BrokerMarketplacePage({ items }: { items: OfferMarketplaceItem[] }) {
  const brokerItems = items.filter((item) => item.kind === "broker");

  return (
    <div className="flex min-h-full flex-col">
      <ZonePageIntro
        eyebrow="العروض"
        title="تعاون الوسطاء"
        description="عروض ربط بين وسطاء يملكون عميلاً أو مشروعاً مع عرض واضح للصورة والمواصفات وهوية الوسيط."
      />
      <div className="px-6 py-6 lg:px-8 lg:py-8">
        <div className="flex flex-wrap gap-4">
          {brokerItems.map((item) =>
            item.broker ? (
              <PersonCard
                key={item.id}
                person={{
                  ...brokerPresenceToPersonCard(item.broker),
                  summary: item.summary,
                  relation: {
                    project: { id: item.project.id, title: item.project.title, location: item.location },
                    unit: item.unit ?? null,
                    stageLabel: item.demandLabel ?? "عرض وسيط",
                  },
                }}
                footer={
                  <div className="border-t border-slate-200 pt-3">
                    <div className="text-[10px] font-black tracking-[0.18em] text-slate-400">موضوع العرض</div>
                    <div className="mt-1 text-sm font-black text-slate-950">{item.title}</div>
                  </div>
                }
              />
            ) : null,
          )}
        </div>
      </div>
    </div>
  );
}
