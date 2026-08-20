import { api } from "../axios.ts/api";
export interface ServicoRequest{
    nome: string;
    preco: number;
    descricao: string
}
export interface ServicoResponse {
    id: number;
    nome: string;
    preco: number;
    descricao: string;
}
export async function buscarServicos(): Promise<ServicoResponse[]> {

    const response = await api.get("/servico")
    
    return response.data;
}
export async function cadastrarServico(servico: ServicoRequest): Promise<ServicoResponse> {
    const response = await api.post("/servico", servico);

    return response.data;

}
export async function deletarServico(id: number) {

    const response = await api.delete(`/servico/${id}`);

    return response.data;

}
// implementar função de editar servico 
export async function editarServico(id: number, servico: ServicoRequest) {

    const response = await api.put(`/servico/${id}`, servico);

    return response.data;
    
}
