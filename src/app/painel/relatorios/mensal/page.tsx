'use client'
import { AuthTemplate } from "../../../components/Template";
import { useEffect, useState } from "react";
import { buscarRelatorioMensal } from "../../../resources/relatorio/relatorioService";
import { RelatorioCard } from "../../../components/RelatorioCard";
import { PainelLayout } from "../../../components/PainelLayout";
import { notification } from "../../../components/notification/index";


export default function RelatorioMensalPage() {

    const [relatorio, setRelatorio] = useState<any>(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        async function carregar() {

            try {

                const dados = await buscarRelatorioMensal();

                console.log("Relatório recebido:", dados);

                setRelatorio(dados);

            } catch (error) {

                console.error(
                    "Erro ao carregar relatório Mensal:",
                    error
                );
                notification().notify("Erro ao carregar relatorio mensal!", "error");

            }
            finally {

                setLoading(false);

            }

        }

        carregar();

    }, []);
    if (loading) {
        return (
            <AuthTemplate>
                <div className="flex justify-center items-center py-20">
                    <p className="text-gray-500">
                        Carregando relatório...
                    </p>
                </div>
            </AuthTemplate>
        );
    }

    if (!relatorio) {
        return (
            <AuthTemplate>
                <div className="text-center py-20">
                    <h2 className="text-xl font-bold text-gray-700">
                        Não foi possível carregar o relatório.
                    </h2>
                </div>
            </AuthTemplate>
        );
    }


    return (
         <PainelLayout>

            <div className="px-6 py-10">

                <div className="mb-8 text-center">

                    <h1 className="text-3xl font-black text-[#1A5F7A]">
                        Relatório Mensal
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Resumo dos atendimentos realizados neste mês
                    </p>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">

                    <RelatorioCard
                        titulo="Faturamento do mês"
                        valor={`R$ ${relatorio.faturamento.toFixed(2)}`}
                        icone="💰"
                    />

                    <RelatorioCard
                        titulo="Atendimentos no mês"
                        valor={String(relatorio.quantAtendimentos)}
                        icone="✂️"
                    />

                    <RelatorioCard
                        titulo="Serviço mais realizado"
                        valor={relatorio.servicoMaiorFrequencia ?? "Nenhum serviço"}
                        icone="🏆"
                    />

                </div>

            </div>

        </PainelLayout>
    );
}