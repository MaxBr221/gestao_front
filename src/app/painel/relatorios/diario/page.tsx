'use client'
import { Template } from "../../../components/Template";
import { useEffect, useState } from "react";
import { buscarRelatorioDiario } from "../../../resources/relatorio/relatorioService";
import { RelatorioCard } from "../../../components/RelatorioCard";
interface Relatorio {
    faturamento: number;
    quantAtendimentos: number;
    servicoMaiorFrequencia: string | null;
}

export default function RelatorioDiarioPage() {

    const [relatorio, setRelatorio] = useState<Relatorio | null>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {

        async function carregar() {
            try {

                const dados = await buscarRelatorioDiario();

                console.log("Relatório:", dados);

                setRelatorio(dados);

            } catch (error) {

                console.error("Erro ao carregar relatório diário:", error);

            } finally {

                setLoading(false);

            }
        }

        carregar();

    }, []);
    


    if (loading) {
        return (
            <Template>
                <div className="flex justify-center items-center py-20">
                    <p className="text-gray-500">
                        Carregando relatório...
                    </p>
                </div>
            </Template>
        );
    }

    if (!relatorio) {
        return (
            <Template>
                <div className="text-center py-20">
                    <h2 className="text-xl font-bold text-gray-700">
                        Não foi possível carregar o relatório.
                    </h2>
                </div>
            </Template>
        );
    }

    return (
        <Template>

            <div className="px-6 py-10">

                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-black text-[#1A5F7A]">
                        Relatório Diário
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Resumo dos atendimentos realizados hoje
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">

                    <RelatorioCard
                        titulo="Faturamento"
                        valor={`R$ ${relatorio.faturamento.toFixed(2)}`}
                        icone="💰"
                    />

                    <RelatorioCard
                        titulo="Atendimentos"
                        valor={String(relatorio.quantAtendimentos)}
                        icone="✂️"
                    />

                    <RelatorioCard
                        titulo="Serviço mais realizado"
                        valor={relatorio?.servicoMaiorFrequencia || "Nenhum serviço"}
                        icone="🏆"
                    />

                </div>

            </div>

        </Template>
    );
}