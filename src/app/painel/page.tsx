'use client'
import { Template } from "../components/Template";
import { useRouter } from "next/navigation";

export default function PainelPage() {

    const router = useRouter();
    //mais a frente colocar dashboard de fato
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


                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* DIÁRIO */}
                    <button
                        onClick={() => router.push("/painel/relatorios/diario")}
                        className="
                            bg-white
                            rounded-2xl
                            p-7
                            text-left
                            shadow-md
                            border
                            border-gray-100
                            hover:shadow-xl
                            hover:-translate-y-1
                            transition-all
                        "
                    >

                        <div className="text-4xl mb-5">
                            📅
                        </div>

                        <h2 className="text-xl font-bold text-[#1A5F7A]">
                            Relatório Diário
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Visualize os atendimentos e o faturamento do dia.
                        </p>

                        <div className="mt-6 text-[#C05C32] font-semibold">
                            Acessar relatório →
                        </div>

                    </button>


                    {/* MENSAL */}
                    <button
                        onClick={() => router.push("/painel/relatorios/mensal")}
                        className="
                            bg-white
                            rounded-2xl
                            p-7
                            text-left
                            shadow-md
                            border
                            border-gray-100
                            hover:shadow-xl
                            hover:-translate-y-1
                            transition-all
                        "
                    >

                        <div className="text-4xl mb-5">
                            📊
                        </div>

                        <h2 className="text-xl font-bold text-[#1A5F7A]">
                            Relatório Mensal
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Analise o faturamento e os serviços realizados no mês.
                        </p>

                        <div className="mt-6 text-[#C05C32] font-semibold">
                            Acessar relatório →
                        </div>

                    </button>


                    {/* ANUAL */}
                    <button
                        onClick={() => router.push("/painel/relatorios/anual")}
                        className="
                            bg-white
                            rounded-2xl
                            p-7
                            text-left
                            shadow-md
                            border
                            border-gray-100
                            hover:shadow-xl
                            hover:-translate-y-1
                            transition-all
                        "
                    >

                        <div className="text-4xl mb-5">
                            📈
                        </div>

                        <h2 className="text-xl font-bold text-[#1A5F7A]">
                            Relatório Anual
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Acompanhe a evolução do faturamento durante o ano.
                        </p>

                        <div className="mt-6 text-[#C05C32] font-semibold">
                            Acessar relatório →
                        </div>

                    </button>

                </div>

            </div>

        </Template>
    );
}