'use client'
import { useRouter } from 'next/navigation';
import { Footer } from "./Footer"
import { Header } from "./Header"
import ToastApp from "./notification/ToastApp"
import { Sidebar } from "./Sidebar"
import { useEffect, useState } from "react"
import { userAuth } from "../hooks/userAuth"

interface PainelLayoutProps {
    children: React.ReactNode;
}

export const PainelLayout: React.FC<PainelLayoutProps> = ({ children }) => {
    const router = useRouter();
    const [verificado, setVerificado] = useState(true);
    useEffect(() => {
        const auth = userAuth();

        if(!auth.isAuthenticated()){
            router.replace("/login");
            return;
        }
        setVerificado(false);

    }, [router])

    if(verificado){
        return null;
    }

    return (
        <div className="flex min-h-screen w-full bg-[#FDFBF7]">

            <Sidebar />

            <div className="flex flex-col flex-1 min-w-0">

                <Header />

                <main className="flex-1 w-full">
                    {children}
                </main>

                <ToastApp />

                <Footer />

            </div>

        </div>
    );
};