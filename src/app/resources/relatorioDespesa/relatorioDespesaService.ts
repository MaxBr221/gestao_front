import { api } from "../axios.ts/api";

export interface RelatorioDespesaResponse {
    valorDespesa: number;
    despesa: string;
}

export async function buscarRelatorioDespesasMensal(): Promise<RelatorioDespesaResponse> {
    const response = await api.get("/despesa/mensal");
    return response.data;
}

export async function buscarRelatorioDespesasSemanal(): Promise<RelatorioDespesaResponse> {
    const response = await api.get("/despesa/semanal");
    return response.data;
}

export async function buscarRelatorioDespesasAnual(): Promise<RelatorioDespesaResponse> {
    const response = await api.get("/despesa/anual");
    return response.data;
}
