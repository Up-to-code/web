import BrandStatStrip from "../../_components/WorkspaceBrand/BrandStatStrip";
import ZonePageIntro from "../../_components/ZoneShell/ZonePageIntro";
import NotificationCard from "../../_components/Visuals/NotificationCard";

const NOTIFICATIONS = [
  {
    id: "notif-client-link",
    title: "تم ربط عميل جديد بمشروع مالقا ريزيدنس",
    summary: "الوسيط سارة العتيبي نقل العميل محمد الدوسري إلى مرحلة المعاينة النهائية.",
    severity: "success" as const,
    source: "مشروع",
    actionLabel: "افتح المشروع",
  },
  {
    id: "notif-broker-idle",
    title: "وسيط بدون نشاط على فلل النرجس",
    summary: "فهد الشمري ما يزال بدون عميل مرتبط ويحتاج متابعة أو إعادة توزيع.",
    severity: "warning" as const,
    source: "وسيط",
    actionLabel: "راجع التكليفات",
  },
  {
    id: "notif-inbox",
    title: "مهمة جديدة في صندوق الربط",
    summary: "يوجد طلب عميل يحتاج مشروعاً مناسباً خلال 24 ساعة داخل منطقة حطين.",
    severity: "info" as const,
    source: "عروض",
    actionLabel: "افتح صندوق الربط",
  },
];

/**
 * WHY:   Notifications belong to the main workspace chrome and need a dedicated destination page from the navbar.
 * WHAT:  Renders the mock notifications center for `/ws/notifications`.
 * HOW:   Uses the shared visual notification card with a static local feed.
 */
export default function WorkspaceNotificationsPage() {
  return (
    <div className="flex min-h-full flex-col">
      <ZonePageIntro
        eyebrow="الإشعارات"
        title="مركز التنبيهات"
        description="إشعارات تشغيلية مرتبطة بالمشاريع والعروض والعملاء من نفس مساحة العمل."
      />

      <div className="space-y-6 px-6 py-6 lg:px-8 lg:py-8">
        <BrandStatStrip
          items={[
            { label: "إجمالي الإشارات", value: NOTIFICATIONS.length, tone: "blue" },
            { label: "مرتبطة بالمشاريع", value: 1 },
            { label: "مرتبطة بالعروض", value: 1 },
            { label: "مرتبطة بالوسطاء", value: 1 },
          ]}
        />

        <div className="grid gap-4">
          {NOTIFICATIONS.map((item) => (
            <NotificationCard
              key={item.id}
              title={item.title}
              summary={item.summary}
              severity={item.severity}
              source={item.source}
              actionLabel={item.actionLabel}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
