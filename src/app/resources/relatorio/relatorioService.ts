import { api } from "../axios.ts/api";
export async function buscarRelatorioDiario() {

    const response = await api.get("/relatorio/diario");

    return response;
    
}
export async function buscarRelatorioMensal() {

    const response = await api.get("/relatorio/Mensal");

    return response;
    
}
export async function buscarRelatorioAnual() {

    const response = await api.get("/relatorio/anual");

    return response;
    
}