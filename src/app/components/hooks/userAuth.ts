import { login as loginService } from "@/app/resources/axios.ts/auth"

export function useAuth() {

  async function login(login: string, senha: string) {
    const response = await loginService({
      login,
      senha
    });

    localStorage.setItem("token", response.token);

    return response;
  }

  function logout() {
    localStorage.removeItem("token");
  }

  return {
    login,
    logout
  };
}