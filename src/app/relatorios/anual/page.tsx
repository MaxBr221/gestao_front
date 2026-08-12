'use client'

import { Template } from "../../components/Template";
import { useEffect, useState } from "react";
import { buscarRelatorioAnual } from "../../resources/relatorio/relatorioService";

export default function RelatorioAnualPage() {

    const [relatorio, setRelatorio] = useState<any>(null);

    useEffect(() => {

        async function carregar() {

            try {

                const dados = await buscarRelatorioAnual();

                console.log("Relatório recebido:", dados);

                setRelatorio(dados);

            } catch (error) {

                console.error(
                    "Erro ao carregar relatório Anual:",
                    error
                );

            }

        }

        carregar();

    }, []);


    return (
        <Template>

            <div className="p-8 color-blue">

                <h1 className="text-3xl font-bold text-[#1A5F7A]">
                    Relatório Anual
                </h1>

                {relatorio && (
                    <pre className="mt-5 bg-gray-100 p-4 rounded">
                        {JSON.stringify(relatorio, null, 2)}
                    </pre>
                )}

            </div>

        </Template>
    );
}