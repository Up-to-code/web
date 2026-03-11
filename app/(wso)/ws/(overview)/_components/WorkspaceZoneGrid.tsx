import InstitutionalGridItem from "@/components/shared/InstitutionalGridItem";
import type { ZoneDescriptor } from "../../_lib/zones";

export default function WorkspaceZoneGrid({
  zones,
}: {
  organizationName: string;
  userName?: string | null;
  zones: ZoneDescriptor[];
}) {
  // Filter to exactly 4 institutional zones for the 4-column protocol
  const protocolZones = zones
    .filter((zone) => ["market", "projects", "offers", "crm"].includes(zone.key))
    .slice(0, 4);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {protocolZones.map((zone) => (
          <InstitutionalGridItem
            key={zone.key}
            href={zone.href}
            label={zone.label}
            description={zone.description || "بروتوكول إدارة المساحة والعمليات"}
            icon={zone.icon}
          />
        ))}
      </div>
    </div>
  );
}
