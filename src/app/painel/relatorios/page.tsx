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

                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <label className="text-gray-700 font-bold whitespace-nowrap">Selecione o Tipo:</label>
                        <select 
                            value={tipo}
                            onChange={(e) => setTipo(e.target.value as any)}
                            className="w-full sm:w-auto border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-[#50C4B5]/50 focus:border-[#50C4B5] transition-all bg-gray-50 focus:bg-white text-gray-800 font-medium cursor-pointer"
                        >
                            <option value="diario">Diário (Hoje)</option>
                            <option value="mensal">Mensal (Este Mês)</option>
                            <option value="anual">Anual (Este Ano)</option>
                        </select>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <p className="text-gray-500 font-medium">Carregando dados financeiros...</p>
                    </div>
                ) : !relatorio ? (
                    <div className="text-center py-20 bg-white rounded-2xl shadow-lg border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-500">Nenhum dado encontrado ou erro de carregamento.</h2>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 transform transition-all hover:scale-[1.02] cursor-default flex flex-col items-center justify-center text-center">
                            <span className="text-4xl mb-4">💰</span>
                            <p className="text-gray-500 font-bold uppercase tracking-wider text-sm">{titulos[tipo].fatLabel}</p>
                            <h2 className="text-3xl font-black text-gray-800 mt-2">
                                R$ {relatorio.faturamento?.toFixed(2) ?? "0.00"}
                            </h2>
                        </div>
                        
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 transform transition-all hover:scale-[1.02] cursor-default flex flex-col items-center justify-center text-center">
                            <span className="text-4xl mb-4">✂️</span>
                            <p className="text-gray-500 font-bold uppercase tracking-wider text-sm">{titulos[tipo].atdLabel}</p>
                            <h2 className="text-3xl font-black text-[#1A5F7A] mt-2">
                                {relatorio.quantAtendimentos ?? 0}
                            </h2>
                        </div>
                        
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 transform transition-all hover:scale-[1.02] cursor-default flex flex-col items-center justify-center text-center">
                            <span className="text-4xl mb-4">🏆</span>
                            <p className="text-gray-500 font-bold uppercase tracking-wider text-sm">Serviço mais realizado</p>
                            <h2 className="text-2xl font-black text-[#50C4B5] mt-2 line-clamp-2">
                                {relatorio.servicoMaiorFrequencia || "Nenhum"}
                            </h2>
                        </div>
                    </div>
                )}
            </div>
        </PainelLayout>
    );
}
