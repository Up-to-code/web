export type Conversation = {
  id: string;
  contactName: string;
  contactRole: string;
  avatarLabel: string;
  lastMessage: string;
  lastTime: string;
  unread: number;
  messages: { id: string; sender: "me" | "them"; text: string; time: string }[];
};

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: "conv-ai",
    contactName: "المساعد الذكي",
    contactRole: "الذكاء الاصطناعي",
    avatarLabel: "AI",
    lastMessage: "مرحباً! كيف يمكنني مساعدتك اليوم في تحليل السوق أو مراجعة عروضك؟",
    lastTime: "منذ دقيقة",
    unread: 1,
    messages: [
      { id: "m1", sender: "them", text: "مرحباً! كيف يمكنني مساعدتك اليوم في تحليل السوق أو مراجعة عروضك؟", time: "الآن" },
    ],
  },
  {
    id: "conv-1",
    contactName: "سارة العتيبي",
    contactRole: "وسيط استثماري أول",
    avatarLabel: "س",
    lastMessage: "أرسلت لك تفاصيل الوحدة A-12 في مالقا ريزيدنس. هل يرغب بترتيب معاينة؟",
    lastTime: "منذ 15 دقيقة",
    unread: 2,
    messages: [
      { id: "m1", sender: "them", text: "مرحباً، أنا مهتمة بعرض مالقا ريزيدنس المفتوح.", time: "10:30 ص" },
      { id: "m2", sender: "me", text: "أهلاً سارة. العرض متاح والعمولة مرنة حسب الحجم.", time: "10:45 ص" },
      { id: "m3", sender: "them", text: "ممتاز. هل الوحدة A-12 لا زالت متاحة؟", time: "11:00 ص" },
      { id: "m4", sender: "me", text: "نعم متاحة. 3 غرف، 228 م²، بسعر 2.35 مليون.", time: "11:15 ص" },
      { id: "m5", sender: "them", text: "أرسلت لك تفاصيل الوحدة A-12 في مالقا ريزيدنس. هل يرغب بترتيب معاينة؟", time: "11:30 ص" },
    ],
  },
  {
    id: "conv-2",
    contactName: "أحمد الحربي",
    contactRole: "وسيط مرخص",
    avatarLabel: "أ",
    lastMessage: "تم اعتماد العرض. سأرسل ملف الحجز خلال ساعة.",
    lastTime: "اليوم 09:45",
    unread: 0,
    messages: [
      { id: "m1", sender: "me", text: "أحمد، هل تم الموافقة على عرض حطين هيلز للعميل محمد؟", time: "09:00 ص" },
      { id: "m2", sender: "them", text: "نعم، تمت الموافقة المبدئية. ننتظر مستندات الحجز.", time: "09:30 ص" },
      { id: "m3", sender: "them", text: "تم اعتماد العرض. سأرسل ملف الحجز خلال ساعة.", time: "09:45 ص" },
    ],
  },
];
