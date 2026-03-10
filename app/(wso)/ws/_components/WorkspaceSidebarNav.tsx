"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/ws", label: "لوحة العمل", icon: LayoutGrid },
  { href: "/ws/ai", label: "الذكاء الاصطناعي", icon: Sparkles },
];

export default function WorkspaceSidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-3">
      {items.map((item) => {
        const Icon = item.icon;
        const active =
          pathname === item.href ||
          (item.href !== "/ws" && pathname.startsWith(`${item.href}/`));

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center justify-between border-2 px-4 py-3 text-xs font-black uppercase tracking-widest transition rounded-none",
              active
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-transparent bg-transparent text-slate-500 hover:border-white/10 hover:bg-white/5 hover:text-white",
            )}
          >
            <span className="flex items-center gap-3">
              <Icon className="h-3.5 w-3.5" />
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
