import Link from "next/link";
import { ArrowLeft, Phone, Mail, Building2, Users, TrendingUp, Star } from "lucide-react";
import ZonePageIntro from "../../../../_components/ZoneShell/ZonePageIntro";
import { getPastBrokers, getCrmMockData } from "../../mockData";

interface BrokerDetailPageProps {
  params: Promise<{
    brokerId: string;
  }>;
}

export default async function BrokerDetailPage({ params }: BrokerDetailPageProps) {
  const { brokerId } = await params;
  const broker = getPastBrokers().find((b) => b.id === brokerId);
  const { clients, projects } = getCrmMockData();

  if (!broker) {
    return (
      <div className="flex min-h-full flex-col items-center justify-center py-20">
        <h2 className="text-xl font-black text-slate-900 mb-2">الوسيط غير موجود</h2>
        <p className="text-slate-500 mb-6">لم يتم العثور على الوسيط المطلوب.</p>
        <Link
          href="/ws/crm/brokers"
          className="inline-flex border border-blue-600 bg-blue-600 px-6 py-3 text-xs font-black tracking-[0.18em] text-white transition hover:border-slate-950 hover:bg-slate-950"
        >
          العودة للقائمة
        </Link>
      </div>
    );
  }

  const brokerClients = clients.filter((client) => client.broker?.id === brokerId);
  const brokerProject = projects.find((p) => p.id === broker.relation?.project?.id);

  const stats = {
    totalClients: brokerClients.length,
    activeDeals: brokerClients.filter((c) => c.stage === "proposal" || c.stage === "qualified").length,
    closedDeals: brokerClients.filter((c) => c.stage === "won").length,
  };

  return (
    <div className="flex min-h-full flex-col">
      <ZonePageIntro
        eyebrow="ملف الوسيط"
        title={broker.name}
        description={broker.summary || "لا يوجد وصف"}
        actions={
          <Link
            href="/ws/crm/brokers"
            className="inline-flex items-center gap-2 border border-slate-200 bg-white px-4 py-3 text-xs font-black tracking-[0.18em] text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
          >
            <ArrowLeft className="h-4 w-4" />
            العودة للقائمة
          </Link>
        }
      />

      <div className="px-6 py-6 lg:px-8 lg:py-8 space-y-8">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="border border-slate-200 bg-white p-6">
              <div className="flex items-start gap-6">
                <div className="h-24 w-24 shrink-0 overflow-hidden bg-slate-100 flex items-center justify-center">
                  {broker.avatarImage ? (
                    <img src={broker.avatarImage} alt={broker.name} className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-3xl font-black text-slate-400">{broker.avatarLabel}</span>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-black text-slate-950">{broker.name}</h3>
                    {broker.badges?.includes("verified") && (
                      <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                    )}
                  </div>
                  <p className="text-sm font-bold text-blue-600 mb-3">{broker.title}</p>
                  <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Building2 className="h-3.5 w-3.5" />
                      {broker.city}
                    </span>
                    {!!broker.projectTitle && broker.projectTitle !== "لا يوجد" && (
                      <span className="flex items-center gap-1">
                        <Building2 className="h-3.5 w-3.5" />
                        {broker.projectTitle}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6 pt-6 border-t border-slate-100">
                <button className="flex-1 inline-flex items-center justify-center gap-2 border border-slate-200 bg-white px-4 py-3 text-xs font-black tracking-[0.18em] text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700">
                  <Phone className="h-4 w-4" />
                  اتصال
                </button>
                <button className="flex-1 inline-flex items-center justify-center gap-2 border border-slate-200 bg-white px-4 py-3 text-xs font-black tracking-[0.18em] text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700">
                  <Mail className="h-4 w-4" />
                  رسالة
                </button>
              </div>
            </div>

            {brokerProject && (
              <div className="border border-slate-200 bg-white p-6">
                <h4 className="text-sm font-black text-slate-900 mb-4 uppercase tracking-wider">المشروع المرتبط</h4>
                <div className="flex gap-4">
                  <div className="h-20 w-32 shrink-0 bg-slate-100 overflow-hidden">
                    <img src={brokerProject.image} alt={brokerProject.title} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <h5 className="text-base font-black text-slate-950">{brokerProject.title}</h5>
                    <p className="text-sm text-slate-500">{brokerProject.location}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="border border-slate-200 bg-white p-6">
              <h4 className="text-sm font-black text-slate-900 mb-4 uppercase tracking-wider">إحصائيات</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Users className="h-4 w-4" />
                    <span className="text-sm font-medium">إجمالي العملاء</span>
                  </div>
                  <span className="text-lg font-black text-blue-600">{stats.totalClients}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-600">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm font-medium">صفقات نشطة</span>
                  </div>
                  <span className="text-lg font-black text-emerald-600">{stats.activeDeals}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Star className="h-4 w-4" />
                    <span className="text-sm font-medium">صفقات مغلقة</span>
                  </div>
                  <span className="text-lg font-black text-amber-600">{stats.closedDeals}</span>
                </div>
              </div>
            </div>

            <div className="border border-slate-200 bg-white p-6">
              <h4 className="text-sm font-black text-slate-900 mb-4 uppercase tracking-wider">الحالة</h4>
              <div className="flex items-center gap-2">
                <div className={`h-3 w-3 rounded-full ${broker.state === "client-linked" ? "bg-emerald-500" : broker.state === "qualified" ? "bg-blue-500" : "bg-slate-300"}`} />
                <span className="text-sm font-bold text-slate-700">
                  {broker.state === "client-linked" ? "مرتبط بعملاء" : broker.state === "qualified" ? "مؤهل" : broker.state === "idle" ? "غير نشط" : "معطل"}
                </span>
              </div>
              {broker.relation?.stageLabel && (
                <p className="text-xs text-slate-500 mt-2">{broker.relation.stageLabel}</p>
              )}
            </div>
          </div>
        </div>

        <div className="border border-slate-200 bg-white">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">العملاء ({brokerClients.length})</h4>
            <Link
              href={`/ws/crm/brokers/${brokerId}/clients`}
              className="text-xs font-black text-blue-600 hover:text-blue-700"
            >
              عرض الكل
            </Link>
          </div>
          {brokerClients.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {brokerClients.slice(0, 5).map((client) => (
                <Link
                  key={client.id}
                  href={`/ws/crm/clients/${client.id}`}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition"
                >
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-black text-sm">
                    {client.avatarLabel}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-slate-900">{client.name}</div>
                    <div className="text-xs text-slate-500">{client.preference}</div>
                  </div>
                  <div className="text-xs font-black uppercase tracking-wider px-2 py-1 border border-slate-200">
                    {client.stage}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="px-6 py-8 text-center text-slate-500">
              لا يوجد عملاء مرتبطين بهذا الوسيط حتى الآن.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
