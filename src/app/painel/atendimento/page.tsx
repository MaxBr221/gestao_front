'use client'
import { useState, useEffect } from "react"
import { AtendimentoRequest, cadastrarAtendimento } from "../../resources/atendimento/atendimentoService"
import { ServicoResponse, buscarServicos } from "../../resources/servico/servicoService"
import { notification } from "../../components/notification/index";
import { PainelLayout } from "../../components/PainelLayout";

export default function AtendimentoPage(){
    const [servicos, setServicos] = useState<ServicoResponse[]>([]);
    const [servicosSelecionados, setServicosSelecionados] =
    useState<ServicoResponse[]>([]);

    useEffect(() => {
        async function carregarServicos() {
            const dados = await buscarServicos();

            setServicos(dados);
        }

        carregarServicos();
    }, []);
    function selecionarServico(servico: ServicoResponse) {

        const jaSelecionado = servicosSelecionados.some(
            (s) => s.id === servico.id
        );

        if (jaSelecionado) {

            setServicosSelecionados(
                servicosSelecionados.filter(
                    (s) => s.id !== servico.id
                )
            );

        } else {

            setServicosSelecionados([
                ...servicosSelecionados,
                servico
            ]);
        }
    }

    const total = servicosSelecionados.reduce(
        (soma, servico) => soma + Number(servico.preco),
        0
    );
    const [modalConfirmacao, setModalConfirmacao] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function cadastroAtendimento() {
        if (isSubmitting) return;
        setIsSubmitting(true);
        
        try {
            const dados: AtendimentoRequest = {
                formaPagamento: "PIX",
                observacao: "",
                servicosIds: servicosSelecionados.map(
                    servico => servico.id
                )
            };

            await cadastrarAtendimento(dados);
             notification().notify(
                "Atendimento cadastrado com sucesso!",
                "success"
            );
            
            // Limpa o carrinho e fecha o modal
            setServicosSelecionados([]);
            setModalConfirmacao(false);

        } catch (error) {
            notification().notify("Não foi possível cadastrar o atendimento.", "error");
            setModalConfirmacao(false);
        } finally {
            setIsSubmitting(false);
        }
    }

    function handleAbrirConfirmacao() {
        if (servicosSelecionados.length === 0) {
            notification().notify("Selecione pelo menos um serviço.", "info");
            return;
        }
        setModalConfirmacao(true);
    }


    return(
       <PainelLayout>

            <div className="w-full max-w-6xl mx-auto px-6 py-10">

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[#1A5F7A]">
                        Novo Atendimento
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Registre os serviços realizados neste atendimento.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div className="bg-white rounded-2xl shadow-md p-6">

                        <h2 className="text-xl font-bold text-[#1A5F7A] mb-2">
                            ✂️ Serviços disponíveis
                        </h2>

                        <p className="text-gray-500 mb-6">
                            Selecione os serviços realizados.
                        </p>
                        <div className="space-y-3">

                            {servicos.map((servico) => {

                                const selecionado = servicosSelecionados.some(
                                    (s) => s.id === servico.id
                                );

                                return (
                                    <div
                                        key={servico.id}
                                        className={`flex items-center justify-between border-2 rounded-xl p-4 transition-all duration-200 cursor-pointer ${
                                            selecionado ? 'border-[#50C4B5] bg-[#50C4B5]/5' : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                                        }`}
                                        onClick={() => selecionarServico(servico)}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-6 h-6 rounded-md flex items-center justify-center border-2 transition-colors ${
                                                selecionado ? 'bg-[#50C4B5] border-[#50C4B5]' : 'border-gray-300 bg-white'
                                            }`}>
                                                {selecionado && <span className="text-white text-sm">✓</span>}
                                            </div>

                                            <div>
                                                <p className={`font-bold ${selecionado ? 'text-[#1A5F7A]' : 'text-gray-700'}`}>
                                                    {servico.nome}
                                                </p>
                                                {servico.descricao && (
                                                    <p className="text-sm text-gray-400 mt-0.5 line-clamp-1">
                                                        {servico.descricao}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <span className={`font-bold whitespace-nowrap ${selecionado ? 'text-[#50C4B5]' : 'text-gray-600'}`}>
                                            R$ {Number(servico.preco).toFixed(2)}
                                        </span>
                                    </div>
                                );
                            })}

                            </div>

                    </div>

                    <div className="bg-white rounded-2xl shadow-md p-6">

                        <h2 className="text-xl font-bold text-[#1A5F7A] mb-6">
                            📋 Resumo do atendimento
                        </h2>

                       <div className="min-h-[200px]">

                            {servicosSelecionados.length === 0 ? (

                                <p className="text-gray-400 text-center mt-16">
                                    Nenhum serviço selecionado.
                                </p>

                            ) : (

                                <div className="space-y-3">

                                    {servicosSelecionados.map((servico) => (

                                        <div
                                            key={servico.id}
                                            className="flex justify-between items-center
                                            border-b pb-3"
                                        >
                                            <span className="text-gray-700 font-medium">
                                                {servico.nome}
                                            </span>

                                            <span className="text-gray-700 font-bold">
                                                R$ {servico.preco}
                                            </span>
                                        </div>

                                    ))}

                                </div>

                            )}

                        </div>
                        <div className="border-t pt-5 mt-5">

                            <div className="flex justify-between items-center">

                                <span className="text-gray-500 font-medium">
                                    Total
                                </span>

                                <span className="text-2xl font-black text-[#1A5F7A]">
                                    R$ {total.toFixed(2)}
                                </span>

                            </div>

                        </div>

                        <button
                            type="button"
                            className="w-full mt-6 bg-[#50C4B5] text-white
                            font-bold py-4 rounded-xl hover:bg-[#43B3A5]
                            transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg text-lg"
                            onClick={handleAbrirConfirmacao}
                        >
                            Confirmar Atendimento
                        </button>

                    </div>

                </div>

                {/* Modal de Confirmação */}
                {modalConfirmacao && (
                    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                            <div className="p-6 text-center">
                                <div className="w-16 h-16 bg-[#50C4B5]/20 text-[#50C4B5] rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                                    💰
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Confirmar Atendimento?</h3>
                                <p className="text-gray-500 text-sm mb-4">
                                    Deseja realmente registrar este atendimento no valor total de <strong className="text-[#1A5F7A]">R$ {total.toFixed(2)}</strong>?
                                </p>
                            </div>
                            <div className="bg-gray-50 p-4 flex gap-3 justify-center">
                                <button 
                                    onClick={() => setModalConfirmacao(false)}
                                    className="px-5 py-2.5 rounded-xl font-medium text-gray-600 bg-white border border-gray-200 hover:bg-gray-100 transition-colors w-full"
                                >
                                    Revisar
                                </button>
                                <button 
                                    onClick={cadastroAtendimento}
                                    disabled={isSubmitting}
                                    className={`px-5 py-2.5 rounded-xl font-bold text-white transition-colors w-full shadow-sm ${
                                        isSubmitting ? "bg-gray-400 cursor-not-allowed opacity-70" : "bg-[#50C4B5] hover:bg-[#43B3A5]"
                                    }`}
                                >
                                    {isSubmitting ? "Confirmando..." : "Confirmar"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </PainelLayout>
    )
}