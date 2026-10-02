'use client'
import { useState, useEffect } from "react";
import { PainelLayout } from "../../components/PainelLayout";
import { buscarDespesas, excluirDespesa } from "../../resources/despesa/despesaService";
import { DespesaResponse, categoriasLabel } from "../../resources/despesa/despesa.types";
import { notification } from "../../components/notification";
import Link from "next/link";

export default function DespesasPage() {
    const [despesas, setDespesas] = useState<DespesaResponse[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [loading, setLoading] = useState(true);
    const [periodo, setPeriodo] = useState<"SEMANA" | "MES" | "ANO" | "PERSONALIZADO">("MES");
    
    // Para filtro personalizado
    const [dataInicial, setDataInicial] = useState("");
    const [dataFinal, setDataFinal] = useState("");

    const carregarDespesas = async () => {
        setLoading(true);
        try {
            let inicio = "";
            let fim = "";
            
            const hoje = new Date();
            if (periodo === "SEMANA") {
                const primeiroDia = new Date(hoje.setDate(hoje.getDate() - hoje.getDay()));
                const ultimoDia = new Date(hoje.setDate(hoje.getDate() - hoje.getDay() + 6));
                inicio = primeiroDia.toISOString().split('T')[0];
                fim = ultimoDia.toISOString().split('T')[0];
            } else if (periodo === "MES") {
                const primeiroDia = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
                const ultimoDia = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0);
                inicio = primeiroDia.toISOString().split('T')[0];
                fim = ultimoDia.toISOString().split('T')[0];
            } else if (periodo === "ANO") {
                const primeiroDia = new Date(hoje.getFullYear(), 0, 1);
                const ultimoDia = new Date(hoje.getFullYear(), 11, 31);
                inicio = primeiroDia.toISOString().split('T')[0];
                fim = ultimoDia.toISOString().split('T')[0];
            } else if (periodo === "PERSONALIZADO") {
                inicio = dataInicial;
                fim = dataFinal;
                if (!inicio || !fim) {
                    setLoading(false);
                    return; // Aguardando usuário preencher
                }
            }

            const todasDespesas = await buscarDespesas();
            
            // Filtro local
            let filtradas = todasDespesas;
            if (inicio && fim) {
                const dataIni = new Date(inicio).getTime();
                const dataFim = new Date(fim).getTime();
                filtradas = todasDespesas.filter(d => {
                    const dataDespesa = new Date(d.data).getTime();
                    return dataDespesa >= dataIni && dataDespesa <= dataFim;
                });
            }
            
            setDespesas(filtradas);
            setTotal(filtradas.reduce((acc, curr) => acc + curr.valor, 0));
            
        } catch (error) {
            notification().notify("Não foi possível carregar as despesas.", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (periodo !== "PERSONALIZADO" || (dataInicial && dataFinal)) {
            carregarDespesas();
        }
    }, [periodo, dataInicial, dataFinal]);

    const formatarData = (dataStr: string) => {
        if(!dataStr) return "";
        const [ano, mes, dia] = dataStr.split('-');
        return `${dia}/${mes}/${ano}`;
    };

    const handleDelete = async (id: number) => {
        if (confirm("Deseja realmente excluir esta despesa?")) {
            try {
                await excluirDespesa(id);
                notification().notify("Despesa excluída com sucesso!", "success");
                carregarDespesas();
            } catch (error) {
                notification().notify("Erro ao excluir despesa.", "error");
            }
        }
    };

    return (
        <PainelLayout>
            <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-[#1A5F7A]">Despesas</h1>
                        <p className="text-gray-500 mt-2">Gerencie as despesas financeiras da sua barbearia.</p>
                    </div>
                    <Link href="/painel/despesas/nova" className="w-full sm:w-auto bg-[#50C4B5] text-white text-center font-bold py-3 px-6 rounded-xl shadow-md hover:shadow-lg hover:bg-[#43B3A5] transition-all duration-300 transform hover:-translate-y-1">
                        + Nova Despesa
                    </Link>
                </div>

                <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                        <div className="flex gap-2 bg-gray-100 p-1 rounded-xl w-full md:w-auto overflow-x-auto no-scrollbar whitespace-nowrap">
                            {['SEMANA', 'MES', 'ANO', 'PERSONALIZADO'].map(p => (
                                <button 
                                    key={p} 
                                    onClick={() => setPeriodo(p as any)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition flex-shrink-0 ${periodo === p ? 'bg-white text-[#1A5F7A] shadow' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    {p === 'SEMANA' ? 'Semana' : p === 'MES' ? 'Mês' : p === 'ANO' ? 'Ano' : 'Personalizado'}
                                </button>
                            ))}
                        </div>
                        
                        {periodo === 'PERSONALIZADO' && (
                            <div className="flex flex-col sm:flex-row gap-3 items-center bg-gray-50 p-2 rounded-2xl border border-gray-100">
                                <input 
                                    type="date" 
                                    value={dataInicial} 
                                    onChange={e => setDataInicial(e.target.value)} 
                                    className="border border-gray-200 bg-white text-gray-700 rounded-xl px-4 py-2 text-sm outline-none focus:ring-4 focus:ring-[#50C4B5]/20 focus:border-[#50C4B5] transition-all w-full sm:w-auto font-medium" 
                                />
                                <span className="text-gray-400 text-sm font-bold uppercase">até</span>
                                <input 
                                    type="date" 
                                    value={dataFinal} 
                                    onChange={e => setDataFinal(e.target.value)} 
                                    className="border border-gray-200 bg-white text-gray-700 rounded-xl px-4 py-2 text-sm outline-none focus:ring-4 focus:ring-[#50C4B5]/20 focus:border-[#50C4B5] transition-all w-full sm:w-auto font-medium" 
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
                    <p className="text-gray-500 font-bold mb-2">Total de despesas no período</p>
                    <h2 className="text-4xl font-black text-[#e53e3e]">
                        R$ {total.toFixed(2)}
                    </h2>
                </div>

                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    {loading ? (
                        <div className="p-10 text-center text-gray-500">Carregando despesas...</div>
                    ) : despesas.length === 0 ? (
                        <div className="p-10 text-center text-gray-500">Nenhuma despesa encontrada neste período.</div>
                    ) : (
                        <div className="w-full">
                            {/* Visualização Mobile (Cards) */}
                            <div className="block md:hidden divide-y divide-gray-100">
                                {despesas.map(despesa => (
                                    <div key={despesa.id} className="p-5 hover:bg-gray-50 transition-colors">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="pr-4">
                                                <p className="font-bold text-gray-800 text-base">{despesa.descricao}</p>
                                                <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1 font-medium">
                                                    <span>📅</span>
                                                    {formatarData(despesa.data)}
                                                </div>
                                            </div>
                                            <button onClick={() => handleDelete(despesa.id)} className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-all flex-shrink-0">
                                                🗑️
                                            </button>
                                        </div>
                                        {despesa.observacao && <p className="text-sm text-gray-500 mb-3 line-clamp-1">{despesa.observacao}</p>}
                                        <div className="flex justify-between items-end mt-4">
                                            <span className="bg-[#1A5F7A]/5 border border-[#1A5F7A]/10 text-[#1A5F7A] px-2.5 py-1 rounded-md text-xs font-bold">
                                                {categoriasLabel[despesa.categoria] || despesa.categoria}
                                            </span>
                                            <span className="font-black text-[#e53e3e] text-lg">
                                                R$ {despesa.valor.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Visualização Desktop (Tabela) */}
                            <div className="hidden md:block overflow-x-auto">
                                <table className="w-full text-left border-collapse min-w-[700px]">
                                    <thead>
                                        <tr className="bg-gray-50/80 text-gray-500 border-b">
                                            <th className="p-5 font-semibold text-sm uppercase tracking-wider">Data</th>
                                            <th className="p-5 font-semibold text-sm uppercase tracking-wider">Descrição</th>
                                            <th className="p-5 font-semibold text-sm uppercase tracking-wider">Categoria</th>
                                            <th className="p-5 font-semibold text-sm uppercase tracking-wider">Valor</th>
                                            <th className="p-5 font-semibold text-sm uppercase tracking-wider text-center">Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {despesas.map(despesa => (
                                            <tr key={despesa.id} className="border-b last:border-0 hover:bg-gray-50/50 transition-colors duration-200">
                                                <td className="p-5 text-gray-600 font-medium whitespace-nowrap">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-gray-400">📅</span>
                                                        {formatarData(despesa.data)}
                                                    </div>
                                                </td>
                                                <td className="p-5 text-gray-800 font-bold">
                                                    {despesa.descricao}
                                                    {despesa.observacao && <p className="text-sm font-normal text-gray-400 mt-1 line-clamp-1">{despesa.observacao}</p>}
                                                </td>
                                                <td className="p-5">
                                                    <span className="bg-[#1A5F7A]/5 border border-[#1A5F7A]/10 text-[#1A5F7A] px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap">
                                                        {categoriasLabel[despesa.categoria] || despesa.categoria}
                                                    </span>
                                                </td>
                                                <td className="p-5 font-bold text-[#e53e3e] whitespace-nowrap text-lg">
                                                    R$ {despesa.valor.toFixed(2)}
                                                </td>
                                                <td className="p-5 text-center">
                                                    <button onClick={() => handleDelete(despesa.id)} className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 hover:scale-105 transition-all" title="Excluir">
                                                        🗑️
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </PainelLayout>
    );
}
