import PropertyCard from "../../../_components/Visuals/PropertyCard";
import ZonePageIntro from "../../../_components/ZoneShell/ZonePageIntro";
import type { OfferMarketplaceItem } from "../mockData";

/**
 * WHY:   Offer detail should merge project, broker, and demand context into one visually rich workspace page.
 * WHAT:  Renders a property-style hero card with the related broker and operational context beside it.
 * HOW:   Reuses the shared property card and complements it with a lightweight relationship panel.
 */
export default function OfferDetailPage({ offer }: { offer: OfferMarketplaceItem }) {
  return (
    <div className="flex min-h-full flex-col">
      <ZonePageIntro eyebrow="العروض" title={offer.title} description={offer.summary} />

      <div className="grid gap-6 px-6 py-6 lg:grid-cols-[1.35fr_0.65fr] lg:px-8 lg:py-8">
        <PropertyCard
          image={offer.image}
          title={offer.project.title}
          location={offer.location}
          priceLabel={offer.priceLabel}
          summary={offer.summary}
          specs={[
            { label: "النوع", value: offer.propertyType },
            { label: "الغرف", value: offer.project.rooms },
            { label: "الحمامات", value: offer.project.baths },
            { label: "المساحة", value: offer.project.area },
          ]}
          brokers={offer.broker ? [offer.broker] : []}
        />

        <aside className="space-y-4">
          <section className="border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-5">
            <div className="text-xs font-black tracking-[0.22em] text-blue-700">المالك</div>
            <div className="mt-3 text-lg font-black text-slate-950">{offer.ownerLabel}</div>
          </section>
          <section className="border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-5">
            <div className="text-xs font-black tracking-[0.22em] text-blue-700">مؤشر الرحلة</div>
            <div className="mt-3 text-sm font-medium leading-7 text-slate-600">
              {offer.demandLabel ??
                (offer.kind === "developer"
                  ? "عرض مطور مباشر"
                  : offer.kind === "broker"
                    ? "ربط broker-to-broker"
                    : offer.kind === "inbox"
                      ? "مهمة تشغيلية عاجلة"
                      : "مطابقة طلب عميل")}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
