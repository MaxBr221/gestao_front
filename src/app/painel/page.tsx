'use client'
import { PainelLayout } from "../components/PainelLayout";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
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
                const totalDespesas = despesas ? despesas.reduce((acc: number, curr: any) => acc + (Number(curr.valor) || 0), 0) : 0;
                
                // O lucro real (Saldo Líquido) é o Faturamento Mensal subtraído das Despesas Totais
                // Se o backend retornar 0 no mensal, fazemos o fallback temporário para o diário para não zerar
                const faturamentoMensal = dadosValorFinalMensal || dadosDiario?.faturamento || 0;
                const lucroLiquido = faturamentoMensal - totalDespesas;

                setValorFinal({ faturamento: faturamentoMensal, despesas: totalDespesas, resultado: lucroLiquido });

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

                {/* Métricas Principais Consolidadas */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

                    {/* Card 1: Faturamento Mensal */}
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 flex flex-col relative overflow-hidden group hover:shadow-md transition-shadow">
                        <div className="absolute -top-4 -right-4 p-4 opacity-[0.03] transform group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-500 pointer-events-none">
                            <span className="text-9xl">💰</span>
                        </div>
                        <p className="text-gray-400 font-semibold uppercase tracking-widest text-[10px] mb-1 z-10">Faturamento Mensal</p>
                        <h2 className="text-4xl font-black text-gray-800 tracking-tight z-10">
                            R$ {valorFinal?.faturamento?.toFixed(2) ?? diario?.faturamento?.toFixed(2) ?? "0.00"}
                        </h2>
                        <div className="mt-auto pt-6 flex items-center gap-2 z-10">
                            <span className="bg-red-50 text-red-600 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm border border-red-100">
                                📉 Despesas Totais: R$ {valorFinal?.despesas?.toFixed(2) ?? "0.00"}
                            </span>
                        </div>
                    </div>

                    {/* Card 2: Faturamento Hoje */}
                    <div className="bg-gradient-to-br from-[#1A5F7A] to-[#2B7A9F] rounded-3xl shadow-md p-6 flex flex-col relative overflow-hidden group hover:shadow-lg transition-shadow text-white">
                        <div className="absolute -top-4 -right-4 p-4 opacity-5 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500 pointer-events-none">
                            <span className="text-9xl">☀️</span>
                        </div>
                        <p className="text-white/70 font-semibold uppercase tracking-widest text-[10px] mb-1 z-10">Faturamento Hoje</p>
                        <h2 className="text-4xl font-black text-white tracking-tight z-10">
                            R$ {diario?.faturamento ?? "0,00"}
                        </h2>
                        <div className="mt-auto pt-6 flex items-center gap-2 z-10">
                            <span className="bg-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm backdrop-blur-md border border-white/10">
                                ✂️ Atendimentos Hoje: {diario?.quantAtendimentos ?? 0}
                            </span>
                        </div>
                    </div>

                    {/* Card 3: Lucro Líquido */}
                    <div className="bg-gradient-to-br from-[#50C4B5] to-[#43B3A5] rounded-3xl shadow-md p-6 flex flex-col relative overflow-hidden group hover:shadow-lg transition-shadow text-white">
                        <div className="absolute -top-4 -right-4 p-4 opacity-5 transform group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-500 pointer-events-none">
                            <span className="text-9xl">💎</span>
                        </div>
                        <p className="text-white/70 font-semibold uppercase tracking-widest text-[10px] mb-1 z-10">Lucro Líquido (Mês)</p>
                        <h2 className="text-4xl font-black text-white tracking-tight z-10">
                            R$ {valorFinal?.resultado?.toFixed(2) ?? "0.00"}
                        </h2>
                        <div className="mt-auto pt-6 flex items-center gap-2 z-10">
                            <span className="bg-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm backdrop-blur-md border border-white/10">
                                ✨ Valor Final
                            </span>
                        </div>
                    </div>
                </div>

                {/* Gráficos e Últimas Despesas */}
                {/* Definindo cores para o gráfico de rosca */}
                {(() => {
                    const COLORS = ['#50C4B5', '#1A5F7A', '#F59E0B', '#3B82F6', '#EC4899', '#8B5CF6'];
                    return (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                            <div className="lg:col-span-2 space-y-6">
                                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 flex flex-col h-full">
                                    <div className="mb-8">
                                        <h2 className="text-gray-800 font-bold text-lg flex items-center gap-2">
                                            📈 Faturamento da Semana
                                        </h2>
                                        <p className="text-gray-400 text-sm mt-1">Acompanhe a evolução diária das suas receitas</p>
                                    </div>
                                    <div className="w-full h-[280px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart
                                                data={semanal}
                                                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                                            >
                                                <defs>
                                                    <linearGradient id="colorFaturamento" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#50C4B5" stopOpacity={0.4}/>
                                                        <stop offset="95%" stopColor="#50C4B5" stopOpacity={0}/>
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                                <XAxis
                                                    dataKey="dia"
                                                    tickFormatter={(dia) => diasSemana[dia]}
                                                    tick={{ fontSize: 12, fill: "#9CA3AF", fontWeight: 500 }}
                                                    axisLine={false}
                                                    tickLine={false}
                                                    dy={10}
                                                />
                                                <YAxis
                                                    domain={[0, "auto"]}
                                                    allowDecimals={false}
                                                    tick={{ fontSize: 12, fill: "#9CA3AF", fontWeight: 500 }}
                                                    axisLine={false}
                                                    tickLine={false}
                                                />
                                                <Tooltip
                                                    cursor={{ stroke: '#50C4B5', strokeWidth: 1, strokeDasharray: '5 5' }}
                                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 'bold', color: '#1f2937' }}
                                                    formatter={(value) => [`R$ ${value}`, "Faturamento"]}
                                                    labelFormatter={(dia) => diasSemana[dia as number] || dia}
                                                />
                                                <Area
                                                    type="monotone"
                                                    dataKey="faturamento"
                                                    stroke="#50C4B5"
                                                    strokeWidth={4}
                                                    fillOpacity={1}
                                                    fill="url(#colorFaturamento)"
                                                    activeDot={{ r: 6, fill: '#1A5F7A', stroke: '#fff', strokeWidth: 2 }}
                                                />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-1 space-y-6">
                                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 flex flex-col">
                                    <div className="mb-6">
                                        <h2 className="text-gray-800 font-bold text-lg flex items-center gap-2">
                                            💸 Últimas Despesas
                                        </h2>
                                        <p className="text-gray-400 text-sm mt-1">As despesas mais recentes registradas</p>
                                    </div>

                                    {ultimasDespesas.length > 0 ? (
                                        <div className="space-y-4">
                                            {ultimasDespesas.map(desp => (
                                                <div key={desp.id} className="flex justify-between items-center border-b border-gray-50 pb-3 last:border-0 last:pb-0 hover:bg-gray-50/80 p-3 -mx-3 rounded-xl transition-colors">
                                                    <div>
                                                        <p className="font-bold text-gray-700 text-sm">{desp.descricao}</p>
                                                        <p className="text-xs text-gray-400 mt-0.5 font-medium">{formatarData(desp.data)}</p>
                                                    </div>
                                                    <span className="font-bold text-[#e53e3e] text-sm whitespace-nowrap bg-red-50 px-2 py-1 rounded-lg">
                                                        - R$ {desp.valor.toFixed(2)}
                                                    </span>
                                                </div>
                                            ))}
                                            <Link href="/painel/despesas" className="block text-center text-[#50C4B5] font-bold text-sm hover:text-[#43B3A5] transition-colors mt-6 pt-2 border-t border-gray-50">
                                                Ver todas as despesas &rarr;
                                            </Link>
                                        </div>
                                    ) : (
                                        <div className="text-center py-8">
                                            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">🍃</div>
                                            <p className="text-gray-400 text-sm font-medium">Nenhuma despesa registrada.</p>
                                        </div>
                                    )}
                                </div>

                                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 flex flex-col">
                                    <div className="mb-6">
                                        <h2 className="text-gray-800 font-bold text-lg flex items-center gap-2">
                                            ✂️ Serviços Hoje
                                        </h2>
                                        <p className="text-gray-400 text-sm mt-1">Quantidade por tipo de serviço</p>
                                    </div>

                                    <div className="w-full flex flex-col items-center">
                                        <div className="w-full h-[220px] relative">
                                            {/* Ícone Central - Z-index baixo para ficar atrás do Tooltip */}
                                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none z-0">
                                                <span className="text-3xl opacity-80">🎯</span>
                                            </div>
                                            
                                            <div className="w-full h-full relative z-10">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <PieChart>
                                                        <Pie
                                                            data={servico}
                                                            cx="50%"
                                                            cy="50%"
                                                            innerRadius={65}
                                                            outerRadius={95}
                                                            paddingAngle={5}
                                                            dataKey="quantidade"
                                                            nameKey="nome"
                                                            stroke="none"
                                                        >
                                                            {servico.map((entry, index) => (
                                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                            ))}
                                                        </Pie>
                                                        <Tooltip 
                                                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }}
                                                            formatter={(value, name) => [`${value} atendimentos`, name]} 
                                                        />
                                                    </PieChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4 pb-2">
                                            {servico.map((entry, index) => (
                                                <div key={index} className="flex items-center gap-1.5 text-xs text-gray-600 font-medium">
                                                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                                                    {entry.nome.split(' ')[0]}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })()}
            </div>

        </PainelLayout>
    );

}