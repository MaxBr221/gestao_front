'use client'
import { buscarServicos, cadastrarServico, ServicoRequest, ServicoResponse,editarServico, deletarServico } from "../../resources/servico/servicoService"
import { useEffect, useState } from "react"
import { Template } from "../../components/Template"
import { Button } from "../../components/Button";
import { useRouter } from "next/navigation";

export default function ServicoPage(){
    const router = useRouter();
    const [servicos,setServico] = useState<ServicoResponse[]>([]);
    const [modal, setModal] = useState(false);
    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState("");
    const [descricao, setDescricao] = useState("");
    const [servicoEditando, setServicoEditando] =
    useState<ServicoResponse | null>(null);


    async function handleCadastrar() {
        const novoServico: ServicoRequest = {
        nome: nome,
        preco: Number(preco),
        descricao: descricao
    };

    await cadastrarServico(novoServico);

    const dados = await buscarServicos();
    setServico(dados);
    setNome("");
    setPreco("");
    setDescricao("");
    setModal(false);
        
    }
    async function handlerDeletar(id: number){
        await deletarServico(id);
        const dados = await buscarServicos();
        setServico(dados);

    }

    function handlerEditar(servico: ServicoResponse) { 
        setServicoEditando(servico);
        setNome(servico.nome);
        setPreco(String(servico.preco));
        setDescricao(servico.descricao);
        setModal(true);
                          
        
    }
    async function handleSalvar() {

        const dados: ServicoRequest = {
            nome,
            preco: Number(preco),
            descricao
        };

        if (servicoEditando) {

            await editarServico(
                servicoEditando.id,
                dados
            );

        } else {

            await cadastrarServico(dados);
        }

        await carregarServicos();

        setNome("");
        setPreco("");
        setDescricao("");
        setServicoEditando(null);
        setModal(false);
    }
    
    async function carregarServicos() {
        const dados = await buscarServicos();
        setServico(dados);
    }

    useEffect(() => {
        carregarServicos();
    }, []);



    return(
        <Template>
            <div className="w-full max-w-6xl mx-auto px-6 py-10">
                 <div className="flex items-center justify-between mb-10">
                    <div className="">
                        <h1 className="text-3xl font-bold text-[#1A5F7A]">
                            ✂️ Servicos 
                        </h1>
                    </div>
                    <div>
                        <Button
                            style="bg-green-500 text-white font-bold px-5 py-3 rounded-xl  shadow-md transition hover:bg-green-400 "
                            type="button"
                            label="+ Novo Serviço"
                            onClick={() => setModal(true)}>

                        </Button>
                    </div>
                    {modal && (
                    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

                        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">

                            {/* Cabeçalho */}
                            <div className="flex justify-between items-center mb-6">

                                <h2 className="text-xl font-bold text-[#1A5F7A]">
                                    {servicoEditando ? "Editar Serviço" : "Novo Serviço"}
                                </h2>

                                <button
                                    type="button"
                                    onClick={() => setModal(false)}
                                    className="text-gray-400 hover:text-gray-700"
                                >
                                    ✕
                                </button>

                            </div>

                            {/* Formulário */}
                            <form
                                className="space-y-5"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSalvar();
                                }}
                            >

                                {/* Nome */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Nome
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="Ex: Corte masculino"
                                        value={nome}
                                        onChange={(e) => setNome(e.target.value)}
                                        className="w-full border border-gray-300 rounded-xl px-4 py-3
                                        text-gray-800 placeholder:text-gray-400 outline-none
                                        focus:ring-2 focus:ring-[#50C4B5]"
                                    />
                                </div>

                                {/* Preço */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Preço
                                    </label>

                                    <input
                                        type="number"
                                        placeholder="Ex: 30.00"
                                        value={preco}
                                        onChange={(e) => setPreco(e.target.value)}
                                        className="w-full border border-gray-300 rounded-xl px-4 py-3
                                        text-gray-800 placeholder:text-gray-400 outline-none
                                        focus:ring-2 focus:ring-[#50C4B5]"
                                    />
                                </div>

                                {/* Descrição */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Descrição
                                    </label>

                                    <textarea
                                        placeholder="Descrição do serviço"
                                        rows={3}
                                        value={descricao}
                                        onChange={(e) => setDescricao(e.target.value)}
                                        className="w-full border border-gray-300 rounded-xl px-4 py-3
                                        text-gray-800 placeholder:text-gray-400 outline-none
                                        focus:ring-2 focus:ring-[#50C4B5] resize-none"
                                    />
                                </div>

                                {/* Botões */}
                                <div className="flex justify-end gap-3 pt-2">

                                    <button
                                        type="button"
                                        onClick={() => setModal(false)}
                                        className="px-5 py-3 rounded-xl font-medium
                                        text-gray-600 hover:bg-gray-100 transition"
                                    >
                                        Cancelar
                                    </button>

                                    <button
                                        type="submit"
                                        className="px-5 py-3 rounded-xl bg-[#50C4B5]
                                        text-white font-bold hover:bg-[#43B3A5] transition"
                                    >
                                        {servicoEditando
                                            ? "Salvar alterações"
                                            : "Cadastrar"}
                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>
                )}
                </div>
                <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                    <div className="grid grid-cols-3 px-6 py-4 border-b bg-gray-50">
                        <span className="font-bold text-xl text-gray-500">
                            Serviço
                        </span>

                        <span className="font-bold text-xl text-gray-500">
                            Preço
                        </span>

                        <span className="font-bold text-xl text-gray-500 text-right">
                            Ações
                        </span>
                    </div>
                {servicos.map((servico) =>(
                       <div
                            key={servico.id}
                            className="grid grid-cols-3 px-6 py-5 border-b"
                        >
                            <span className="text-gray-600 text-xl font-bold">
                                ✂️ {servico.nome}
                            </span>

                            <span className="text-gray-600 text-xl font-bold">
                                R$ {servico.preco}
                            </span>

                            <div className="flex justify-end gap-3">
                                <button onClick={() => handlerEditar(servico)}>✏️</button>
                                <button onClick={() => handlerDeletar(servico.id)}>🗑️</button>
                            </div>
                        </div>
                 ))}
                 </div>
            </div>
        </Template>
    )

}