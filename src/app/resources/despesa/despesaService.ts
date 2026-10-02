import { api } from "../axios.ts/api";
import { DespesaRequest, DespesaResponse } from "./despesa.types";

export async function cadastrarDespesa(dados: DespesaRequest): Promise<DespesaResponse> {
    const response = await api.post("/despesas", dados);
    return response.data;
}

export async function buscarDespesas(): Promise<DespesaResponse[]> {
    const response = await api.get("/despesas");
    return response.data;
}



export async function excluirDespesa(id: number): Promise<void> {
    const response = await api.delete(`/despesas/${id}`);
    return response.data;
}
