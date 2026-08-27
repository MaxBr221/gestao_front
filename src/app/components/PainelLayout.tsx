'use client'
import { Footer } from "./Footer"
import { Header } from "./Header"
import ToastApp from "./notification/ToastApp"
import { Sidebar } from "./Sidebar"

interface PainelLayoutProps {
    children: React.ReactNode;
}

export const PainelLayout: React.FC<PainelLayoutProps> = ({ children }) => {
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