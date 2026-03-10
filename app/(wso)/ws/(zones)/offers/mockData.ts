import type { BrokerPresence } from "../../_components/Visuals/BrokerPresenceChip";
import type { OfferThreadItem, PersonRelation, UnitReference } from "../../_lib/entities";

export type OfferMarketplaceItem = {
  id: string;
  title: string;
  kind: "developer" | "broker" | "client" | "inbox";
  image: string;
  location: string;
  priceLabel: string;
  propertyType: string;
  ownerLabel: string;
  summary: string;
  project: {
    id: string;
    title: string;
    rooms: string;
    baths: string;
    area: string;
  };
  unit?: UnitReference | null;
  relation?: PersonRelation | null;
  broker?: BrokerPresence | null;
  demandLabel?: string | null;
};

const SHARED_BROKER: BrokerPresence = {
  id: "broker-sara",
  name: "سارة العتيبي",
  avatarLabel: "س",
  personType: "broker",
  badges: ["verified"],
  avatarImage:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=320&q=80",
  state: "client-linked",
  title: "وسيط استثماري أول",
  city: "الرياض",
  projectTitle: "مالقا ريزيدنس",
  unitLabel: "A-12",
  clientName: "محمد الدوسري",
  summary: "تتابع العميل النهائي وتنسق المعاينات مع المطور والوسطاء المشاركين.",
  relation: {
    project: { id: "malqa-residences", title: "مالقا ريزيدنس", location: "الملقا، الرياض" },
    unit: { id: "malqa-a12", label: "A-12", bedrooms: 3, bathrooms: 4, area: "228 م²", priceLabel: "2.35M ر.س" },
    stageLabel: "عرض مرسل",
  },
};

const OFFER_ITEMS: OfferMarketplaceItem[] = [
  {
    id: "offer-malqa-developer",
    title: "عرض تطويري مفتوح",
    kind: "developer",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
    location: "الملقا، الرياض",
    priceLabel: "2.1M - 3.4M ر.س",
    propertyType: "شقق وتاون هاوس",
    ownerLabel: "شركة ألف للتطوير",
    summary: "عرض مطور مفتوح مع عمولة مرنة وتوزيع للمخزون على الوسطاء المؤهلين.",
    project: {
      id: "malqa-residences",
      title: "مالقا ريزيدنس",
      rooms: "4 غرف",
      baths: "5 حمامات",
      area: "280 م²",
    },
    unit: null,
    broker: SHARED_BROKER,
    demandLabel: null,
  },
  {
    id: "offer-broker-collab",
    title: "تعاون وسيط لعميل جاهز",
    kind: "broker",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    location: "النرجس، الرياض",
    priceLabel: "3.8M ر.س",
    propertyType: "فلل",
    ownerLabel: "الوسيط سارة العتيبي",
    summary: "وسيط يملك العميل ويبحث عن طرف يملك المشروع لإغلاق الصفقة بسرعة.",
    project: {
      id: "narges-villas",
      title: "فلل النرجس",
      rooms: "5 غرف",
      baths: "6 حمامات",
      area: "410 م²",
    },
    unit: { id: "narges-v1", label: "Villa-1", bedrooms: 5, bathrooms: 6, area: "410 م²", priceLabel: "3.8M ر.س" },
    broker: SHARED_BROKER,
    demandLabel: "عميل جاهز للمعاينة هذا الأسبوع",
  },
  {
    id: "offer-client-match",
    title: "طلب عميل استثماري",
    kind: "client",
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=80",
    location: "شمال الرياض",
    priceLabel: "حتى 2.6M ر.س",
    propertyType: "شقة أو تاون هاوس",
    ownerLabel: "ملف عميل عبر وسيط معتمد",
    summary: "طلب عميل يبحث عن عائد واضح وربط مباشر بالمطور أو الوسيط المناسب.",
    project: {
      id: "market-demand",
      title: "مطابقة متعددة المشاريع",
      rooms: "3 غرف",
      baths: "4 حمامات",
      area: "220 م²",
    },
    unit: null,
    broker: SHARED_BROKER,
    demandLabel: "استثمار + جاهزية تمويل",
  },
  {
    id: "offer-inbox-connector",
    title: "مهمة ربط عاجلة",
    kind: "inbox",
    image:
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80",
    location: "حطين، الرياض",
    priceLabel: "3.1M ر.س",
    propertyType: "دوبلكس",
    ownerLabel: "صندوق الموصلات",
    summary: "عميل مرتبط بوسيط ويحتاج مشروعاً مناسباً خلال 24 ساعة لإكمال الرحلة.",
    project: {
      id: "hatteen-hills",
      title: "حطين هيلز",
      rooms: "4 غرف",
      baths: "5 حمامات",
      area: "300 م²",
    },
    unit: { id: "hatteen-c3", label: "C-3", bedrooms: 4, bathrooms: 5, area: "300 م²", priceLabel: "3.1M ر.س" },
    broker: SHARED_BROKER,
    demandLabel: "متابعة فورية",
  },
];

