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

export interface AtendimentoResponseDTO {
    id: number;
    dataServico: string;
    proprietario: any;
    formaPagamento: FormaPagamento;
    valor: number;
    observacao: string;
    atendimentos: any[];
}

export async function buscarAtendimentos(): Promise<AtendimentoResponseDTO[]> {
    const response = await api.get("/atendimento");
    return response.data;
}

export async function cadastrarAtendimento(dados: AtendimentoRequest){
    const response = await api.post("/atendimento", dados)
    return response.data;
}