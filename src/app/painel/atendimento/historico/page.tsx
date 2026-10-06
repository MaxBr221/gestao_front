'use client'
import { useState, useEffect } from "react"
import { AtendimentoResponseDTO, buscarAtendimentos, deletarAtendimento } from "../../../resources/atendimento/atendimentoService"
import { PainelLayout } from "../../../components/PainelLayout";
import { notification } from "../../../components/notification/index";

export default function HistoricoAtendimentosPage() {
    const [atendimentos, setAtendimentos] = useState<AtendimentoResponseDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [atendimentoParaExcluir, setAtendimentoParaExcluir] = useState<number | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        async function carregarAtendimentos() {
            try {
                const dados = await buscarAtendimentos();
                const dadosOrdenados = dados.sort((a, b) => 
                    new Date(b.dataServico).getTime() - new Date(a.dataServico).getTime()
                );
                setAtendimentos(dadosOrdenados);
            } catch (error) {
                notification().notify("Erro ao carregar histórico de atendimentos.", "error");
            } finally {
                setLoading(false);
            }
        }
        carregarAtendimentos();
    }, []);

    function confirmarExclusao(id: number) {
        setAtendimentoParaExcluir(id);
    }

    async function handleExcluir() {
        if (!atendimentoParaExcluir) return;
        setIsDeleting(true);
        try {
            await deletarAtendimento(atendimentoParaExcluir);
            setAtendimentos(prev => prev.filter(a => a.id !== atendimentoParaExcluir));
            notification().notify("Atendimento excluído com sucesso!", "success");
            setAtendimentoParaExcluir(null);
        } catch (error) {
            notification().notify("Erro ao excluir o atendimento.", "error");
        } finally {
            setIsDeleting(false);
        }
    }

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
                    <div className="bg-white rounded-2xl shadow-md border border-gray-50 overflow-hidden">
                        {/* Versão Desktop (Tabela) */}
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-[#f8fcfb] border-b border-gray-100">
                                        <th className="py-5 px-6 font-bold text-[#1A5F7A] text-xs uppercase tracking-widest">Data do Atendimento</th>
                                        <th className="py-5 px-6 font-bold text-[#1A5F7A] text-xs uppercase tracking-widest">Serviços Realizados</th>
                                        <th className="py-5 px-6 font-bold text-[#1A5F7A] text-xs uppercase tracking-widest text-right">Valor Total</th>
                                        <th className="py-5 px-6 font-bold text-[#1A5F7A] text-xs uppercase tracking-widest text-center">Ações</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {atendimentos.map((atendimento) => {
                                        const [data, hora] = formatarData(atendimento.dataServico).split(", ");
                                        return (
                                        <tr key={atendimento.id} className="bg-white hover:bg-[#50C4B5]/5 transition-all duration-200 group">
                                            <td className="py-5 px-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-[#1A5F7A]/5 flex items-center justify-center text-[#1A5F7A] group-hover:bg-[#50C4B5]/10 group-hover:text-[#50C4B5] transition-colors">
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
                                            <td className="py-5 px-6 text-center">
                                                <button
                                                    onClick={() => confirmarExclusao(atendimento.id)}
                                                    className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                                                    title="Excluir Atendimento"
                                                >
                                                    🗑️
                                                </button>
                                            </td>
                                        </tr>
                                    )})}
                                </tbody>
                            </table>
                        </div>

                        {/* Versão Mobile (Cards) */}
                        <div className="md:hidden flex flex-col divide-y divide-gray-100">
                            {atendimentos.map((atendimento) => {
                                const [data, hora] = formatarData(atendimento.dataServico).split(", ");
                                return (
                                    <div key={atendimento.id} className="p-5 flex flex-col gap-5 bg-white hover:bg-[#50C4B5]/5 transition-colors">
                                        <div className="flex justify-between items-start">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-[#1A5F7A]/5 flex items-center justify-center text-[#1A5F7A]">
                                                    📅
                                                </div>
                                                <div>
                                                    <div className="font-bold text-gray-800 text-sm">{data}</div>
                                                    {hora && <div className="text-xs font-medium text-gray-500 mt-0.5">às {hora}</div>}
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end gap-2 shrink-0">
                                                <div className="inline-flex items-center px-3 py-1.5 bg-[#50C4B5]/10 rounded-lg border border-[#50C4B5]/20">
                                                    <span className="text-[#50C4B5] font-black text-sm">
                                                        R$ {Number(atendimento.valor || 0).toFixed(2)}
                                                    </span>
                                                </div>
                                                <button
                                                    onClick={() => confirmarExclusao(atendimento.id)}
                                                    className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded-lg transition-colors text-xs flex items-center gap-1 font-semibold"
                                                >
                                                    🗑️ Excluir
                                                </button>
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <p className="text-[10px] font-bold text-[#1A5F7A] uppercase tracking-widest mb-2">Serviços Realizados</p>
                                            <div className="flex flex-wrap gap-2">
                                                {atendimento.atendimentos && atendimento.atendimentos.length > 0
                                                    ? atendimento.atendimentos.map((item, idx) => (
                                                        <span key={item.id || idx} className="px-3 py-1 bg-gray-50 text-gray-600 text-xs font-semibold rounded-lg border border-gray-200/60 shadow-sm">
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
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}

                {/* Modal de Confirmação de Exclusão */}
                {atendimentoParaExcluir && (
                    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                            <div className="p-6 text-center">
                                <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                                    🗑️
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Excluir Atendimento?</h3>
                                <p className="text-gray-500 text-sm mb-4">
                                    Tem certeza que deseja excluir este atendimento? <br/>
                                    <strong className="text-red-500">Esta ação não pode ser desfeita.</strong>
                                </p>
                            </div>
                            <div className="bg-gray-50 p-4 flex gap-3 justify-center">
                                <button 
                                    onClick={() => setAtendimentoParaExcluir(null)}
                                    disabled={isDeleting}
                                    className="px-5 py-2.5 rounded-xl font-medium text-gray-600 bg-white border border-gray-200 hover:bg-gray-100 transition-colors w-full"
                                >
                                    Cancelar
                                </button>
                                <button 
                                    onClick={handleExcluir}
                                    disabled={isDeleting}
                                    className={`px-5 py-2.5 rounded-xl font-bold text-white transition-colors w-full shadow-sm ${
                                        isDeleting ? "bg-red-400 cursor-not-allowed opacity-70" : "bg-red-500 hover:bg-red-600"
                                    }`}
                                >
                                    {isDeleting ? "Excluindo..." : "Excluir"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </PainelLayout>
    );
}
