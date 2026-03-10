"use client";

import { motion } from "framer-motion";
import { LogIn, Gavel, ShieldCheck } from "lucide-react";
import { useSearchParams } from "next/navigation";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton";
import PageHero from "@/components/shared/PageHero";
import Section from "@/components/shared/Section";

export default function SigninPage() {
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("returnTo") || "/ws";

    return (
        <main className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-600 selection:text-white flex flex-col pt-20" dir="rtl">
            <Section className="flex-1 flex items-center justify-center pb-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-md w-full"
                >
                    <PageHero
                        contentClassName="space-y-12 text-center"
                        badge={
                            <div className="space-y-6">
                                <div className="h-16 w-16 bg-blue-600 mx-auto flex items-center justify-center">
                                    <LogIn className="text-white h-8 w-8" />
                                </div>
                            </div>
                        }
                        title="دخول النظام المؤسسي"
                        titleTag="h1"
                        titleClassName="text-4xl font-black text-slate-900 uppercase tracking-tight"
                        description={
                            <p className="text-slate-500 font-bold">وصول آمن للمطورين والوسطاء المعتمدين في المملكة العربية السعودية.</p>
                        }
                        descriptionClassName=""
                        actions={
                            <>
                                <div className="space-y-6">
                                    <GoogleSignInButton
                                        redirectTo={redirectTo}
                                        className="w-full flex items-center justify-center gap-4"
                                    />

                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-relaxed">
                                        بالدخول للنظام، أنت توافق على <br />
                                        <a href="/terms" className="text-blue-600 hover:underline">اتفاقية الاستخدام</a> و <a href="/policy" className="text-blue-600 hover:underline">سياسة الخصوصية</a> السعودية.
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-8 pt-12 border-t border-slate-100">
                                    <div className="flex flex-col items-center gap-3">
                                        <ShieldCheck className="h-5 w-5 text-slate-300" />
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">تشفير مؤسسي</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-3">
                                        <Gavel className="h-5 w-5 text-slate-300" />
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">امتثال قانوني</span>
                                    </div>
                                </div>
                            </>
                        }
                    />
                </motion.div>
            </Section>
        </main>
    );
}
