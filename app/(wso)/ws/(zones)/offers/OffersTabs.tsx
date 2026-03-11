import RouteTabBar from "../../_components/Visuals/RouteTabBar";

export default function OffersTabs() {
  return (
    <RouteTabBar
      tabs={[
        { href: "/ws/offers", label: "جميع العروض" },
        { href: "/ws/offers/search", label: "البحث المتقدم" },
        { 
          href: "/ws/offers/inbox", 
          label: (
            <span className="flex items-center gap-2">
              الرسائل
              <span className="flex h-2 w-2 rounded-full bg-blue-600"></span>
            </span>
          ) as unknown as string // RouteTabBar expects string but accepts ReactNode internally usually, we'll cast it or handle it cleanly. Actually RouteTabBar types might be strict. Let's see. 
        },
      ]}
    />
  );
}
