import PersonCard from "../../../_components/Visuals/PersonCard";
import ZonePageIntro from "../../../_components/ZoneShell/ZonePageIntro";
import type { OfferMarketplaceItem } from "../mockData";

/**
 * WHY:   Client-demand matching should feel visual and comparable, not like a text list of requirements.
 * WHAT:  Shows client-driven opportunities as property cards with budget and relation context.
 * HOW:   Filters the shared offer dataset by `client` kind and renders the shared offer card grid.
 */
export default function ClientMatchesPage({ items }: { items: OfferMarketplaceItem[] }) {
  const clientItems = items.filter((item) => item.kind === "client");

  return (
    <div className="flex min-h-full flex-col">
      <ZonePageIntro
        eyebrow="العروض"
        title="احتياجات العملاء"
        description="طلبات عملاء مرتبطة بمشاريع ووسطاء محتملين ضمن بطاقات قابلة للمقارنة."
      />
      <div className="px-6 py-6 lg:px-8 lg:py-8">
        <div className="flex flex-wrap gap-4">
          {clientItems.map((item) => (
            <PersonCard
              key={item.id}
              person={{
                id: `${item.id}-client`,
                type: "client",
                name: item.ownerLabel,
                title: "طلب عميل",
                avatarImage:
                  "https://images.unsplash.com/photo-1546961329-78bef0414d7c?auto=format&fit=crop&w=320&q=80",
                avatarLabel: "ع",
                location: item.location,
                summary: item.summary,
                stageLabel: item.demandLabel ?? "احتياج نشط",
                badges: ["vip"],
                relation: {
                  project: { id: item.project.id, title: item.project.title, location: item.location },
                  unit: item.unit ?? null,
                },
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
