import type { BrokerPresence } from "../../_components/Visuals/BrokerPresenceChip";
import type { UnitReference } from "../../_lib/entities";

export type WorkspaceProject = {
  id: string;
  title: string;
  location: string;
  priceLabel: string;
  summary: string;
  image: string;
  specs: {
    rooms: string;
    baths: string;
    area: string;
    status: string;
  };
  publicationState: "published" | "draft" | "archived";
  units: UnitReference[];
  brokers: BrokerPresence[];
};

const PROJECTS: WorkspaceProject[] = [
  {
    id: "malqa-residences",
    title: "مالقا ريزيدنس",
    location: "الملقا، الرياض",
    priceLabel: "من 2.1M إلى 3.4M ر.س",
    summary: "مشروع سكني فاخر موجه للعائلات والمستثمرين مع إقبال مرتفع من الوسطاء النشطين.",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
    specs: {
      rooms: "4 غرف",
      baths: "5 حمامات",
      area: "280 م²",
      status: "نشط",
    },
    publicationState: "published",
    units: [
      { id: "malqa-a12", label: "A-12", bedrooms: 3, bathrooms: 4, area: "228 م²", priceLabel: "2.35M ر.س" },
      { id: "malqa-b07", label: "B-07", bedrooms: 4, bathrooms: 5, area: "280 م²", priceLabel: "2.9M ر.س" },
    ],
    brokers: [
      {
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
        summary: "تقود العميل إلى مرحلة المعاينة النهائية وتتابع خيارات التمويل.",
        relation: {
          project: { id: "malqa-residences", title: "مالقا ريزيدنس", location: "الملقا، الرياض" },
          unit: { id: "malqa-a12", label: "A-12", bedrooms: 3, bathrooms: 4, area: "228 م²", priceLabel: "2.35M ر.س" },
          stageLabel: "معاينة نهائية",
        },
      },
      {
        id: "broker-hamad",
        name: "حمد الحربي",
        avatarLabel: "ح",
        personType: "broker",
        avatarImage:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=320&q=80",
        state: "qualified",
        title: "وسيط مشاريع",
        city: "الرياض",
        projectTitle: "مالقا ريزيدنس",
        clientName: null,
        summary: "يراجع العملاء المؤهلين ويجهز جولة عرض للمخزون المتاح.",
        relation: {
          project: { id: "malqa-residences", title: "مالقا ريزيدنس", location: "الملقا، الرياض" },
          unit: null,
          stageLabel: "تأهيل",
        },
      },
    ],
  },
  {
    id: "narges-villas",
    title: "فلل النرجس",
    location: "النرجس، الرياض",
    priceLabel: "من 3.6M إلى 4.8M ر.س",
    summary: "فلل عائلية بمساحات كبيرة مع مرحلة توزيع مبكرة وفرص تعاون بين الوسطاء.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    specs: {
      rooms: "5 غرف",
      baths: "6 حمامات",
      area: "410 م²",
      status: "قيد التجهيز",
    },
    publicationState: "draft",
    units: [
      { id: "narges-v1", label: "Villa-1", bedrooms: 5, bathrooms: 6, area: "410 م²", priceLabel: "3.8M ر.س" },
      { id: "narges-v4", label: "Villa-4", bedrooms: 5, bathrooms: 6, area: "430 م²", priceLabel: "4.2M ر.س" },
    ],
    brokers: [
      {
        id: "broker-rawan",
        name: "روان السبيعي",
        avatarLabel: "ر",
        personType: "broker",
        badges: ["vip"],
        avatarImage:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=320&q=80",
        state: "qualified",
        title: "وسيط فلل فاخرة",
        city: "الرياض",
        projectTitle: "فلل النرجس",
        clientName: null,
        summary: "تراجع ملفات العملاء المهتمين بالفلل الواسعة وخيارات الدفع الممتد.",
        relation: {
          project: { id: "narges-villas", title: "فلل النرجس", location: "النرجس، الرياض" },
          unit: { id: "narges-v1", label: "Villa-1", bedrooms: 5, bathrooms: 6, area: "410 م²", priceLabel: "3.8M ر.س" },
          stageLabel: "تجهيز عرض",
        },
      },
      {
        id: "broker-fahad",
        name: "فهد الشمري",
        avatarLabel: "ف",
        personType: "broker",
        avatarImage:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=320&q=80",
        state: "idle",
        title: "وسيط ميداني",
        city: "الرياض",
        projectTitle: "فلل النرجس",
        clientName: null,
        summary: "مرتبط بالمشروع لكن لم يربط أي عميل حتى الآن.",
        relation: {
          project: { id: "narges-villas", title: "فلل النرجس", location: "النرجس، الرياض" },
          unit: null,
          stageLabel: "بدون عميل",
        },
      },
    ],
  },
  {
    id: "yasmin-lofts",
    title: "ياسمين لوفتس",
    location: "الياسمين، الرياض",
    priceLabel: "من 1.7M إلى 2.4M ر.س",
    summary: "شقق دوبلكس حديثة محفوظة للمراجعة الداخلية ولا يوجد عليها أي نشاط وسيط أو عميل حالياً.",
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=80",
    specs: {
      rooms: "3 غرف",
      baths: "4 حمامات",
      area: "210 م²",
      status: "معلق",
    },
    publicationState: "archived",
    units: [{ id: "yasmin-l2", label: "L-2", bedrooms: 3, bathrooms: 4, area: "210 م²", priceLabel: "1.9M ر.س" }],
    brokers: [],
  },
];

/**
 * WHY:   The projects zone needs a media-rich mock dataset that works across overview, assignments, and detail routes.
 * WHAT:  Returns the full property-style mock project list with broker presence metadata.
 * HOW:   Keeps static project and broker display data colocated with the projects zone.
 */
export function getProjectsMockData() {
  return PROJECTS;
}

/**
 * WHY:   Project detail routes need one stable lookup into the colocated mock dataset.
 * WHAT:  Returns one mock project by id or null when missing.
 * HOW:   Uses a simple in-memory array match.
 */
export function getProjectMockById(projectId: string) {
  return PROJECTS.find((project) => project.id === projectId) ?? null;
}

/**
 * WHY:   The projects mock workspace needs a deterministic way to append a sample project during local-only demos.
 * WHAT:  Returns a new projects array with the supplied project prepended if it is not already present.
 * HOW:   Uses a simple id guard so repeated button presses do not duplicate the same mock project.
 */
export function addMockProject(projects: WorkspaceProject[], project: WorkspaceProject) {
  return projects.some((entry) => entry.id === project.id) ? projects : [project, ...projects];
}

/**
 * WHY:   Publication-state filters should remain visual, but the mock data still needs a pure update helper for tests and local state.
 * WHAT:  Returns a new projects array with one project's publication state updated.
 * HOW:   Maps over the array and updates only the matching id.
 */
export function updateProjectPublicationState(
  projects: WorkspaceProject[],
  projectId: string,
  publicationState: WorkspaceProject["publicationState"],
) {
  return projects.map((project) =>
    project.id === projectId ? { ...project, publicationState } : project,
  );
}
