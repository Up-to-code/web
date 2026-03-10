import Link from "next/link";
import BrandVectorPanel from "../WorkspaceBrand/BrandVectorPanel";
import type { BrokerPresence } from "./BrokerPresenceChip";
import BrokerPresenceChip from "./BrokerPresenceChip";

type PropertyCardSpec = {
  label: string;
  value: string;
};

/**
 * WHY:   Multiple workspace zones need one reusable real-estate card instead of bespoke text blocks.
 * WHAT:  Renders an image-first property card with specs, summary, and optional broker presence chips.
 * HOW:   Defaults to a branded vector media panel while keeping a photo fallback path for identity-heavy cases.
 */
export default function PropertyCard({
  href,
  image,
  title,
  location,
  priceLabel,
  summary,
  specs,
  brokers,
  footer,
  mediaMode = "brand",
  density = "compact",
}: {
  href?: string;
  image: string;
  title: string;
  location: string;
  priceLabel: string;
  summary: string;
  specs: PropertyCardSpec[];
  brokers?: BrokerPresence[];
  footer?: React.ReactNode;
  mediaMode?: "brand" | "photo";
  density?: "compact" | "detail";
}) {
  const accent =
    brokers && brokers.some((broker) => broker.state === "client-linked")
      ? "blue"
      : brokers && brokers.some((broker) => broker.state === "qualified")
        ? "emerald"
        : "slate";

  const Content = (
    <article
      className={`overflow-hidden border border-slate-200 bg-white transition hover:-translate-y-0.5 hover:border-blue-200 ${density === "detail" ? "w-full max-w-[340px]" : "w-full max-w-[300px]"
        }`}
    >
      <BrandVectorPanel
        title={title}
        subtitle={location}
        accent={accent}
        imageSrc={image}
        imageAlt={title}
        imageMode={mediaMode === "photo" ? "photo" : "vector"}
      />

      <div className="space-y-5 p-5">
        <div className="flex items-start justify-between gap-4">
          <p className="text-sm font-medium leading-7 text-slate-600">{summary}</p>
          <div className="shrink-0 border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-black text-blue-700">{priceLabel}</div>
        </div>

        <div className="grid gap-px overflow-hidden border border-slate-200 bg-slate-200 sm:grid-cols-4">
          {specs.map((spec) => (
            <div key={spec.label} className="bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-3 py-3">
              <div className="text-[11px] font-black tracking-[0.2em] text-slate-400">{spec.label}</div>
              <div className="mt-1 text-sm font-black text-slate-950">{spec.value}</div>
            </div>
          ))}
        </div>

        {brokers && brokers.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {brokers.map((broker) => (
              <BrokerPresenceChip key={broker.id} broker={broker} />
            ))}
          </div>
        ) : null}

        {footer ? <div>{footer}</div> : null}
      </div>
    </article>
  );

  if (!href) {
    return Content;
  }

  return <Link href={href}>{Content}</Link>;
}
