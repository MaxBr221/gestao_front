'use client'

import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import ToastApp from "./notification/ToastApp";

interface AuthTemplateProps {
    children: ReactNode;
}

export const AuthTemplate = ({ children }: AuthTemplateProps) => {
    return (
        <div className="min-h-dvh w-full bg-[#FDFBF7] font-sans flex flex-col">

            <Header />

            <main className="flex-1 w-full flex flex-col">
                {children}
            </main>

            <Footer />

            <ToastApp />

        </div>
    );
};