'use client'
import { useState, useEffect } from "react";
import { PainelLayout } from "../../components/PainelLayout";
import { RelatorioCard } from "../../components/RelatorioCard";
import { notification } from "../../components/notification";
import { buscarRelatorioDiario, buscarRelatorioMensal, buscarRelatorioAnual } from "../../resources/relatorio/relatorioService";

interface Relatorio {
    faturamento: number;
    quantAtendimentos: number;
    servicoMaiorFrequencia: string | null;
}

export default function RelatorioFaturamentoPage() {
    const [tipo, setTipo] = useState<"diario" | "mensal" | "anual">("mensal");
    const [relatorio, setRelatorio] = useState<Relatorio | null>(null);
    const [loading, setLoading] = useState(true);

    const carregarRelatorio = async () => {
        setLoading(true);
        try {
            let dados = null;
            if (tipo === "diario") {
                dados = await buscarRelatorioDiario();
            } else if (tipo === "mensal") {
                dados = await buscarRelatorioMensal();
            } else if (tipo === "anual") {
                dados = await buscarRelatorioAnual();
            }
            setRelatorio(dados);
        } catch (error) {
            notification().notify("Erro ao carregar o relatório de faturamento.", "error");
            setRelatorio(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        carregarRelatorio();
    }, [tipo]);

    const titulos: Record<string, { titulo: string, descricao: string, fatLabel: string, atdLabel: string }> = {
        "diario": { titulo: "Relatório Diário", descricao: "Resumo dos atendimentos realizados hoje", fatLabel: "Faturamento de hoje", atdLabel: "Atendimentos de hoje" },
        "mensal": { titulo: "Relatório Mensal", descricao: "Resumo dos atendimentos realizados neste mês", fatLabel: "Faturamento do mês", atdLabel: "Atendimentos no mês" },
        "anual": { titulo: "Relatório Anual", descricao: "Resumo dos atendimentos realizados neste ano", fatLabel: "Faturamento do ano", atdLabel: "Atendimentos no ano" },
    };

    return (
        <PainelLayout>
            <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[#1A5F7A]">{titulos[tipo].titulo}</h1>
                    <p className="text-gray-500 mt-2">{titulos[tipo].descricao}</p>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-lg font-bold text-gray-700">Filtro de Período</h2>
                        <p className="text-sm text-gray-400">Escolha qual relatório deseja visualizar</p>
                    </div>
                    <div className="w-full sm:w-auto relative">
                        <select 
                            value={tipo}
                            onChange={(e) => setTipo(e.target.value as any)}
                            className="w-full sm:w-64 appearance-none border border-gray-200 rounded-2xl p-4 pr-10 outline-none focus:ring-4 focus:ring-[#50C4B5]/20 focus:border-[#50C4B5] transition-all bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold cursor-pointer"
                        >
                            <option value="diario">☀️ Diário (Hoje)</option>
                            <option value="mensal">📅 Mensal (Este Mês)</option>
                            <option value="anual">🌎 Anual (Este Ano)</option>
                        </select>
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
                            ▼
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="w-8 h-8 border-4 border-[#50C4B5] border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-gray-500 font-medium ml-3">Carregando dados financeiros...</p>
                    </div>
                ) : !relatorio ? (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-400">Nenhum dado encontrado ou erro de carregamento.</h2>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Card 1: Faturamento */}
                        <div className="bg-gradient-to-br from-[#1A5F7A] to-[#2B7A9F] rounded-3xl shadow-md p-6 flex flex-col relative overflow-hidden group hover:shadow-lg transition-shadow text-white">
                            <div className="absolute -top-4 -right-4 p-4 opacity-5 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500 pointer-events-none">
                                <span className="text-9xl">💰</span>
                            </div>
                            <p className="text-white/70 font-semibold uppercase tracking-widest text-[10px] mb-1 z-10">{titulos[tipo].fatLabel}</p>
                            <h2 className="text-4xl font-black text-white tracking-tight z-10">
                                R$ {relatorio.faturamento?.toFixed(2) ?? "0.00"}
                            </h2>
                        </div>
                        
                        {/* Card 2: Atendimentos */}
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 flex flex-col relative overflow-hidden group hover:shadow-md transition-shadow">
                            <div className="absolute -top-4 -right-4 p-4 opacity-[0.03] transform group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-500 pointer-events-none">
                                <span className="text-9xl">✂️</span>
                            </div>
                            <p className="text-gray-400 font-semibold uppercase tracking-widest text-[10px] mb-1 z-10">{titulos[tipo].atdLabel}</p>
                            <h2 className="text-4xl font-black text-gray-800 tracking-tight z-10">
                                {relatorio.quantAtendimentos ?? 0}
                            </h2>
                        </div>
                        
                        {/* Card 3: Serviço Mais Realizado */}
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 flex flex-col relative overflow-hidden group hover:shadow-md transition-shadow">
                            <div className="absolute -top-4 -right-4 p-4 opacity-[0.03] transform group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-500 pointer-events-none">
                                <span className="text-9xl">🏆</span>
                            </div>
                            <p className="text-gray-400 font-semibold uppercase tracking-widest text-[10px] mb-1 z-10">Serviço mais realizado</p>
                            <h2 className="text-2xl font-black text-[#50C4B5] tracking-tight z-10 mt-auto pt-4 leading-tight">
                                {relatorio.servicoMaiorFrequencia || "Nenhum"}
                            </h2>
                        </div>
                    </div>
                )}
            </div>
        </PainelLayout>
    );
}
