import axios from 'axios'

/**
 * Cliente HTTP único da aplicação.
 * Por padrão usa /api, que o Next encaminha para o back-end (ver rewrites em next.config.ts);
 * defina NEXT_PUBLIC_API_URL para apontar direto para outra URL (ex.: https://api.minhaloja.com/api).
 */
export const api = axios.create({
  // `||` (e não `??`): variável definida porém vazia, como no .env.example, também cai em /api.
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
})
