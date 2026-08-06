import React from "react";

export const Header: React.FC = () =>{
    return(
        <header className="bg-[#1A5F7A] text-white shadow-lg border-b border-white/10 relative z-50">
            <div className="container mx-auto flex justify-between items-center px-6 py-4 ">
                <h1 className="text-xl font-black tracking-tight uppercase">Gestão Inteligente</h1>
            </div>
        </header>
    )
}