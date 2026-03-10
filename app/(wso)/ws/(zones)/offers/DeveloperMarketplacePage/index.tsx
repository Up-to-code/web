import AgProjectPortfolio from "@/components/shared/ag-aui/AgProjectPortfolio";
import ZonePageIntro from "../../../_components/ZoneShell/ZonePageIntro";
import OfferCards from "../OfferCards";
import type { OfferMarketplaceItem } from "../mockData";

/**
 * WHY:   Developer offers need their own visual marketplace surface inside the tabbed offers layout.
 * WHAT:  Shows only developer-owned offer cards.
 * HOW:   Filters the shared mock dataset by `developer` kind and delegates rendering to the shared offers card grid.
 */
export default function DeveloperMarketplacePage({ items }: { items: OfferMarketplaceItem[] }) {
  return (
    <div className="flex min-h-full flex-col">
      <ZonePageIntro
        eyebrow="العروض"
        title="سوق المطورين"
        description="بطاقات مشاريع مطروحة من المطورين مع الصورة، المواصفات، والوسيط المرتبط إن وجد."
      />
      <div className="space-y-6 px-6 py-6 lg:px-8 lg:py-8">
        <AgProjectPortfolio />
        <OfferCards items={items.filter((item) => item.kind === "developer")} />
      </div>
    </div>
  );
}
