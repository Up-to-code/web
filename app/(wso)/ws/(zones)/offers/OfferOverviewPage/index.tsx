import BrandStatStrip from "../../../_components/WorkspaceBrand/BrandStatStrip";
import ZonePageIntro from "../../../_components/ZoneShell/ZonePageIntro";
import OfferCards from "../OfferCards";
import type { OfferMarketplaceItem } from "../mockData";

/**
 * WHY:   The offers root route should present a visual first look across all marketplace segments under the tab shell.
 * WHAT:  Renders a mixed overview of developer, broker, client, and inbox items.
 * HOW:   Uses the shared offers card renderer and a non-interactive chip row to communicate the available slices.
 */
export default function OfferOverviewPage({ items }: { items: OfferMarketplaceItem[] }) {
  return (
    <div className="flex min-h-full flex-col">
      <ZonePageIntro
        eyebrow="العروض"
        title="سوق العروض"
        description="واجهة مرئية موحدة للمطورين، الوسطاء، العملاء، وصندوق الربط داخل نفس الرحلة."
      />

      <div className="space-y-6 px-6 py-6 lg:px-8 lg:py-8">
        <BrandStatStrip
          items={[
            { label: "إجمالي العروض", value: items.length, tone: "blue" },
            { label: "عروض مطور", value: items.filter((item) => item.kind === "developer").length },
            { label: "شبكة وسطاء", value: items.filter((item) => item.kind === "broker").length },
            { label: "صندوق الربط", value: items.filter((item) => item.kind === "inbox").length },
          ]}
        />
        <OfferCards items={items} />
      </div>
    </div>
  );
}
