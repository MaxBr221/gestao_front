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
                                    <tr className="bg-gray-50/80 border-b border-gray-100">
                                        <th className="py-5 px-6 font-bold text-[#1A5F7A] text-sm uppercase tracking-wider">Data</th>
                                        <th className="py-5 px-6 font-bold text-[#1A5F7A] text-sm uppercase tracking-wider">Serviços Realizados</th>
                                        <th className="py-5 px-6 font-bold text-[#1A5F7A] text-sm uppercase tracking-wider">Forma de Pagamento</th>
                                        <th className="py-5 px-6 font-bold text-[#1A5F7A] text-sm uppercase tracking-wider text-right">Valor Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {atendimentos.map((atendimento) => (
                                        <tr key={atendimento.id} className="border-b border-gray-50 hover:bg-[#50C4B5]/5 transition-colors duration-200">
                                            <td className="py-4 px-6">
                                                <div className="font-semibold text-gray-800">{formatarData(atendimento.dataServico)}</div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="text-sm font-medium text-gray-600 line-clamp-2">
                                                    {atendimento.atendimentos && atendimento.atendimentos.length > 0
                                                        ? atendimento.atendimentos.map((item, idx) => (
                                                            <span key={item.id || idx}>
                                                                {item.servico?.nome || "Serviço"}
                                                                {idx < atendimento.atendimentos.length - 1 ? " • " : ""}
                                                            </span>
                                                        ))
                                                        : <span className="text-gray-400 italic">Não especificado</span>
                                                    }
                                                </div>
                                                {atendimento.observacao && (
                                                    <div className="text-xs text-gray-400 mt-1">
                                                        Nota: {atendimento.observacao}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className={`px-3 py-1.5 text-xs font-bold rounded-full 
                                                    ${atendimento.formaPagamento === 'PIX' ? 'bg-teal-100 text-teal-700' : 
                                                      atendimento.formaPagamento === 'CARTAO' ? 'bg-blue-100 text-blue-700' : 
                                                      'bg-green-100 text-green-700'}`}>
                                                    {atendimento.formaPagamento}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                <span className="font-bold text-lg text-[#50C4B5]">
                                                    R$ {Number(atendimento.valor || 0).toFixed(2)}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </PainelLayout>
    );
}
