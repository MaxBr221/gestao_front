'use client'
import { Template } from "../../components/Template"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { AtendimentoRequest, cadastrarAtendimento } from "../..//resources/atendimento/atendimentoService"
import { ServicoResponse, buscarServicos } from "../../resources/servico/servicoService"

export default function AtendimentoPage(){
    const router = useRouter()
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
   async function cadastroAtendimento() {

        if (servicosSelecionados.length === 0) {
            alert("Selecione pelo menos um serviço.");
            return;
        }

        try {

            const dados: AtendimentoRequest = {
                usuarioId: 1,
                formaPagamento: "PIX",
                observacao: "",
                data: new Date().toISOString().slice(0, 19),
                servicosIds: servicosSelecionados.map(
                    servico => servico.id
                )
            };

            console.log("Enviando:", dados);

            const resposta = await cadastrarAtendimento(dados);

            console.log("Atendimento cadastrado:", resposta);

            alert("Atendimento registrado com sucesso!");

        } catch (error) {

            console.error("Erro ao cadastrar atendimento:", error);

            alert("Erro ao registrar atendimento.");

        
        }
    }


    return(
       <Template>

            <div className="w-full max-w-6xl mx-auto px-6 py-10">

                {/* Cabeçalho */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[#1A5F7A]">
                        Novo Atendimento
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Registre os serviços realizados neste atendimento.
                    </p>
                </div>

                {/* Conteúdo */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Serviços */}
                    <div className="bg-white rounded-2xl shadow-md p-6">

                        <h2 className="text-xl font-bold text-[#1A5F7A] mb-2">
                            ✂️ Serviços disponíveis
                        </h2>

                        <p className="text-gray-500 mb-6">
                            Selecione os serviços realizados.
                        </p>

                        {/* Aqui depois entra o map dos serviços */}
                        <div className="space-y-3">

                            {servicos.map((servico) => {

                                const selecionado = servicosSelecionados.some(
                                    (s) => s.id === servico.id
                                );

                                return (
                                    <div
                                        key={servico.id}
                                        className="flex items-center justify-between
                                        border rounded-xl p-4 hover:bg-gray-50 transition"
                                    >

                                        <div className="flex items-center gap-3">

                                            <input
                                                type="checkbox"
                                                checked={selecionado}
                                                onChange={() => selecionarServico(servico)}
                                                className="w-5 h-5 accent-[#50C4B5]"
                                            />

                                            <div>
                                                <p className="font-bold text-gray-700">
                                                    {servico.nome}
                                                </p>

                                                <p className="text-sm text-gray-400">
                                                    {servico.descricao}
                                                </p>
                                            </div>

                                        </div>

                                        <span className="font-bold text-[#1A5F7A]">
                                            R$ {servico.preco}
                                        </span>

                                    </div>
                                );
                            })}

                            </div>

                    </div>

                    {/* Resumo */}
                    <div className="bg-white rounded-2xl shadow-md p-6">

                        <h2 className="text-xl font-bold text-[#1A5F7A] mb-6">
                            📋 Resumo do atendimento
                        </h2>

                        {/* Serviços selecionados */}
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

                        {/* Total */}
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

                        {/* Botão */}
                        <button
                            type="button"
                            className="w-full mt-6 bg-[#50C4B5] text-white
                            font-bold py-3 rounded-xl hover:bg-[#43B3A5]
                            transition"
                            onClick={cadastroAtendimento}
                            
                        >
                            Registrar Atendimento
                        </button>

                    </div>

                </div>

            </div>

        </Template>
    )
}