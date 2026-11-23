# Ecommerce Shop

E-commerce completo com **React + TypeScript** no front-end e **Java 21 + Spring Boot** no back-end.

## Stack

| Camada | Tecnologia |
|---|---|
| Front-end | Next.js (App Router), React 19, TypeScript, Tailwind CSS 4, Radix UI, Framer Motion (motion), Lucide, TanStack Query, Zustand, React Hook Form + Zod, Axios, Vitest |
| Back-end | Java 21, Spring Boot 4 (Web, Data JPA, Security, Validation, Actuator), Flyway, JWT (jjwt), Springdoc OpenAPI, Lombok |
| Banco / cache | PostgreSQL 16, Redis 7 |
| Infra | Docker / Docker Compose, GitHub Actions |

O back-end é um **monólito modular**: `catalog`, `user`, `cart`, `order`, `payment`, `inventory`, `shipping`, `admin` e `common`
(pacote `com.ecommerce.shop`).

## Estrutura

```
backend/     API Spring Boot (Maven)
frontend/    Site Next.js (App Router) + design system
docker-compose.yml   Postgres e Redis para desenvolvimento
.github/     CI e template de PR
```

## Pré-requisitos

- Java 21
- Node 22+
- Docker (para Postgres/Redis e para os testes do back-end, que usam Testcontainers)

Não é preciso instalar Maven: use o wrapper (`./mvnw` / `mvnw.cmd`).

## Como rodar

1. Configure o ambiente:
   ```bash
   cp .env.example .env     # ajuste senhas e JWT_SECRET
   docker compose up -d     # Postgres (porta 5434) + Redis (porta 6379)
   ```
   O Postgres do Compose usa a porta **5434** no host para não conflitar com um PostgreSQL local (5432).
   Se alguma porta estiver ocupada, altere `POSTGRES_PORT` / `REDIS_PORT` (e `DB_URL` / `REDIS_PORT`) no `.env`.
2. Back-end (porta 8080). Exporte as variáveis do `.env` (`DB_*`, `REDIS_*`, `JWT_SECRET`) e rode:
   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```
   - Health: http://localhost:8080/actuator/health
   - Swagger (perfil `dev`): http://localhost:8080/swagger-ui.html
3. Front-end (porta 3000, com proxy de `/api` para o back-end; use `API_PROXY_TARGET` para mudar o destino):
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   - Design system (tokens e componentes): http://localhost:3000/design-system
   - Para trocar o nome da marca, contatos e imagens: `frontend/src/lib/brand.ts` e `frontend/src/data/mock/`.

## Autenticação

API stateless com JWT (`Authorization: Bearer <token>`). Defina `JWT_SECRET` (32+ bytes) no `.env`: sem ele a API
não sobe.

| Método | Rota | Acesso | Descrição |
|---|---|---|---|
| POST | `/api/auth/register` | público | Cria conta `CUSTOMER` e devolve o token |
| POST | `/api/auth/login` | público | Devolve o token |
| GET | `/api/auth/me` | autenticado | Dados do usuário logado |

Contas `ADMIN` não são criadas pela API; promova um usuário direto no banco
(`UPDATE users SET role = 'ADMIN' WHERE email = '...'`).

## Testes e qualidade

```bash
cd backend  && ./mvnw verify
cd frontend && npm run lint && npm test && npm run build
```

A CI (GitHub Actions) roda esses mesmos comandos em PRs e pushes para `develop` e `main`.

## Fluxo de branches

`main` é produção e `develop` é a integração. Todo trabalho sai da `develop` e volta para ela via Pull Request.
Veja os detalhes em [CONTRIBUTING.md](CONTRIBUTING.md).
