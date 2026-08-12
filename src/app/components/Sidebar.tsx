'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuItem {
    label: string;
    href: string;
    icon: string;
}

const menuPrincipal: MenuItem[] = [
    {
        label: "Dashboard",
        href: "/painel",
        icon: "⌂"
    },
    {
        label: "Novo Atendimento",
        href: "/painel/atendimentos",
        icon: "+"
    },
    {
        label: "Serviços",
        href: "/painel/servicos",
        icon: "✂"
    },
    {
        label: "Barbeiros",
        href: "/painel/barbeiros",
        icon: "♙"
    }
];

const menuRelatorios: MenuItem[] = [
    {
        label: "Relatório Diário",
        href: "/painel/relatorios/diario",
        icon: "📅"
    },
    {
        label: "Relatório Mensal",
        href: "/painel/relatorios/mensal",
        icon: "📊"
    },
    {
        label: "Relatório Anual",
        href: "/painel/relatorios/anual",
        icon: "📈"
    }
];

export const Sidebar: React.FC = () => {

    const pathname = usePathname();

    return (
        <aside className="w-64 min-h-screen bg-[#164E63] text-white flex flex-col">

            {/* LOGO */}
            <div className="px-6 py-7 border-b border-white/10">

                <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-xl bg-[#57C5B6] flex items-center justify-center text-xl font-bold">
                        ✂
                    </div>

                    <div>
                        <h1 className="font-black text-lg tracking-tight">
                            GESTÃO
                        </h1>

                        <p className="text-xs text-white/60">
                            INTELIGENTE
                        </p>
                    </div>

                </div>

            </div>


            {/* MENU */}
            <nav className="flex-1 px-4 py-6">

                <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest px-3 mb-3">
                    Principal
                </p>

                <div className="space-y-1">

                    {menuPrincipal.map((item) => {

                        const ativo = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`
                                    flex items-center gap-3
                                    px-4 py-3
                                    rounded-xl
                                    transition-all
                                    ${
                                        ativo
                                            ? "bg-[#57C5B6] text-white shadow-lg"
                                            : "text-white/70 hover:bg-white/10 hover:text-white"
                                    }
                                `}
                            >

                                <span className="w-5 text-center text-lg">
                                    {item.icon}
                                </span>

                                <span className="text-sm font-medium">
                                    {item.label}
                                </span>

                            </Link>
                        );

                    })}

                </div>


                {/* RELATÓRIOS */}

                <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest px-3 mb-3 mt-8">
                    Relatórios
                </p>

                <div className="space-y-1">

                    {menuRelatorios.map((item) => {

                        const ativo = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`
                                    flex items-center gap-3
                                    px-4 py-3
                                    rounded-xl
                                    transition-all
                                    ${
                                        ativo
                                            ? "bg-[#57C5B6] text-white shadow-lg"
                                            : "text-white/70 hover:bg-white/10 hover:text-white"
                                    }
                                `}
                            >

                                <span className="w-5 text-center">
                                    {item.icon}
                                </span>

                                <span className="text-sm font-medium">
                                    {item.label}
                                </span>

                            </Link>
                        );

                    })}

                </div>

            </nav>


            {/* USUÁRIO */}

            <div className="border-t border-white/10 p-4">

                <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-full bg-[#57C5B6] flex items-center justify-center font-bold">
                        M
                    </div>

                    <div className="flex-1 min-w-0">

                        <p className="text-sm font-semibold truncate">
                            Maxsuel Lima
                        </p>

                        <p className="text-xs text-white/50">
                            Proprietário
                        </p>

                    </div>

                    <button className="text-white/50 hover:text-white">
                        ⋮
                    </button>

                </div>

            </div>

        </aside>
    );
};