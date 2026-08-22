import { api } from "../axios.ts/api";
export interface AtendimentoRequest{
        usuarioId: number
        formaPagamento: string
        observacao?: string
        data: string
}
export async function cadastrarAtendimento(dados: AtendimentoRequest){
    
    const response = await api.post("/atendimento")

    return response.data;
}