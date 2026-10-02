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
    const [observacao, setObservacao] = useState("");

    const handleSalvar = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!descricao || !valor || !data || !categoria) {
            notification().notify("Preencha todos os campos obrigatórios.", "info");
            return;
        }

        setLoading(true);
        try {
            const payload: DespesaRequest = {
                descricao,
                valor: Number(valor),
                data,
                categoria: categoria as CategoriaDespesa,
                observacao
            };

            await cadastrarDespesa(payload);
            notification().notify("Despesa cadastrada com sucesso!", "success");
            router.push("/painel/despesas");
        } catch (error) {
            notification().notify("Não foi possível cadastrar a despesa.", "error");
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
                    <form onSubmit={handleSalvar} className="space-y-6">
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Descrição *</label>
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
                                disabled={loading}
                                className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-white bg-[#50C4B5] hover:bg-[#43B3A5] shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:transform-none"
                            >
                                {loading ? "Salvando..." : "Salvar despesa"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </PainelLayout>
    );
}
