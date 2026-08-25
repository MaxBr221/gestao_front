'use client'
import { Template } from "../components/Template";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BarChart,Bar,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer } from "recharts";
import { buscarRelatorioDiario, buscarRelatorioSemanal, servicosDeHoje } from "../resources/relatorio/relatorioService";

export default function PainelPage() {
    const router = useRouter();
    const [diario, setDiario] = useState<any>(null);
    const [semanal, setSemanal] = useState<RelatorioSemanalResponse[]>([]);
    const [servico, setServico] = useState<ServicosRealizado[]>([]);


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
 
interface ServicosRealizado{
    nome: string;
    quantidade: number
}
    
    useEffect(() =>{
        async function carregarRelatorio() {
            const dadosDiario = await buscarRelatorioDiario();
            const dadosSemanal = await buscarRelatorioSemanal(); 
            const servicosHoje = await servicosDeHoje();   
            setDiario(dadosDiario);
            setSemanal(dadosSemanal);
            setServico(servicosHoje);   
        }
        carregarRelatorio();
    }, [])
    
    return (
        <Template>
            <div className="w-full max-w-6xl mx-auto px-6 py-6">

                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-[#1A5F7A]">
                        Painel de Gestão
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Escolha o relatório que deseja visualizar.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                    <div className="bg-white rounded-2xl shadow-md p-6">
                        <p className="text-gray-500 font-bold">
                            💰 Faturamento Hoje
                        </p>
                        <h2 className="text-3xl font-black text-[#1A5F7A] mt-2">
                            R$ {diario?.faturamento ?? "0,00"}
                        </h2>

                        <p className="text-sm text-gray-400 mt-1">
                            Total faturado hoje
                        </p>  
                    </div> 
                    
                    <div className="bg-white rounded-2xl shadow-md p-6">
                        <p className="text-gray-500 font-bold">
                            ✂️ Atendimentos Hoje
                        </p>
                        <h2 className="text-3xl font-black text-[#1A5F7A] mt-2">
                            {diario?.quantAtendimentos ?? 0}
                        </h2>
                        <p className="text-sm text-gray-400 mt-1">
                            Total de atendimentos
                        </p>
                    </div> 

                    <div className="bg-white rounded-2xl shadow-md p-6">
                        <p className="text-gray-500 font-bold">
                            🏆 Serviços mais realizados
                        </p>
                        <h2 className="text-3xl font-black text-[#1A5F7A] mt-2">
                            {diario?.servicoMaiorFrequencia ?? "Não há no momento!"}
                        </h2>
                    </div>                  
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

                    {/* FATURAMENTO DA SEMANA */}
                    <div className="bg-white rounded-2xl shadow-md p-6">

                        <div className="mb-6">
                            <h2 className="text-gray-700 font-bold text-lg">
                                Faturamento da semana
                            </h2>

                            <p className="text-gray-400 text-sm mt-1">
                                Acompanhe o faturamento de cada dia
                            </p>
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


                    {/* SERVIÇOS REALIZADOS */}
                    <div className="bg-white rounded-2xl shadow-md p-6">

                        <div className="mb-6">
                            <h2 className="text-gray-700 font-bold text-lg">
                                Serviços realizados hoje
                            </h2>

                            <p className="text-gray-400 text-sm mt-1">
                                Quantidade de cada serviço realizado
                            </p>
                        </div>

                        <div className="w-full h-[260px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={servico}
                                    layout="vertical"
                                    margin={{
                                        top: 5,
                                        right: 20,
                                        left: 5,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        horizontal={false}
                                    />

                                    <XAxis
                                        type="number"
                                        allowDecimals={false}
                                        tick={{ fontSize: 12 }}
                                    />

                                    <YAxis
                                        type="category"
                                        dataKey="nome"
                                        width={90}
                                        tick={{ fontSize: 12 }}
                                    />

                                    <Tooltip
                                        formatter={(value) => [
                                            `${value}`,
                                            "Quantidade",
                                        ]}
                                    />

                                    <Bar
                                        dataKey="quantidade"
                                        fill="#1A5F7A"
                                        radius={[0, 8, 8, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                </div>
            </div>

        </Template>
    );
}