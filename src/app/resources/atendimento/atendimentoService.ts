import { api } from "../axios.ts/api";
export interface AtendimentoRequest {
    formaPagamento: FormaPagamento;
    observacao?: string;
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