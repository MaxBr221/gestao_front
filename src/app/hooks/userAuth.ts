import { propAuthentication } from "../resources/axios.ts/authService";
import { propAuth } from "../resources/proprietario/proprietarioService";

export function userAuth() {

  async function login(login: string, senha: string) {
    const sessionService = propAuth(); 
    
    const response = await propAuthentication({
    login,
    senha,
  });

    sessionService.initSession(response);

    return response;
  }

  function logout() {
    localStorage.removeItem("token");
  }

  return {
    login,
    logout,
  };
}