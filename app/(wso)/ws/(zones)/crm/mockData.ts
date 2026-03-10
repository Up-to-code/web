import type { BrokerPresence } from "../../_components/Visuals/BrokerPresenceChip";
import type { PersonBadge, PersonCardType, UnitReference } from "../../_lib/entities";

export type PipelineStage = "new" | "qualified" | "proposal" | "won";

export type CrmProjectReference = {
  id: string;
  title: string;
  image: string;
  location: string;
};

export type CrmClientRecord = {
  id: string;
  personType: PersonCardType;
  badges?: PersonBadge[];
  avatarImage: string;
  avatarLabel: string;
  name: string;
  stage: PipelineStage;
  budgetLabel: string;
  preference: string;
  project: CrmProjectReference | null;
  unit: UnitReference | null;
  broker: BrokerPresence | null;
  notes: string;
};

const PROJECTS: CrmProjectReference[] = [
  {
    id: "malqa-residences",
    title: "مالقا ريزيدنس",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
    location: "الملقا، الرياض",
  },
  {
    id: "narges-villas",
    title: "فلل النرجس",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    location: "النرجس، الرياض",
  },
];

const BROKERS: BrokerPresence[] = [
  {
    id: "broker-sara",
    name: "سارة العتيبي",
    avatarLabel: "س",
    personType: "broker",
    badges: ["verified"],
    avatarImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=320&q=80",
    state: "client-linked",
    title: "وسيط استثماري أول",
    city: "الرياض",
    projectTitle: "فلل النرجس",
    unitLabel: "Villa-1",
    clientName: "نورة السبيعي",
    summary: "تدير العميل الحالي وترتبط بالمشروع مباشرة.",
    relation: {
      project: { id: "narges-villas", title: "فلل النرجس", location: "النرجس، الرياض" },
      unit: { id: "narges-v1", label: "Villa-1", bedrooms: 5, bathrooms: 6, area: "410 م²", priceLabel: "3.8M ر.س" },
      stageLabel: "عرض نهائي",
    },
  },
  {
    id: "broker-hamad",
    name: "حمد الحربي",
    avatarLabel: "ح",
    personType: "broker",
    avatarImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=320&q=80",
    state: "qualified",
    title: "وسيط مشاريع",
    city: "الرياض",
    projectTitle: "مالقا ريزيدنس",
    clientName: null,
    summary: "مؤهل للمشروع ويبحث عن عميل مناسب.",
    relation: {
      project: { id: "malqa-residences", title: "مالقا ريزيدنس", location: "الملقا، الرياض" },
      unit: null,
      stageLabel: "تأهيل",
    },
  },
];

const CLIENTS: CrmClientRecord[] = [
  {
    id: "client-mona",
    personType: "client",
    badges: ["vip"],
    avatarImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=320&q=80",
    avatarLabel: "م",
    name: "منى الغامدي",
    stage: "new",
    budgetLabel: "حتى 1.8M ر.س",
    preference: "شقة جاهزة شمال الرياض",
    project: null,
    unit: null,
    broker: null,
    notes: "عميل بدون مشروع وبدون وسيط حتى الآن.",
  },
  {
    id: "client-khaled",
    personType: "client",
    avatarImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=320&q=80",
    avatarLabel: "خ",
    name: "خالد الدوسري",
    stage: "qualified",
    budgetLabel: "2.2M ر.س",
    preference: "تاون هاوس عائلي",
    project: PROJECTS[0],
    unit: { id: "malqa-a12", label: "A-12", bedrooms: 3, bathrooms: 4, area: "228 م²", priceLabel: "2.35M ر.س" },
    broker: null,
    notes: "مرتبط بالمشروع فقط ويحتاج وسيطاً مسؤولاً عن المتابعة.",
  },
  {
    id: "client-noura",
    personType: "client",
    badges: ["verified"],
    avatarImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=320&q=80",
    avatarLabel: "ن",
    name: "نورة السبيعي",
    stage: "proposal",
    budgetLabel: "4.0M ر.س",
    preference: "فيلا واسعة مع حديقة",
    project: PROJECTS[1],
    unit: { id: "narges-v1", label: "Villa-1", bedrooms: 5, bathrooms: 6, area: "410 م²", priceLabel: "3.8M ر.س" },
    broker: BROKERS[0],
    notes: "مرتبطة بالمشروع والوسيط معاً وجاهزة لعرض نهائي.",
  },
];

export type CrmMockData = {
  projects: CrmProjectReference[];
  brokers: BrokerPresence[];
  clients: CrmClientRecord[];
};

/**
 * WHY:   The CRM zone needs a visual-first dataset that already contains linked project and broker cards.
 * WHAT:  Returns the colocated CRM mock graph for pipeline, clients, and detail routes.
 * HOW:   Stores the three required client relationship scenarios directly in zone-local mock data.
 */
export function getCrmMockData(): CrmMockData {
  return {
    projects: PROJECTS,
    brokers: BROKERS,
    clients: CLIENTS,
  };
}

/**
 * WHY:   CRM client detail pages need a stable lookup into the local mock dataset.
 * WHAT:  Returns one client by id or null when missing.
 * HOW:   Performs a simple array match against the colocated client list.
 */
export function getCrmClientById(clientId: string) {
  return CLIENTS.find((client) => client.id === clientId) ?? null;
}

/**
 * WHY:   The CRM pipeline needs a pure helper for local-only client creation.
 * WHAT:  Returns a new client list with the new client prepended.
 * HOW:   Uses an immutable array prepend.
 */
export function addCrmClient(clients: CrmClientRecord[], client: CrmClientRecord) {
  return [client, ...clients];
}

/**
 * WHY:   Visual CRM actions still need a deterministic state update helper for tests and local state.
 * WHAT:  Returns a new client list with one record patched by id.
 * HOW:   Maps over the array and merges the partial patch into the matching client only.
 */
export function updateCrmClient(
  clients: CrmClientRecord[],
  clientId: string,
  patch: Partial<CrmClientRecord>,
) {
  return clients.map((client) =>
    client.id === clientId ? { ...client, ...patch } : client,
  );
}
