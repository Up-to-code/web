import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import type { ZoneDescriptor } from "../_lib/zones";
import { AIMotionLogo } from "./AIMotion";
import WorkspaceChatInput from "./WorkspaceChatInput";

export default function WorkspaceZoneGrid({
  organizationName,
  userName,
  zones,
}: {
  organizationName: string;
  userName?: string | null;
  zones: ZoneDescriptor[];
}) {
  const visibleZones = zones.filter((zone) => zone.key !== "overview");

  return (
    <div className="flex min-h-[calc(100svh-100px)] flex-col items-center justify-center p-6 pb-28 lg:p-10 lg:pb-32">
      <div className="flex w-full max-w-4xl flex-col items-center justify-center space-y-12">

        {/* Animated Logo */}
        <div className="flex flex-col items-center space-y-6">
          <div className="flex items-center justify-center">
            <AIMotionLogo state="idle" size="hero" floating />
          </div>
          <h1 className="text-4xl font-black tracking-tight text-slate-950">
            كيف يمكنني مساعدتك؟
          </h1>
        </div>

        {/* Chat Input */}
        <WorkspaceChatInput />

        {/* Zone Cards (Quick Actions) */}
        <div className="w-full grid auto-rows-fr gap-4 md:grid-cols-2 xl:grid-cols-4">
          {visibleZones.map((zone) => {
            const Icon = zone.icon;
            return (
              <Link
                key={zone.key}
                href={zone.href}
                className="group flex h-full flex-col justify-between gap-4 border-2 border-slate-200 bg-white/50 px-5 py-5 transition hover:border-blue-600 hover:bg-white"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center border-2 border-slate-200 bg-white text-slate-700 transition group-hover:border-blue-100 group-hover:bg-blue-50 group-hover:text-blue-600">
                      <Icon className="h-5 w-5" />
                    </div>
                    <ChevronLeft className="h-5 w-5 shrink-0 text-slate-300 transition group-hover:text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-base font-black tracking-tight text-slate-950">{zone.label}</h3>
                    <p className="mt-1 text-xs font-bold leading-relaxed text-slate-500 line-clamp-2">{zone.description}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
}
