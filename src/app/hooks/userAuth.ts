import { propAuthentication } from "../resources/axios.ts/authService";

export function userAuth() {

  async function login(login: string, senha: string) {
    const response = await propAuthentication({
    login,
    senha,
  });

    localStorage.setItem("token", response.token);

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