'use client'
import { PainelLayout } from "../components/PainelLayout";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { buscarRelatorioDiario, buscarRelatorioSemanal, servicosDeHoje } from "../resources/relatorio/relatorioService";
import { buscarValorFinalMensal } from "../resources/valorFinal/valorFinalService";
import { buscarDespesas } from "../resources/despesa/despesaService";
import Link from "next/link";

export default function PainelPage() {
    const router = useRouter();
    const [diario, setDiario] = useState<any>(null);
    const [semanal, setSemanal] = useState<RelatorioSemanalResponse[]>([]);
    const [servico, setServico] = useState<ServicosRealizado[]>([]);
    const [valorFinal, setValorFinal] = useState<any>(null);
    const [ultimasDespesas, setUltimasDespesas] = useState<any[]>([]);


    interface RelatorioSemanalResponse {
        dia: string;
        faturamento: number;
    }
    const diasSemana: Record<string, string> = {
        MONDAY: "Seg",
        TUESDAY: "Ter",
        WEDNESDAY: "Qua",
        THURSDAY: "Qui",
        FRIDAY: "Sex",
        SATURDAY: "Sáb",
        SUNDAY: "Dom"
    };

    interface ServicosRealizado {
        nome: string;
        quantidade: number
    }

    useEffect(() => {
        async function carregarRelatorio() {
            try {
                const dadosDiario = await buscarRelatorioDiario();
                const dadosSemanal = await buscarRelatorioSemanal();
                const servicosHoje = await servicosDeHoje();

                // Novos endpoints
                const dadosValorFinalMensal = await buscarValorFinalMensal().catch(() => null);
                const despesas = await buscarDespesas().catch(() => []);

                setDiario(dadosDiario);
                setSemanal(dadosSemanal);
                setServico(servicosHoje);
                setValorFinal({ faturamento: null, despesas: null, resultado: dadosValorFinalMensal });

                // Pegar as 3 últimas despesas
                if (despesas && despesas.length > 0) {
                    const sorted = despesas.sort((a: any, b: any) => new Date(b.data).getTime() - new Date(a.data).getTime());
                    setUltimasDespesas(sorted.slice(0, 3));
                }
            } catch (error) {
                console.error("Erro ao carregar relatórios do painel", error);
            }
        }
        carregarRelatorio();
    }, [])

    const formatarData = (dataStr: string) => {
        if (!dataStr) return "";
        const [ano, mes, dia] = dataStr.split('-');
        return `${dia}/${mes}`;
    };

    return (
        <PainelLayout>
            <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 sm:mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-[#1A5F7A]">
                            Painel de Gestão
                        </h1>
                        <p className="text-gray-500 mt-2">
                            Acompanhe os resultados e métricas da sua barbearia.
                        </p>
                    </div>

                    <Link href="/painel/despesas/nova" className="bg-[#50C4B5] text-white text-center font-bold py-3 px-6 rounded-xl hover:bg-[#43B3A5] shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto">
                        + Nova Despesa
                    </Link>
                </div>

                {/* Resumo Financeiro */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 border-l-4 border-l-green-500 transform transition-all hover:scale-[1.02] cursor-default">
                        <p className="text-gray-500 font-bold uppercase tracking-wider text-sm">💰 Faturamento Global</p>
                        <h2 className="text-4xl font-black text-gray-800 mt-2">
                            R$ {valorFinal?.faturamento?.toFixed(2) ?? diario?.faturamento?.toFixed(2) ?? "0.00"}
                        </h2>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 border-l-4 border-l-red-500 transform transition-all hover:scale-[1.02] cursor-default">
                        <p className="text-gray-500 font-bold uppercase tracking-wider text-sm">📉 Despesas Totais</p>
                        <h2 className="text-4xl font-black text-[#e53e3e] mt-2">
                            R$ {valorFinal?.despesas?.toFixed(2) ?? "0.00"}
                        </h2>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 border-l-4 border-l-blue-500 transform transition-all hover:scale-[1.02] cursor-default">
                        <p className="text-gray-500 font-bold uppercase tracking-wider text-sm">🏆 Resultado Financeiro</p>
                        <h2 className="text-4xl font-black text-[#1A5F7A] mt-2">
                            R$ {valorFinal?.resultado?.toFixed(2) ?? "0.00"}
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 transform transition-all hover:scale-[1.02] cursor-default">
                        <p className="text-gray-500 font-bold uppercase tracking-wider text-sm">💰 Faturamento Hoje</p>
                        <h2 className="text-3xl font-black text-[#1A5F7A] mt-2">
                            R$ {diario?.faturamento ?? "0,00"}
                        </h2>
                        <p className="text-sm text-gray-400 mt-2 font-medium">Total faturado no dia atual</p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 transform transition-all hover:scale-[1.02] cursor-default">
                        <p className="text-gray-500 font-bold uppercase tracking-wider text-sm">✂️ Atendimentos Hoje</p>
                        <h2 className="text-3xl font-black text-[#1A5F7A] mt-2">
                            {diario?.quantAtendimentos ?? 0}
                        </h2>
                        <p className="text-sm text-gray-400 mt-2 font-medium">Total de atendimentos hoje</p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 transform transition-all hover:scale-[1.02] cursor-default">
                        <p className="text-gray-500 font-bold uppercase tracking-wider text-sm">🏆 Mais realizados</p>
                        <h2 className="text-3xl font-black text-[#1A5F7A] mt-2 line-clamp-1">
                            {diario?.servicoMaiorFrequencia ?? "Nenhum"}
                        </h2>
                        <p className="text-sm text-gray-400 mt-2 font-medium">Serviço mais popular de hoje</p>
                    </div>
                </div>

                {/* Gráficos e Últimas Despesas */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                            <div className="mb-6">
                                <h2 className="text-gray-700 font-bold text-lg">Faturamento da Semana</h2>
                                <p className="text-gray-400 text-sm mt-1">Acompanhe o faturamento de cada dia</p>
                            </div>
                            <div className="w-full h-[260px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={semanal}
                                        margin={{
                                            top: 10,
                                            right: 10,
                                            left: 0,
                                            bottom: 5,
                                        }}
                                    >
                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            vertical={false}
                                        />

                                        <XAxis
                                            dataKey="dia"
                                            tickFormatter={(dia) => diasSemana[dia]}
                                            tick={{ fontSize: 12 }}
                                        />

                                        <YAxis
                                            domain={[0, "auto"]}
                                            allowDecimals={false}
                                            tick={{ fontSize: 12 }}
                                        />

                                        <Tooltip
                                            formatter={(value) => [
                                                `R$ ${value}`,
                                                "Faturamento",
                                            ]}
                                            labelFormatter={(dia) =>
                                                diasSemana[dia as number]
                                            }
                                        />

                                        <Bar
                                            dataKey="faturamento"
                                            fill="#1A5F7A"
                                            radius={[8, 8, 0, 0]}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                        <div className="lg:col-span-1 space-y-6">
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                                <div className="mb-6">
                                    <h2 className="text-gray-700 font-bold text-lg">Últimas Despesas</h2>
                                    <p className="text-gray-400 text-sm mt-1">As despesas mais recentes registradas</p>
                                </div>

                                {ultimasDespesas.length > 0 ? (
                                    <div className="space-y-4">
                                        {ultimasDespesas.map(desp => (
                                            <div key={desp.id} className="flex justify-between items-center border-b border-gray-100 pb-3 last:border-0 last:pb-0 hover:bg-gray-50/50 p-2 -mx-2 rounded-lg transition-colors">
                                                <div>
                                                    <p className="font-bold text-gray-700 text-sm">{desp.descricao}</p>
                                                    <p className="text-xs text-gray-400">{formatarData(desp.data)}</p>
                                                </div>
                                                <span className="font-bold text-[#e53e3e] text-sm whitespace-nowrap">
                                                    R$ {desp.valor.toFixed(2)}
                                                </span>
                                            </div>
                                        ))}
                                        <Link href="/painel/despesas" className="block text-center text-[#50C4B5] font-bold text-sm hover:text-[#43B3A5] transition-colors mt-4 p-2">
                                            Ver todas as despesas
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="text-center py-6">
                                        <p className="text-gray-400 text-sm">Nenhuma despesa registrada.</p>
                                    </div>
                                )}
                            </div>

                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                                <div className="mb-6">
                                    <h2 className="text-gray-700 font-bold text-lg">Serviços Hoje</h2>
                                    <p className="text-gray-400 text-sm mt-1">Quantidade de cada serviço realizado</p>
                                </div>

                                <div className="w-full h-[260px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart
                                            data={servico}
                                            layout="vertical"
                                            margin={{ top: 5, right: 20, left: 5, bottom: 5 }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                            <XAxis type="number" allowDecimals={false} tick={{ fontSize: 12 }} />
                                            <YAxis type="category" dataKey="nome" width={90} tick={{ fontSize: 12 }} />
                                            <Tooltip formatter={(value) => [`${value}`, "Quantidade"]} />
                                            <Bar dataKey="quantidade" fill="#1A5F7A" radius={[0, 8, 8, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

        </PainelLayout>
    );

}