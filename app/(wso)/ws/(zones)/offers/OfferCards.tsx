import Link from "next/link";
import PropertyCard from "../../_components/Visuals/PropertyCard";
import type { OfferMarketplaceItem } from "./mockData";

/**
 * WHY:   The offers zone needs one reusable visual card composition across all of its route-backed tabs.
 * WHAT:  Renders property-style offer cards with related broker and demand context.
 * HOW:   Maps the shared offer item shape into the reusable property card primitive.
 */
export default function OfferCards({
  items,
}: {
  items: OfferMarketplaceItem[];
}) {
  return (
    <section className="flex flex-wrap gap-4">
      {items.map((item) => (
        <PropertyCard
          key={item.id}
          image={item.image}
          title={item.project.title}
          location={item.location}
          priceLabel={item.priceLabel}
          summary={item.summary}
          specs={[
            { label: "النوع", value: item.propertyType },
            { label: "الغرف", value: item.project.rooms },
            { label: "الحمامات", value: item.project.baths },
            { label: "المساحة", value: item.project.area },
          ]}
          brokers={item.broker ? [item.broker] : []}
          density="compact"
          footer={
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="text-sm font-black text-slate-950">{item.title}</div>
              <div className="text-xs font-black uppercase tracking-widest text-blue-600">
                {item.demandLabel ?? item.ownerLabel}
              </div>
              <Link href={`/ws/offers/${item.id}`} className="text-xs font-black uppercase tracking-widest text-blue-600">
                التفاصيل
              </Link>
            </div>
          }
        />
      ))}
    </section>
  );
}
