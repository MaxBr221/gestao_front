import { api } from "../axios.ts/api";

export async function buscarValorFinalMensal(): Promise<number> {
    const response = await api.get("/valorFinal/mensal");
    return response.data;
}

export async function buscarValorFinalSemanal(): Promise<number> {
    const response = await api.get("/valorFinal/semanal");
    return response.data;
}

export async function buscarValorFinalAnual(): Promise<number> {
    const response = await api.get("/valorFinal/anual");
    return response.data;
}
