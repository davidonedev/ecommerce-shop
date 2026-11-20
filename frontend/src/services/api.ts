import axios from 'axios'

/**
 * Cliente HTTP único da aplicação.
 * Em desenvolvimento usa o proxy do Vite (/api -> localhost:8080);
 * em produção defina VITE_API_URL (ex.: https://api.minhaloja.com/api).
 */
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '/api',
  headers: { 'Content-Type': 'application/json' },
})
