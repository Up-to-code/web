"use client";

import { motion } from "framer-motion";
import { LogIn, Gavel, ShieldCheck } from "lucide-react";
import Button from "@/components/shared/Button";
import PageHero from "@/components/shared/PageHero";
import Section from "@/components/shared/Section";

export default function SigninPage() {
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
                                    <Button
                                        variant="dark"
                                        className="w-full flex items-center justify-center gap-4"
                                        onClick={() => console.log("Google Login")}
                                    >
                                        <svg className="h-5 w-5" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                                            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                        </svg>
                                        الدخول عبر Google
                                    </Button>

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
