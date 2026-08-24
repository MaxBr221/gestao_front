import { propAuthentication } from "../resources/axios.ts/authService";
import { propAuth } from "../resources/proprietario/proprietarioService";
import { notification } from "../components/notification/index";


export function userAuth() {

  async function login(login: string, senha: string) {
    const sessionService = propAuth();
    
    
    const response = await propAuthentication({
    login,
    senha,
  });


    sessionService.initSession(response)
    notification().notify("Login realizado com sucesso!", "success");
    return response;
  }

  function logout() {
    localStorage.removeItem("token");
    notification().notify("Logout realizado com sucesso!", "success")
  }

  return {
    login,
    logout,
  };
}