import { api } from "./api";
import { TokenAcesso,  Credencial, Proprietario} from "../proprietario/proprietario.resources";



export async function propAuthentication(credencial: Credencial): Promise<TokenAcesso>{
        try{
            const response = await api.post<TokenAcesso>(
                "/auth/login",
                credencial
            )
            return response.data;

        }catch(error: any){
            throw new Error(error.response?.data?.message ||
                 "Proprietario ou senha incorreta!")
        }
    }
export async function save(proprietario: Proprietario): Promise<void>{
    try{
        const response = await api.post<void>(
            "auth/cadastro",
            proprietario
        )
        
    }catch(error: any){
        error.response?.data?.message || "Erro ao cadastrar proprietário."
    }
}