const OFFER_THREADS: OfferThreadItem[] = [
  {
    id: "thread-malqa-sent",
    subject: "إرسال عرض مالقا ريزيدنس إلى سارة العتيبي",
    status: "awaiting-response",
    sender: { name: "شركة ألف للتطوير", type: "developer" },
    recipient: { name: "سارة العتيبي", type: "broker" },
    relation: {
      project: { id: "malqa-residences", title: "مالقا ريزيدنس", location: "الملقا، الرياض" },
      unit: { id: "malqa-a12", label: "A-12", bedrooms: 3, bathrooms: 4, area: "228 م²", priceLabel: "2.35M ر.س" },
      stageLabel: "بانتظار الرد",
    },
    lastUpdate: "منذ 18 دقيقة",
    nextAction: "متابعة قبول العرض وتحديد نسبة الوسيط",
    summary: "تم إرسال عرض لوحدة محددة داخل المشروع مع عمولة مبدئية 2.5%.",
  },
  {
    id: "thread-broker-match",
    subject: "طلب ربط عميل جاهز بفلل النرجس",
    status: "new",
    sender: { name: "سارة العتيبي", type: "broker" },
    recipient: { name: "روان السبيعي", type: "broker" },
    relation: {
      project: { id: "narges-villas", title: "فلل النرجس", location: "النرجس، الرياض" },
      unit: { id: "narges-v1", label: "Villa-1", bedrooms: 5, bathrooms: 6, area: "410 م²", priceLabel: "3.8M ر.س" },
      stageLabel: "ربط أولي",
    },
    lastUpdate: "منذ 5 دقائق",
    nextAction: "مراجعة توفر الوحدة وترتيب معاينة",
    summary: "وسيط يملك عميل جاهز ويريد ربطه بوحدة مناسبة داخل المشروع.",
  },
  {
    id: "thread-hatteen-complete",
    subject: "اعتماد عرض حطين هيلز للعميل محمد",
    status: "approved",
    sender: { name: "أحمد الحربي", type: "broker" },
    recipient: { name: "شركة حطين للتطوير", type: "developer" },
    relation: {
      project: { id: "hatteen-hills", title: "حطين هيلز", location: "حطين، الرياض" },
      unit: { id: "hatteen-c3", label: "C-3", bedrooms: 4, bathrooms: 5, area: "300 م²", priceLabel: "3.1M ر.س" },
      stageLabel: "موافقة أولية",
    },
    lastUpdate: "اليوم 09:45",
    nextAction: "إرسال ملف الحجز وإكمال المستندات",
    summary: "الخيط يحتوي على الموافقة المبدئية والانتقال إلى إجراءات الحجز.",
  },
];

/**
 * WHY:   The offers zone needs a rich marketplace dataset that can drive visual cards and the inbox/connectors view.
 * WHAT:  Returns all mock offer records across developer, broker, client-demand, and inbox states.
 * HOW:   Keeps shared property and broker visuals colocated with the offers zone.
 */
export function getOffersMockData() {
  return OFFER_ITEMS;
}

/**
 * WHY:   Offer detail pages need one stable lookup into the local mock dataset.
 * WHAT:  Returns one marketplace item by id or null when missing.
 * HOW:   Uses a simple in-memory array match.
 */
export function getOfferMockById(offerId: string) {
  return OFFER_ITEMS.find((item) => item.id === offerId) ?? null;
}

/**
 * WHY:   The inbox experience needs thread-specific data rather than the generic marketplace item shape.
 * WHAT:  Returns the offer connection threads used by the offers inbox route.
 * HOW:   Keeps sender/recipient and relation context colocated with the offers zone mock data.
 */
export function getOfferThreadMockData() {
  return OFFER_THREADS;
}
