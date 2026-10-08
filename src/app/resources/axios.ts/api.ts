import axios from "axios";

export const api = axios.create({
  baseURL:  process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    // 1. Busca a sessão estruturada que salvou
    const sessaoUser = localStorage.getItem("_auth");
    
    if (sessaoUser) {
      try {
        const sessao = JSON.parse(sessaoUser);
        // 2. Extrai o token de dentro do objeto se ele existir
        if (sessao && sessao.token) {
          config.headers.Authorization = `Bearer ${sessao.token}`;
        }
      } catch (e) {
        console.error("Erro ao ler token no interceptor", e);
      }
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});
