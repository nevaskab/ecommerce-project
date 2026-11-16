# Architecture / Arquitetura

## Português

### Visão geral

O frontend é uma SPA React inicializada por Vite. O React Router organiza as páginas e o componente `Layout` compartilha header, footer e o assistente de IA. Contextos fornecem autenticação (`AuthContext`) e catálogo (`APIContext`). Axios centraliza chamadas ao backend com `withCredentials: true`.

O backend é um servidor Express em TypeScript. Prisma acessa PostgreSQL, enquanto middleware de autenticação lê e valida o JWT armazenado em cookie. O endpoint `/assistant/chat` delega a resposta ao cliente LLM em `backend/src/llmClient.ts`.

### Fluxo principal

1. `ProductProvider` busca smartphones, tablets e acessórios móveis no DummyJSON.
2. Páginas e componentes exibem produtos e enviam ações de usuário para a API própria.
3. O backend associa carrinho e wishlist ao usuário autenticado.
4. O assistente recebe uma amostra do catálogo e um histórico curto para responder sobre produtos ou navegação.

### Rotas frontend

Rotas de visitante: `/`, `/product/:id`, `/login` e `/register`.

Rotas protegidas: `/profile`, `/cart` e `/wishlist`.

## English

### Overview

The frontend is a React SPA bootstrapped with Vite. React Router organizes pages, while `Layout` shares the header, footer, and AI assistant. Contexts provide authentication (`AuthContext`) and catalog data (`APIContext`). Axios centralizes backend requests with `withCredentials: true`.

The backend is an Express TypeScript server. Prisma accesses PostgreSQL, and authentication middleware reads and verifies the JWT stored in a cookie. `/assistant/chat` delegates responses to the LLM client in `backend/src/llmClient.ts`.

### Main flow

1. `ProductProvider` fetches smartphones, tablets, and mobile accessories from DummyJSON.
2. Pages and components render products and send user actions to the custom API.
3. The backend associates cart and wishlist data with the authenticated user.
4. The assistant receives a catalog sample and a short history to answer product or navigation questions.

### Frontend routes

Guest routes: `/`, `/product/:id`, `/login`, and `/register`.

Protected routes: `/profile`, `/cart`, and `/wishlist`.
