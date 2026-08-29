import { propAuthentication } from "../resources/axios.ts/authService";
import { propAuth } from "../resources/proprietario/proprietarioService";
import { notification } from "../components/notification/index";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
    exp: number;
}

export function userAuth() {

    async function login(login: string, senha: string) {

        const sessionService = propAuth();

        const response = await propAuthentication({
            login,
            senha,
        });

        sessionService.initSession(response);

        notification().notify(
            "Login realizado com sucesso!",
            "success"
        );

        return response;
    }

    function isAuthenticated(): boolean {

        const token = localStorage.getItem("token");

        if (!token) {
            return false;
        }

        try {

            const decoded = jwtDecode<JwtPayload>(token);

            const agora = Date.now() / 1000;

            return decoded.exp > agora;

        } catch (error) {

            console.error("Token inválido:", error);

            return false;
        }
    }

    function logout() {

        localStorage.removeItem("token");
        localStorage.removeItem("_auth");

        notification().notify(
            "Logout realizado com sucesso!",
            "success"
        );
    }


    return {
        login,
        logout,
        isAuthenticated,
    };
}