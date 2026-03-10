import ZonePageIntro from "../../../_components/ZoneShell/ZonePageIntro";
import PersonCard from "../../../_components/Visuals/PersonCard";
import { brokerPresenceToPersonCard } from "../../../_components/Visuals/PersonCard";
import { getOffersMockData } from "../mockData";

/**
 * WHY:   Sending an offer is a separate operational step from publishing it in the marketplace.
 * WHAT:  Renders the mock send-offer route with recipient cards and linked project context.
 * HOW:   Uses the existing broker mock data to show who can receive the offer and what relation it will target.
 */
export default function SendOfferPage() {
  const recipients = getOffersMockData()
    .map((item) => item.broker)
    .filter((broker): broker is NonNullable<typeof broker> => Boolean(broker));

  return (
    <div className="flex min-h-full flex-col">
      <ZonePageIntro
        eyebrow="العروض"
        title="إرسال عرض"
        description="اختر المستلم المناسب للعرض وحدد هل الإرسال على مستوى المشروع أم لوحدة معينة."
      />
      <div className="px-6 py-6 lg:px-8 lg:py-8">
        <div className="flex flex-wrap gap-4">
          {recipients.map((broker) => (
            <PersonCard
              key={broker.id}
              person={brokerPresenceToPersonCard(broker)}
              footer={
                <button className="w-full border border-blue-500 bg-blue-500 px-4 py-3 text-xs font-black tracking-[0.18em] text-white">
                  إرسال العرض
                </button>
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
