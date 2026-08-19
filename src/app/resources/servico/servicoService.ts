import { api } from "../axios.ts/api";

export async function buscarServicos() {

    const response = await api.get("/servico")
    
    return response.data;
}
