'use client'
import { buscarServicos } from "../../resources/servico/servicoService"
import { useEffect, useState } from "react"
import { Template } from "../../components/Template"
import { Button } from "../../components/Button";
import { useRouter } from "next/navigation";

export default function ServicoPage(){
    const [servicos,setServico] = useState<any[]>([]);
    const router = useRouter();
    
    useEffect(() =>{
        async function renderizarServicos() {
            const todoServicos = await buscarServicos();
            setServico(todoServicos);
            
        }
        renderizarServicos();
        
    },[])



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
                            label="+ Novo Serviço">

                        </Button>
                    </div>
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
                        <div className="grid grid-cols-3 px-6 py-5 border-b">
                            <span className="text-gray-600 text-xl font-bold">
                                ✂️ {servico.id}
                            </span>

                            <span className="text-gray-600 text-xl font-bold">
                                R$ {servico.preco}
                            </span>

                            <div className="flex justify-end gap-3">
                                <button>✏️</button>
                                <button>🗑️</button>
                            </div>
                        </div>
                 ))}
                 </div>
            </div>
        </Template>
    )

}