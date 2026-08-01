import { Credencial, TokenAcesso, Proprietario, ProprietarioSessaoToken } from "./proprietario.resources";
import axios, { Axios } from "axios";
import { api } from "../axios.ts/api";
import { jwtDecode } from "jwt-decode";



class PropriAuth{
    baseString: string = "http://localhost:8080/auth";
    static AUTH_PARAM: string = "_auth";


    
    initSession(token: TokenAcesso){
        console.log("TOKEN RECEBIDO:", token);
        if(token.token){
            const decodeToken: any = jwtDecode (token.token);
            console.log("TOKEN DECODADO:", decodeToken);

            const userSessionToken: ProprietarioSessaoToken = {
                nome: decodeToken.name,
                login: decodeToken.sub,
                token: token.token,
                expiracao: decodeToken.exp
            }
            console.log("SESSÃO SALVA:", userSessionToken);
            this.setUserSession(userSessionToken);
        }
    } 
    setUserSession(userSessionToken: ProprietarioSessaoToken){
        try{
            localStorage.setItem(PropriAuth.AUTH_PARAM, JSON.stringify(userSessionToken));
            localStorage.set("token", userSessionToken.token!, { expires: 1, path: '/' });
        }catch(error){}

    }
     getUserSession(): ProprietarioSessaoToken | null {
        if (typeof window === "undefined") {
            return null;
        }

        try {
            const sessaoUser = localStorage.getItem(PropriAuth.AUTH_PARAM);
            if (!sessaoUser) {
                console.log("token do getSessioNull: ", sessaoUser);
                return null;  
            }
            const token: ProprietarioSessaoToken = JSON.parse(sessaoUser);
            console.log("nome no token: ", token.nome);
            return token;
        } catch (error) {
            console.error("Erro ao buscar token: ", error);
            return null;
        }
    }
    getUserLogado(){
        const sessao = this.getUserSession();
        if(!sessao){
            return null;
        }
        return sessao;
    }
    logout() {
        try {
            localStorage.removeItem(PropriAuth.AUTH_PARAM);
            localStorage.remove("token", { path: '/' });
            console.log("Sessão encerrada com sucesso.");
        } catch (error) {
            console.error("Erro ao efetuar logout:", error);
        }
    }


}
export const propAuth = () => new PropriAuth;
