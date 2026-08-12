import { api } from "../axios.ts/api";
export async function buscarRelatorioDiario() {

    const response = await api.get("/relatorio/diario");

    return response.data;
    
}
export async function buscarRelatorioMensal() {

    const response = await api.get("/relatorio/mensal");

    return response.data;
    
}
export async function buscarRelatorioAnual() {

    const response = await api.get("/relatorio/anual");

    return response.data;
    
}