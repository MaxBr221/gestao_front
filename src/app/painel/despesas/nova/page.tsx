'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { PainelLayout } from "../../../components/PainelLayout";
import { cadastrarDespesa } from "../../../resources/despesa/despesaService";
import { DespesaRequest, CategoriaDespesa, categoriasLabel } from "../../../resources/despesa/despesa.types";
import { notification } from "../../../components/notification";

export default function NovaDespesaPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    
    const [descricao, setDescricao] = useState("");
    const [valor, setValor] = useState("");
    const [data, setData] = useState("");
    const [categoria, setCategoria] = useState<CategoriaDespesa | "">("");
    const [modalConfirmacao, setModalConfirmacao] = useState(false);
    
    // Obtém data de hoje no fuso local para bloquear datas futuras
    const getHojeStr = () => {
        const d = new Date();
        const pad = (n: number) => n.toString().padStart(2, '0');
        return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    };
    const [observacao, setObservacao] = useState("");

    const handleAbrirConfirmacao = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!valor || !data || !categoria) {
            notification().notify("Preencha o Valor, Data e Categoria.", "info");
            return;
        }

        setModalConfirmacao(true);
    };

    const handleSalvar = async () => {
        setLoading(true);
        try {
            // Se a descrição estiver vazia, usamos o nome da categoria como descrição padrão
            const descricaoFinal = descricao.trim() ? descricao : categoriasLabel[categoria as CategoriaDespesa];

            const payload: DespesaRequest = {
                descricao: descricaoFinal,
                valor: Number(valor),
                data,
                categoria: categoria as CategoriaDespesa,
                observacao
            };

            await cadastrarDespesa(payload);
            notification().notify("Despesa cadastrada com sucesso!", "success");
            setModalConfirmacao(false);
            
            setTimeout(() => {
                router.push("/painel/despesas");
            }, 1000);
        } catch (error) {
            notification().notify("Não foi possível cadastrar a despesa.", "error");
            setModalConfirmacao(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <PainelLayout>
            <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[#1A5F7A]">Nova Despesa</h1>
                    <p className="text-gray-500 mt-2">Registre um novo gasto financeiro da barbearia.</p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
                    <form onSubmit={handleAbrirConfirmacao} className="space-y-6">
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Descrição <span className="text-gray-400 font-normal text-xs">(Opcional)</span></label>
                                <input 
                                    type="text" 
                                    value={descricao}
                                    onChange={(e) => setDescricao(e.target.value)}
                                    placeholder="Ex: Energia elétrica"
                                    className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-[#50C4B5]/50 focus:border-[#50C4B5] transition-all bg-gray-50 focus:bg-white text-gray-800"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Valor (R$) *</label>
                                <input 
                                    type="number" 
                                    step="0.01"
                                    min="0"
                                    value={valor}
                                    onChange={(e) => setValor(e.target.value)}
                                    placeholder="0.00"
                                    className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-[#50C4B5]/50 focus:border-[#50C4B5] transition-all bg-gray-50 focus:bg-white text-gray-800"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Data *</label>
                                <input 
                                    type="date" 
                                    value={data}
                                    max={getHojeStr()}
                                    onChange={(e) => setData(e.target.value)}
                                    className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-[#50C4B5]/50 focus:border-[#50C4B5] transition-all bg-gray-50 focus:bg-white text-gray-800"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Categoria *</label>
                                <select 
                                    value={categoria}
                                    onChange={(e) => setCategoria(e.target.value as CategoriaDespesa)}
                                    className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-[#50C4B5]/50 focus:border-[#50C4B5] transition-all bg-gray-50 focus:bg-white text-gray-800"
                                >
                                    <option value="" disabled>Selecione uma categoria</option>
                                    {Object.entries(categoriasLabel).map(([chave, rotulo]) => (
                                        <option key={chave} value={chave}>{rotulo}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Observação</label>
                            <textarea 
                                value={observacao}
                                onChange={(e) => setObservacao(e.target.value)}
                                rows={3}
                                placeholder="Detalhes opcionais sobre a despesa..."
                                className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-[#50C4B5]/50 focus:border-[#50C4B5] transition-all bg-gray-50 focus:bg-white text-gray-800 resize-none"
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t mt-8">
                            <button 
                                type="button" 
                                onClick={() => router.back()}
                                className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button 
                                type="submit" 
                                className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-white bg-[#50C4B5] hover:bg-[#43B3A5] shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:transform-none"
                            >
                                Salvar despesa
                            </button>
                        </div>
                    </form>
                </div>
                
                {/* Modal de Confirmação */}
                {modalConfirmacao && (
                    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                            <div className="p-6 text-center">
                                <div className="w-16 h-16 bg-[#50C4B5]/20 text-[#50C4B5] rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                                    💰
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Confirmar Despesa?</h3>
                                <p className="text-gray-500 text-sm mb-4">
                                    Deseja realmente registrar esta despesa no valor de <strong className="text-[#1A5F7A]">R$ {Number(valor).toFixed(2)}</strong>?
                                </p>
                            </div>
                            <div className="bg-gray-50 p-4 flex gap-3 justify-center">
                                <button 
                                    type="button"
                                    onClick={() => setModalConfirmacao(false)}
                                    className="px-5 py-2.5 rounded-xl font-medium text-gray-600 bg-white border border-gray-200 hover:bg-gray-100 transition-colors w-full"
                                >
                                    Revisar
                                </button>
                                <button 
                                    type="button"
                                    onClick={handleSalvar}
                                    disabled={loading}
                                    className={`px-5 py-2.5 rounded-xl font-bold text-white transition-colors w-full shadow-sm ${
                                        loading ? "bg-gray-400 cursor-not-allowed opacity-70" : "bg-[#50C4B5] hover:bg-[#43B3A5]"
                                    }`}
                                >
                                    {loading ? "Salvando..." : "Confirmar"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </PainelLayout>
    );
}
