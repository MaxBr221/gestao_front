import { api } from "../axios.ts/api";
export interface AtendimentoRequest {
    usuarioId: number;
    formaPagamento: FormaPagamento;
    observacao?: string;
    data: string;
    servicosIds: number[];
}
export type FormaPagamento = 
    | "ESPECIE"
    | "PIX"
    | "CARTAO";
export async function cadastrarAtendimento(dados: AtendimentoRequest){
    
    const response = await api.post("/atendimento", dados)

    return response.data;
}