'use client'

import { Template } from "../components/Template";

export default function PainelPage() {

    return (
        <Template>

            <div className="w-full max-w-7xl mx-auto px-6 py-8">

                {/* CABEÇALHO */}

                <div className="mb-8">

                    <h1 className="text-3xl font-bold text-[#1A5F7A]">
                        Dashboard
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Visão geral da sua barbearia
                    </p>

                </div>


                {/* CARDS PRINCIPAIS */}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

                    {/* FATURAMENTO HOJE */}

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">

                        <p className="text-sm text-gray-500">
                            Faturamento hoje
                        </p>

                        <h2 className="text-3xl font-bold text-[#1A5F7A] mt-2">
                            R$ 350,00
                        </h2>

                        <p className="text-sm text-gray-400 mt-2">
                            12 atendimentos
                        </p>

                    </div>


                    {/* FATURAMENTO MÊS */}

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">

                        <p className="text-sm text-gray-500">
                            Faturamento este mês
                        </p>

                        <h2 className="text-3xl font-bold text-[#1A5F7A] mt-2">
                            R$ 8.420,00
                        </h2>

                        <p className="text-sm text-gray-400 mt-2">
                            Agosto de 2026
                        </p>

                    </div>


                    {/* ATENDIMENTOS */}

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">

                        <p className="text-sm text-gray-500">
                            Atendimentos este mês
                        </p>

                        <h2 className="text-3xl font-bold text-[#1A5F7A] mt-2">
                            186
                        </h2>

                        <p className="text-sm text-gray-400 mt-2">
                            Serviços realizados
                        </p>

                    </div>

                </div>


                {/* RELATÓRIOS */}

                <div className="mb-8">

                    <h2 className="text-xl font-bold text-gray-700 mb-4">
                        Relatórios
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                        {/* DIÁRIO */}

                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">

                            <div className="text-3xl mb-4">
                                📅
                            </div>

                            <h3 className="text-lg font-bold text-[#1A5F7A]">
                                Relatório diário
                            </h3>

                            <p className="text-sm text-gray-500 mt-2">
                                Consulte os atendimentos e o faturamento
                                de um determinado dia.
                            </p>

                            <button
                                className="mt-5 bg-[#1A5F7A] hover:bg-[#144C62] text-white px-5 py-2 rounded-lg transition"
                            >
                                Acessar relatório
                            </button>

                        </div>


                        {/* MENSAL */}

                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">

                            <div className="text-3xl mb-4">
                                📊
                            </div>

                            <h3 className="text-lg font-bold text-[#1A5F7A]">
                                Relatório mensal
                            </h3>

                            <p className="text-sm text-gray-500 mt-2">
                                Analise o faturamento e os serviços
                                realizados durante o mês.
                            </p>

                            <button
                                className="mt-5 bg-[#1A5F7A] hover:bg-[#144C62] text-white px-5 py-2 rounded-lg transition"
                            >
                                Acessar relatório
                            </button>

                        </div>


                        {/* ANUAL */}

                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">

                            <div className="text-3xl mb-4">
                                📈
                            </div>

                            <h3 className="text-lg font-bold text-[#1A5F7A]">
                                Relatório anual
                            </h3>

                            <p className="text-sm text-gray-500 mt-2">
                                Acompanhe a evolução financeira
                                da barbearia durante o ano.
                            </p>

                            <button
                                className="mt-5 bg-[#1A5F7A] hover:bg-[#144C62] text-white px-5 py-2 rounded-lg transition"
                            >
                                Acessar relatório
                            </button>

                        </div>

                    </div>

                </div>


                {/* SERVIÇOS */}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">


                    {/* SERVIÇOS MAIS REALIZADOS */}

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">

                        <h2 className="text-xl font-bold text-gray-700 mb-5">
                            Serviços realizados
                        </h2>

                        <div className="space-y-5">

                            <div>

                                <div className="flex justify-between mb-1">

                                    <span className="text-gray-600">
                                        Cabelo
                                    </span>

                                    <span className="font-semibold">
                                        82
                                    </span>

                                </div>

                                <div className="w-full bg-gray-100 rounded-full h-2">

                                    <div
                                        className="bg-[#57C5B6] h-2 rounded-full"
                                        style={{ width: "80%" }}
                                    />

                                </div>

                            </div>


                            <div>

                                <div className="flex justify-between mb-1">

                                    <span className="text-gray-600">
                                        Barba
                                    </span>

                                    <span className="font-semibold">
                                        61
                                    </span>

                                </div>

                                <div className="w-full bg-gray-100 rounded-full h-2">

                                    <div
                                        className="bg-[#57C5B6] h-2 rounded-full"
                                        style={{ width: "60%" }}
                                    />

                                </div>

                            </div>


                            <div>

                                <div className="flex justify-between mb-1">

                                    <span className="text-gray-600">
                                        Pintura
                                    </span>

                                    <span className="font-semibold">
                                        43
                                    </span>

                                </div>

                                <div className="w-full bg-gray-100 rounded-full h-2">

                                    <div
                                        className="bg-[#57C5B6] h-2 rounded-full"
                                        style={{ width: "45%" }}
                                    />

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* FORMAS DE PAGAMENTO */}

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">

                        <h2 className="text-xl font-bold text-gray-700 mb-5">
                            Formas de pagamento
                        </h2>

                        <div className="space-y-4">

                            <div className="flex justify-between items-center">

                                <span className="text-gray-600">
                                    PIX
                                </span>

                                <span className="font-bold text-[#1A5F7A]">
                                    R$ 4.500,00
                                </span>

                            </div>


                            <div className="flex justify-between items-center">

                                <span className="text-gray-600">
                                    Dinheiro
                                </span>

                                <span className="font-bold text-[#1A5F7A]">
                                    R$ 2.100,00
                                </span>

                            </div>


                            <div className="flex justify-between items-center">

                                <span className="text-gray-600">
                                    Cartão
                                </span>

                                <span className="font-bold text-[#1A5F7A]">
                                    R$ 1.820,00
                                </span>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </Template>
    );
}