'use client'
import { Template } from "@/app/components/Template";
import { useEffect, useState } from "react"; 
import { buscarRelatorioDiario } from "@/app/resources/relatorio/relatorioService";

export default function DiarioPage(){

    const [relatorio, setRelatorio] = useState<any>(null);

    useEffect(() => {

        async function carregar() {

            const dados = await buscarRelatorioDiario();

            setRelatorio(dados);
        }

        carregar();

    }, []);

    return(
        <Template>
            <div>

            </div>
        </Template>
    )
}
