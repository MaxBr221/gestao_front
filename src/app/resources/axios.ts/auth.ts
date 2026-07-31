import { api } from "./api";

interface LoginRequest {
  login: string;
  senha: string;
}

export async function login(data: LoginRequest) {
  const response = await api.post("/auth/login", data);

  localStorage.setItem("token", response.data.token);

  return response.data;
}

export function logout() {
  localStorage.removeItem("token");
}