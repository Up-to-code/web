"use client";

import Link from "next/link";
import { useState } from "react";
import BrandEmptyState from "../../../_components/WorkspaceBrand/BrandEmptyState";
import FilterChipBar from "../../../_components/Visuals/FilterChipBar";
import PersonCard, {
  brokerPresenceToPersonCard,
} from "../../../_components/Visuals/PersonCard";
import PropertyCard from "../../../_components/Visuals/PropertyCard";
import type { CrmClientRecord } from "../mockData";
import ZonePageIntro from "../../../_components/ZoneShell/ZonePageIntro";

/**
 * WHY:   The CRM client index should be segmented visually instead of reading like a flat text list.
 * WHAT:  Renders client cards with chip-based filtering by relationship completeness.
 * HOW:   Keeps the selected segment in local state while the route stays SSR-backed.
 */
export default function ClientsPage({
  clients,
}: {
  clients: CrmClientRecord[];
}) {
  const [filterKey, setFilterKey] = useState("all");

  const visibleClients = clients.filter((client) => {
    if (filterKey === "all") return true;
    if (filterKey === "unlinked") return !client.project && !client.broker;
    if (filterKey === "project") return Boolean(client.project) && !client.broker;
    if (filterKey === "full") return Boolean(client.project) && Boolean(client.broker);
    return true;
  });

  return (
    <div className="flex min-h-full flex-col">
      <ZonePageIntro
        eyebrow="إدارة العملاء"
        title="قائمة العملاء"
        description="بطاقات مرئية للعملاء مع المشروع والوسيط المرتبطين بهم أو حالة الفراغ إذا لم يوجد أي ربط."
      />

      <div className="space-y-6 px-6 py-6 lg:px-8 lg:py-8">
        <FilterChipBar
          chips={[
            { key: "all", label: "الكل" },
            { key: "unlinked", label: "بدون روابط" },
            { key: "project", label: "مشروع فقط" },
            { key: "full", label: "مشروع + وسيط" },
          ]}
          activeKey={filterKey}
          onChange={setFilterKey}
        />

        <div className="flex flex-wrap gap-4">
          {visibleClients.map((client) => (
            <PersonCard
              key={client.id}
              person={{
                id: client.id,
                type: client.personType,
                name: client.name,
                title: "عميل داخل القمع",
                avatarImage: client.avatarImage,
                avatarLabel: client.avatarLabel,
                location: client.project?.location,
                summary: client.preference,
                stageLabel: client.stage,
                badges: client.badges,
                relation: {
                  project: client.project,
                  unit: client.unit,
                },
              }}
              footer={
                <div className="space-y-3">
                  {client.project ? (
                    <PropertyCard
                      density="compact"
                      image={client.project.image}
                      title={client.project.title}
                      location={client.project.location}
                      priceLabel={client.budgetLabel}
                      summary={client.notes}
                      specs={[
                        { label: "المرحلة", value: client.stage },
                        { label: "الوحدة", value: client.unit?.label ?? "على مستوى المشروع" },
                      ]}
                    />
                  ) : (
                    <BrandEmptyState title="بدون مشروع" description="لا يوجد مشروع مرتبط بهذا العميل." />
                  )}

                  {client.broker ? (
                    <PersonCard person={brokerPresenceToPersonCard(client.broker)} compact />
                  ) : (
                    <BrandEmptyState title="بدون وسيط" description="لا يوجد وسيط مرتبط بهذا العميل." />
                  )}

                  <Link
                    href={`/ws/crm/clients/${client.id}`}
                    className="block border border-slate-200 bg-slate-50 px-4 py-3 text-center text-[11px] font-black tracking-[0.22em] text-blue-700 transition hover:border-blue-200 hover:bg-blue-50"
                  >
                    فتح التفاصيل
                  </Link>
                </div>
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
