'use client'
import { Template } from "../components/Template";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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

            <div className="w-full max-w-6xl mx-auto px-6 py-10">

                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-[#1A5F7A]">
                        Painel de Gestão
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Escolha o relatório que deseja visualizar.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 -mt-6">

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
                <div className="grid md:grid-cols-2 gap-6 mt-5">

                    {/* Faturamento semanal */}
                    <div className="bg-white rounded-2xl shadow-md p-6">

                        <p className="text-gray-500 font-bold">
                            Faturamento da semana
                        </p>

                        <div className="mt-4 space-y-3">

                            {semanal.map((relatorio) => (
                                <div
                                    key={relatorio.dia}
                                    className="flex justify-between items-center"
                                >
                                    <span className="text-gray-600 font-medium">
                                        {relatorio.dia}
                                    </span>

                                    <span className="text-[#1A5F7A] font-bold">
                                        R$ {relatorio.faturamento}
                                    </span>
                                </div>
                            ))}

                        </div>

                    </div>


                    {/* Serviços realizados */}
                    <div className="bg-white rounded-2xl shadow-md p-6">

                        <p className="text-gray-500 font-bold">
                            Serviços realizados hoje
                        </p>

                        <div className="mt-4 space-y-3">

                            {servico.map((item) => (
                                <div
                                    key={item.nome}
                                    className="flex justify-between items-center"
                                >
                                    <span className="text-gray-600 font-medium">
                                        {item.nome}
                                    </span>

                                    <span className="text-[#1A5F7A] font-bold">
                                        {item.quantidade}
                                    </span>
                                </div>
                            ))}

                        </div>

                    </div>

                </div>
            </div>

        </Template>
    );
}