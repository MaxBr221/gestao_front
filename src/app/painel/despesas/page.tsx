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
            <div className="w-full max-w-6xl mx-auto px-6 py-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-[#1A5F7A]">Despesas</h1>
                        <p className="text-gray-500 mt-2">Gerencie as despesas da sua barbearia.</p>
                    </div>
                    <Link href="/painel/despesas/nova" className="bg-[#50C4B5] text-white font-bold py-2 px-6 rounded-xl hover:bg-[#43B3A5] transition">
                        + Nova Despesa
                    </Link>
                </div>

                <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                        <div className="flex gap-2 bg-gray-100 p-1 rounded-xl w-full md:w-auto">
                            {['SEMANA', 'MES', 'ANO', 'PERSONALIZADO'].map(p => (
                                <button 
                                    key={p} 
                                    onClick={() => setPeriodo(p as any)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${periodo === p ? 'bg-white text-[#1A5F7A] shadow' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    {p === 'SEMANA' ? 'Semana' : p === 'MES' ? 'Mês' : p === 'ANO' ? 'Ano' : 'Personalizado'}
                                </button>
                            ))}
                        </div>
                        
                        {periodo === 'PERSONALIZADO' && (
                            <div className="flex gap-2 items-center">
                                <input type="date" value={dataInicial} onChange={e => setDataInicial(e.target.value)} className="border rounded-xl p-2 text-sm outline-none focus:border-[#50C4B5]" />
                                <span className="text-gray-400">até</span>
                                <input type="date" value={dataFinal} onChange={e => setDataFinal(e.target.value)} className="border rounded-xl p-2 text-sm outline-none focus:border-[#50C4B5]" />
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
                    <p className="text-gray-500 font-bold mb-2">Total de despesas no período</p>
                    <h2 className="text-3xl font-black text-[#e53e3e]">
                        R$ {total.toFixed(2)}
                    </h2>
                </div>

                <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                    {loading ? (
                        <div className="p-10 text-center text-gray-500">Carregando despesas...</div>
                    ) : despesas.length === 0 ? (
                        <div className="p-10 text-center text-gray-500">Nenhuma despesa encontrada neste período.</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 text-gray-500 border-b">
                                        <th className="p-4 font-semibold text-sm">Data</th>
                                        <th className="p-4 font-semibold text-sm">Descrição</th>
                                        <th className="p-4 font-semibold text-sm">Categoria</th>
                                        <th className="p-4 font-semibold text-sm">Valor</th>
                                        <th className="p-4 font-semibold text-sm text-center">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {despesas.map(despesa => (
                                        <tr key={despesa.id} className="border-b hover:bg-gray-50 transition">
                                            <td className="p-4 text-gray-600 text-sm whitespace-nowrap">
                                                {formatarData(despesa.data)}
                                            </td>
                                            <td className="p-4 text-gray-800 font-medium">
                                                {despesa.descricao}
                                                {despesa.observacao && <p className="text-xs text-gray-400 mt-1">{despesa.observacao}</p>}
                                            </td>
                                            <td className="p-4">
                                                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold">
                                                    {categoriasLabel[despesa.categoria] || despesa.categoria}
                                                </span>
                                            </td>
                                            <td className="p-4 font-bold text-[#e53e3e] whitespace-nowrap">
                                                R$ {despesa.valor.toFixed(2)}
                                            </td>
                                            <td className="p-4 text-center">
                                                <button onClick={() => handleDelete(despesa.id)} className="text-red-400 hover:text-red-600 transition" title="Excluir">
                                                    🗑️
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </PainelLayout>
    );
}
