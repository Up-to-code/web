import RouteTabBar from "../../_components/Visuals/RouteTabBar";

/**
 * WHY:   The offers workspace should switch between its first-stage sections through visible route-backed tabs.
 * WHAT:  Renders the tabs for overview, marketplaces, client matches, and inbox/connectors.
 * HOW:   Delegates active-route handling to the shared route tab bar.
 */
export default function OffersTabs() {
  return (
    <RouteTabBar
      tabs={[
        { href: "/ws/offers", label: "نظرة عامة" },
        { href: "/ws/offers/developer-marketplace", label: "سوق المطورين" },
        { href: "/ws/offers/broker-network", label: "تعاون الوسطاء" },
        { href: "/ws/offers/client-matches", label: "احتياجات العملاء" },
        { href: "/ws/offers/inbox", label: "صندوق الربط" },
        { href: "/ws/offers/publish", label: "نشر عرض" },
        { href: "/ws/offers/send", label: "إرسال عرض" },
      ]}
    />
  );
}
