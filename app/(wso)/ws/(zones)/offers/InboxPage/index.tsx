import OfferThreadCard from "../../../_components/Visuals/OfferThreadCard";
import ZonePageIntro from "../../../_components/ZoneShell/ZonePageIntro";
import type { OfferThreadItem } from "../../../_lib/entities";

/**
 * WHY:   The inbox/connectors workflow belongs inside the offers journey and needs its own route-backed tab.
 * WHAT:  Shows sender-recipient connection threads where offers, projects, and units need immediate follow-up.
 * HOW:   Uses a thread-specific card model instead of reusing generic marketplace cards.
 */
export default function InboxPage({ items }: { items: OfferThreadItem[] }) {
  return (
    <div className="flex min-h-full flex-col">
      <ZonePageIntro
        eyebrow="العروض"
        title="صندوق الربط"
        description="خيوط ربط بين مرسل العرض ومستلمه مع المشروع أو الوحدة المرتبطة والحالة التالية المطلوبة."
      />
      <div className="px-6 py-6 lg:px-8 lg:py-8">
        <div className="flex flex-wrap gap-4">
          {items.map((item) => (
            <OfferThreadCard key={item.id} thread={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
