import axios from "axios";
import { setupCache } from 'axios-cache-interceptor';

const instanciaAxios = axios.create({
  baseURL:  process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Adiciona cache automático para requisições GET (5 minutos)
export const api = setupCache(instanciaAxios, {
  ttl: 1000 * 60 * 5, // 5 minutos de cache em memória
  cacheTakeover: false, // Desativa a injeção de headers de cache que geram conflito de CORS no backend
  headerInterpreter: () => 1000 * 60 * 5, // Força o cache ignorando se o servidor mandar "no-cache"
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    // 1. Busca a sessão esgtruturada que sua classe PropriAuth salvou
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
