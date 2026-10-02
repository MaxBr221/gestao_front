'use client'
import { buscarServicos, cadastrarServico, ServicoRequest, ServicoResponse,editarServico, deletarServico } from "../../resources/servico/servicoService"
import { useEffect, useState } from "react"
import { Button } from "../../components/Button";
import { useRouter } from "next/navigation";
import { notification } from "../../components/notification/index";
import { PainelLayout } from "../../components/PainelLayout";

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
        notification().notify("Servico deletado com sucesso!", "success");

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
            notification().notify("Servico editado com sucesso!", "success");

        } else {

            await cadastrarServico(dados);
            notification().notify("Serviço cadastrado com sucesso!",
            "success")
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
        <PainelLayout>
            <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
                 <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-[#1A5F7A]">
                            ✂️ Serviços 
                        </h1>
                        <p className="text-gray-500 mt-2">Gerencie os serviços oferecidos na sua barbearia.</p>
                    </div>
                    <div>
                        <Button
                            style="bg-[#50C4B5] text-white font-bold px-6 py-3 rounded-xl shadow-md hover:bg-[#43B3A5] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto"
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
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden w-full">
                    
                    {/* Visualização Mobile (Cards) */}
                    <div className="block md:hidden divide-y divide-gray-100">
                        {servicos.length === 0 ? (
                            <div className="p-10 text-center text-gray-500">Nenhum serviço cadastrado.</div>
                        ) : (
                            servicos.map((servico) => (
                                <div key={servico.id} className="p-5 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-start gap-4 mb-3">
                                        <div className="w-10 h-10 rounded-full bg-[#50C4B5]/10 flex items-center justify-center text-xl shadow-sm flex-shrink-0 mt-1">
                                            ✂️
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-gray-800 font-bold text-lg leading-tight">{servico.nome}</p>
                                            {servico.descricao && <p className="text-sm text-gray-400 mt-1 line-clamp-2">{servico.descricao}</p>}
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center mt-4">
                                        <span className="inline-block bg-[#1A5F7A]/5 text-[#1A5F7A] font-bold px-3 py-1.5 rounded-lg text-lg">
                                            R$ {Number(servico.preco).toFixed(2)}
                                        </span>
                                        <div className="flex gap-2">
                                            <button 
                                                onClick={() => handlerEditar(servico)} 
                                                className="p-2.5 bg-blue-50 text-blue-500 rounded-lg hover:bg-blue-100 transition-all" 
                                                title="Editar">
                                                ✏️
                                            </button>
                                            <button 
                                                onClick={() => handlerDeletar(servico.id)} 
                                                className="p-2.5 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-all" 
                                                title="Deletar">
                                                🗑️
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Visualização Desktop (Tabela) */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[600px]">
                            <thead>
                                <tr className="bg-gray-50/80 text-gray-500 border-b">
                                    <th className="p-5 font-semibold text-sm uppercase tracking-wider">Serviço</th>
                                    <th className="p-5 font-semibold text-sm uppercase tracking-wider">Preço</th>
                                    <th className="p-5 font-semibold text-sm uppercase tracking-wider text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {servicos.length === 0 ? (
                                    <tr>
                                        <td colSpan={3} className="p-10 text-center text-gray-500">
                                            Nenhum serviço cadastrado.
                                        </td>
                                    </tr>
                                ) : (
                                    servicos.map((servico) => (
                                        <tr key={servico.id} className="border-b last:border-0 hover:bg-gray-50/50 transition-colors duration-200">
                                            <td className="p-5">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-[#50C4B5]/10 flex items-center justify-center text-xl shadow-sm">
                                                        ✂️
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-800 font-bold text-lg">{servico.nome}</p>
                                                        {servico.descricao && <p className="text-sm text-gray-400 mt-1 line-clamp-1">{servico.descricao}</p>}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-5">
                                                <span className="inline-block bg-[#1A5F7A]/5 text-[#1A5F7A] font-bold px-3 py-1 rounded-lg">
                                                    R$ {Number(servico.preco).toFixed(2)}
                                                </span>
                                            </td>
                                            <td className="p-5 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button 
                                                        onClick={() => handlerEditar(servico)} 
                                                        className="p-2 bg-blue-50 text-blue-500 rounded-lg hover:bg-blue-100 hover:scale-105 transition-all" 
                                                        title="Editar">
                                                        ✏️
                                                    </button>
                                                    <button 
                                                        onClick={() => handlerDeletar(servico.id)} 
                                                        className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 hover:scale-105 transition-all" 
                                                        title="Deletar">
                                                        🗑️
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                 </div>
            </div>
        </PainelLayout>
    )

}