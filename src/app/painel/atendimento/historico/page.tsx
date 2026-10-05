'use client'
import { useState, useEffect } from "react"
import { AtendimentoResponseDTO, buscarAtendimentos } from "../../../resources/atendimento/atendimentoService"
import { PainelLayout } from "../../../components/PainelLayout";
import { notification } from "../../../components/notification/index";

export default function HistoricoAtendimentosPage() {
    const [atendimentos, setAtendimentos] = useState<AtendimentoResponseDTO[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function carregarAtendimentos() {
            try {
                const dados = await buscarAtendimentos();
                setAtendimentos(dados);
            } catch (error) {
                notification().notify("Erro ao carregar histórico de atendimentos.", "error");
            } finally {
                setLoading(false);
            }
        }
        carregarAtendimentos();
    }, []);

    function formatarData(dataISO: string) {
        if (!dataISO) return "-";
        const data = new Date(dataISO);
        return data.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    return (
        <PainelLayout>
            <div className="w-full max-w-6xl mx-auto px-6 py-10">
                <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-[#1A5F7A]">
                            Histórico de Atendimentos
                        </h1>
                        <p className="text-gray-500 mt-2">
                            Acompanhe todos os atendimentos realizados na barbearia.
                        </p>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center mt-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-[#50C4B5]"></div>
                    </div>
                ) : atendimentos.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-sm p-16 text-center border border-gray-100">
                        <div className="text-6xl mb-4">📭</div>
                        <h2 className="text-2xl font-bold text-[#1A5F7A] mb-2">Nenhum atendimento registrado</h2>
                        <p className="text-gray-500">
                            Os atendimentos realizados aparecerão aqui.
                        </p>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-50">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-[#f8fcfb] border-b border-gray-100">
                                        <th className="py-5 px-6 font-bold text-[#1A5F7A] text-xs uppercase tracking-widest">Data do Atendimento</th>
                                        <th className="py-5 px-6 font-bold text-[#1A5F7A] text-xs uppercase tracking-widest">Serviços Realizados</th>
                                        <th className="py-5 px-6 font-bold text-[#1A5F7A] text-xs uppercase tracking-widest text-right">Valor Total</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {atendimentos.map((atendimento) => {
                                        const [data, hora] = formatarData(atendimento.dataServico).split(", ");
                                        return (
                                        <tr key={atendimento.id} className="bg-white hover:bg-[#50C4B5]/5 transition-all duration-200 group">
                                            <td className="py-5 px-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="hidden sm:flex w-10 h-10 rounded-xl bg-[#1A5F7A]/5 items-center justify-center text-[#1A5F7A] group-hover:bg-[#50C4B5]/10 group-hover:text-[#50C4B5] transition-colors">
                                                        📅
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-gray-800 text-sm">{data}</div>
                                                        {hora && <div className="text-xs font-medium text-gray-500 mt-1">às {hora}</div>}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-5 px-6">
                                                <div className="flex flex-wrap gap-2">
                                                    {atendimento.atendimentos && atendimento.atendimentos.length > 0
                                                        ? atendimento.atendimentos.map((item, idx) => (
                                                            <span key={item.id || idx} className="px-3 py-1.5 bg-gray-50 text-gray-600 text-xs font-semibold rounded-lg border border-gray-200/60 shadow-sm">
                                                                {item.servico?.nome || "Serviço"}
                                                            </span>
                                                        ))
                                                        : <span className="text-gray-400 italic text-sm">Não especificado</span>
                                                    }
                                                </div>
                                                {atendimento.observacao && (
                                                    <div className="text-xs text-gray-400 mt-2 flex items-center gap-1.5">
                                                        <span className="text-gray-300 font-bold">↳</span> {atendimento.observacao}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="py-5 px-6 text-right">
                                                <div className="inline-flex items-center justify-end px-3 py-1.5 bg-[#50C4B5]/10 rounded-xl border border-[#50C4B5]/20">
                                                    <span className="text-[#50C4B5] font-black text-lg">
                                                        R$ {Number(atendimento.valor || 0).toFixed(2)}
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    )})}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </PainelLayout>
    );
}
