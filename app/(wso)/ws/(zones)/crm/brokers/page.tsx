import Link from "next/link";
import { Plus, Users, Mail } from "lucide-react";
import ZonePageIntro from "../../../_components/ZoneShell/ZonePageIntro";
import { getCrmMockData, getPastBrokers } from "../mockData";
import BrokerPresenceChip from "../../../_components/Visuals/BrokerPresenceChip";

/**
 * WHY:   The broker list needs to show all historical and active brokers that the user has worked with.
 * WHAT:  Renders a visual list of brokers with their status and project history.
 * HOW:   Uses the shared BrokerPresenceChip for consistent visual representation.
 */
export default function BrokerListPage() {
  const brokers = getPastBrokers();
  const { clients } = getCrmMockData();

  const getClientCountForBroker = (brokerId: string) => {
    return clients.filter((client) => client.broker?.id === brokerId).length;
  };

  return (
    <div className="flex min-h-full flex-col">
      <ZonePageIntro
        eyebrow="علاقات العمل"
        title="قائمة الوسطاء"
        description="استعرض جميع الوسطاء الذين عملت معهم سابقاً، مع تفاصيل تخصصاتهم وحالاتهم الحالية."
        actions={
          <div className="flex items-center gap-2">
            <Link
              href="/ws/crm/brokers/invite"
              className="inline-flex items-center gap-2 border border-slate-200 bg-white px-4 py-3 text-xs font-black tracking-[0.18em] text-slate-700 transition hover:border-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
            >
              <Mail className="h-4 w-4" />
              دعوة وسيط
            </Link>
            <Link
              href="/ws/crm/brokers/add"
              className="inline-flex items-center gap-2 border border-blue-600 bg-blue-600 px-6 py-3 text-xs font-black tracking-[0.18em] text-white transition hover:border-slate-950 hover:bg-slate-950"
            >
              <Plus className="h-4 w-4" />
              إضافة وسيط جديد
            </Link>
          </div>
        }
      />

      <div className="px-6 py-6 lg:px-8 lg:py-8">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {brokers.map((broker) => (
            <div 
              key={broker.id} 
              className="group relative border border-slate-200 bg-white p-6 transition hover:border-blue-200"
            >
              <div className="flex items-start gap-4">
                <div className="h-14 w-14 shrink-0 overflow-hidden bg-slate-100 flex items-center justify-center">
                  {broker.avatarImage ? (
                    <img src={broker.avatarImage} alt={broker.name} className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-xl font-black text-slate-400">{broker.avatarLabel}</span>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-black text-slate-950">{broker.name}</h3>
                    <div className="h-2 w-2 rounded-full bg-emerald-500" title="Active" />
                  </div>
                  <div className="text-xs font-bold text-blue-600 mt-0.5">{broker.title}</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">{broker.city}</div>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <p className="text-sm font-medium leading-6 text-slate-600 line-clamp-2">
                  {broker.summary}
                </p>

                <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
                  <div className="flex-1">
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">الحالة الحالية</div>
                    <BrokerPresenceChip broker={broker} />
                  </div>
                  {getClientCountForBroker(broker.id) > 0 && (
                    <div className="flex items-center gap-1.5 bg-blue-50 px-3 py-2 border border-blue-200">
                      <Users className="h-3.5 w-3.5 text-blue-600" />
                      <span className="text-xs font-black text-blue-700">
                        {getClientCountForBroker(broker.id)} عميل
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <Link 
                    href={`/ws/crm/brokers/${broker.id}`}
                    className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-700 hover:text-slate-950 transition"
                  >
                    عرض الملف الشخصي
                  </Link>
                  <button className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-blue-600 transition">
                    اتصال سريع
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
