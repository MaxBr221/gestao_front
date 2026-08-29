'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuItem {
    label: string;
    href: string;
    icon: string;
}

interface SidebarProps {
    aberta: boolean;
    fechar: () => void;
}

const menuPrincipal: MenuItem[] = [
    {
        label: "Dashboard",
        href: "/painel",
        icon: "⌂"
    },
    {
        label: "Novo Atendimento",
        href: "/painel/atendimento",
        icon: "+"
    },
    {
        label: "Serviços",
        href: "/painel/servico",
        icon: "✂"
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
    },
    {
        label: "Sair",
        href: "/login",
        icon: "↪"
    }
];

export const Sidebar: React.FC<SidebarProps> = ({ aberta, fechar }) => {

    const pathname = usePathname();

    return (
        <>
            {/* Fundo escuro no mobile */}
            {aberta && (
                <div
                    className="fixed inset-0 z-40 bg-black/40 md:hidden"
                    onClick={fechar}
                />
            )}

            <aside
                className={`
                    fixed inset-y-0 left-0 z-50
                    w-64
                    min-h-screen
                    bg-[#164E63]
                    text-white
                    flex flex-col
                    transform transition-transform duration-300

                    ${aberta ? "translate-x-0" : "-translate-x-full"}

                    md:relative
                    md:translate-x-0
                    md:shrink-0
                `}
            >

                {/* Cabeçalho */}
                <div className="px-6 py-7 border-b border-white/10">

                    <div className="flex items-center justify-between">

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

                        {/* Botão fechar no celular */}
                        <button
                            type="button"
                            onClick={fechar}
                            className="text-xl md:hidden"
                        >
                            ✕
                        </button>

                    </div>

                </div>

                <nav className="flex-1 px-4 py-6 overflow-y-auto">

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
                                    onClick={fechar}
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
                                    onClick={fechar}
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

            </aside>
        </>
    );
};