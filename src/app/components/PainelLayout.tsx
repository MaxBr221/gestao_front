'use client'

import { useRouter } from 'next/navigation';
import { Footer } from "./Footer";
import { Header } from "./Header";
import ToastApp from "./notification/ToastApp";
import { Sidebar } from "./Sidebar";
import { useEffect, useState } from "react";
import { userAuth } from "../hooks/userAuth";

interface PainelLayoutProps {
    children: React.ReactNode;
}

export const PainelLayout: React.FC<PainelLayoutProps> = ({ children }) => {

    const router = useRouter();
    const [verificado, setVerificado] = useState(true);
    const [sidebarAberta, setSidebarAberta] = useState(false);

    useEffect(() => {

        const auth = userAuth();

        if (!auth.isAuthenticated()) {
            router.replace("/login");
            return;
        }

        setVerificado(false);

    }, [router]);

    if (verificado) {
        return null;
    }

    return (
        <div className="flex min-h-screen w-full bg-[#FDFBF7]">

            <Sidebar
                aberta={sidebarAberta}
                fechar={() => setSidebarAberta(false)}
            />

            <div className="flex min-w-0 flex-1 flex-col">

                <header className="flex items-center border-b bg-white px-4 py-3 md:hidden">

                    <button
                        type="button"
                        onClick={() => setSidebarAberta(true)}
                        className="text-2xl text-[#164E63]"
                    >
                        ☰
                    </button>

                    <span className="ml-4 font-bold text-[#164E63]">
                        GESTÃO INTELIGENTE
                    </span>

                </header>

                <div className="hidden md:block">
                    <Header />
                </div>

                <main className="min-w-0 flex-1 w-full">
                    {children}
                </main>

                <ToastApp />

                <Footer />

            </div>

        </div>
    );
};