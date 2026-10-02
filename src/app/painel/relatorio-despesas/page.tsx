'use client'
import { useState, useEffect } from "react";
import { PainelLayout } from "../../components/PainelLayout";
import { buscarDespesas } from "../../resources/despesa/despesaService";
import { DespesaResponse, categoriasLabel } from "../../resources/despesa/despesa.types";
import { notification } from "../../components/notification";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function RelatorioDespesasPage() {
    const [despesasFiltradas, setDespesasFiltradas] = useState<DespesaResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [periodoStr, setPeriodoStr] = useState("");
    
    const [mesAno, setMesAno] = useState<string>("");

    useEffect(() => {
        const hoje = new Date();
        const m = (hoje.getMonth() + 1).toString().padStart(2, '0');
        const y = hoje.getFullYear();
        setMesAno(`${y}-${m}`);
    }, []);

    useEffect(() => {
        if (!mesAno) return;
        
        const carregarRelatorio = async () => {
            setLoading(true);
            try {
                const [ano, mes] = mesAno.split('-');
                const dataInicial = new Date(Number(ano), Number(mes) - 1, 1).getTime();
                const dataFinal = new Date(Number(ano), Number(mes), 0, 23, 59, 59).getTime();
                
                const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
                setPeriodoStr(`${meses[Number(mes) - 1]} ${ano}`);

                const todasDespesas = await buscarDespesas();
                const filtradas = todasDespesas.filter(d => {
                    const time = new Date(d.data).getTime();
                    return time >= dataInicial && time <= dataFinal;
                });
                
                setDespesasFiltradas(filtradas);
            } catch (error) {
                notification().notify("Não foi possível carregar o relatório.", "error");
                setDespesasFiltradas([]);
            } finally {
                setLoading(false);
            }
        };

        carregarRelatorio();
    }, [mesAno]);

    const agregacaoPorCategoria = () => {
        const mapa: Record<string, number> = {};
        despesasFiltradas.forEach(d => {
            mapa[d.categoria] = (mapa[d.categoria] || 0) + d.valor;
        });
        return mapa;
    };

    const prepararDadosGrafico = () => {
        if (despesasFiltradas.length === 0) return [];
        const mapa = agregacaoPorCategoria();
        return Object.entries(mapa).map(([cat, val]) => ({
            name: categoriasLabel[cat as keyof typeof categoriasLabel] || cat,
            value: val
        })).sort((a, b) => b.value - a.value);
    };

    const calcularTotal = () => {
        return despesasFiltradas.reduce((acc, curr) => acc + curr.valor, 0);
    };

    const COLORS = ['#1A5F7A', '#50C4B5', '#e53e3e', '#f6ad55', '#4299e1', '#9f7aea', '#ed64a6', '#48bb78', '#ecc94b', '#a0aec0'];

    return (
        <PainelLayout>
            <div className="w-full max-w-6xl mx-auto px-6 py-10">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[#1A5F7A]">Relatório de Despesas</h1>
                    <p className="text-gray-500 mt-2">Analise seus gastos por categoria.</p>
                </div>

                <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
                    <div className="flex items-center gap-4">
                        <label className="text-gray-600 font-medium">Período:</label>
                        <input 
                            type="month" 
                            value={mesAno}
                            onChange={(e) => setMesAno(e.target.value)}
                            className="border rounded-xl p-2 outline-none focus:border-[#50C4B5] text-gray-700"
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="bg-white rounded-2xl shadow-md p-10 text-center text-gray-500">
                        Carregando relatório...
                    </div>
                ) : despesasFiltradas ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-1 space-y-6">
                            <div className="bg-white rounded-2xl shadow-md p-6">
                                <p className="text-gray-500 font-bold">Total Gasto</p>
                                <h2 className="text-3xl font-black text-[#e53e3e] mt-2">
                                    R$ {calcularTotal().toFixed(2)}
                                </h2>
                            </div>
                            
                            <div className="bg-white rounded-2xl shadow-md p-6">
                                <p className="text-gray-500 font-bold">Registros de Despesa</p>
                                <h2 className="text-3xl font-black text-[#1A5F7A] mt-2">
                                    {despesasFiltradas.length}
                                </h2>
                            </div>
                            
                            <div className="bg-white rounded-2xl shadow-md p-6">
                                <h3 className="text-lg font-bold text-[#1A5F7A] mb-4">Por Categoria</h3>
                                <div className="space-y-3">
                                    {despesasFiltradas.length === 0 ? (
                                        <p className="text-gray-400 text-sm">Nenhum dado encontrado.</p>
                                    ) : (
                                        Object.entries(agregacaoPorCategoria())
                                            .sort(([, a], [, b]) => b - a)
                                            .map(([cat, val]) => (
                                                <div key={cat} className="flex justify-between items-center border-b pb-2 last:border-0 last:pb-0">
                                                    <span className="text-gray-600 font-medium">{categoriasLabel[cat as keyof typeof categoriasLabel] || cat}</span>
                                                    <span className="font-bold text-gray-800">R$ {val.toFixed(2)}</span>
                                                </div>
                                            ))
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6">
                            <h3 className="text-lg font-bold text-[#1A5F7A] mb-6">Distribuição de Despesas ({periodoStr})</h3>
                            <div className="w-full h-[400px] flex items-center justify-center">
                                {prepararDadosGrafico().length > 0 ? (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={prepararDadosGrafico()}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={80}
                                                outerRadius={140}
                                                paddingAngle={2}
                                                dataKey="value"
                                            >
                                                {prepararDadosGrafico().map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip formatter={(value: number) => `R$ ${value.toFixed(2)}`} />
                                            <Legend verticalAlign="bottom" height={36}/>
                                        </PieChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <p className="text-gray-400">Sem dados suficientes para o gráfico neste período.</p>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-md p-10 text-center text-gray-500">
                        Nenhum dado encontrado para o período selecionado.
                    </div>
                )}
            </div>
        </PainelLayout>
    );
}
