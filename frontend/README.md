# Front-end

Next.js (App Router) + TypeScript + Tailwind CSS 4. Veja o README da raiz para subir o projeto completo.

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm test
npm run build
```

- `src/app/` rotas (`/`, `/produtos`, `/produtos/[slug]`, `/carrinho`, `/checkout`, `/personalizar`, `/design-system`)
- `src/components/ui/` componentes base; as classes ficam em `variants.ts` e usam só os tokens de `src/app/globals.css`
- `src/lib/brand.ts` nome da marca e contatos (placeholders)
- `src/data/mock/` produtos, categorias e depoimentos de exemplo
- `.env.example` variáveis de ambiente (`NEXT_PUBLIC_API_URL`, `API_PROXY_TARGET`)

O Next 16 muda convenções em relação a versões antigas: consulte `node_modules/next/dist/docs/` antes de escrever código novo.
