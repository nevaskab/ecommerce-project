# Challenges and learnings / Desafios e aprendizados

## Português

### Principais decisões

- Usar Context API para compartilhar catálogo e sessão sem introduzir uma biblioteca de estado maior.
- Manter dados de produto no provedor externo e persistir apenas IDs e quantidade no banco.
- Trocar armazenamento de JWT em `localStorage` por cookie `httpOnly` para reduzir exposição a XSS.
- Separar o cliente LLM em `backend/src/llmClient.ts`, mantendo a chave fora do navegador.
- Usar fallback local de traduções para que a aplicação continue funcional sem Locize.

### Aprendizados

O projeto reforçou a importância de separar responsabilidades, validar limites de entrada, tratar estados de carregamento/erro e alinhar documentação ao código real. Também evidenciou que autenticação precisa considerar CORS, cookies, ambientes local/remoto e futuras proteções CSRF em conjunto.

### Limitações atuais

Ainda faltam testes automatizados, checkout, pedidos, pagamentos, rate limiting, CSRF dedicado e endpoints de foto de perfil. O assistente depende de `LLM_API_KEY` e responde apenas com o catálogo enviado pelo frontend.

## English

### Main decisions

- Use Context API to share catalog and session state without adding a larger state library.
- Keep product data in the external provider and persist only product IDs and quantities locally.
- Move JWT storage from `localStorage` to an `httpOnly` cookie to reduce XSS exposure.
- Isolate the LLM client in `backend/src/llmClient.ts`, keeping the key out of the browser.
- Use local translation fallbacks so the application remains usable without Locize.

### Learnings

The project reinforced the value of separating responsibilities, validating input limits, handling loading/error states, and keeping documentation aligned with the real code. It also showed that authentication must consider CORS, cookies, local/remote environments, and future CSRF controls together.

### Current limitations

Automated tests, checkout, orders, payments, rate limiting, dedicated CSRF protection, and profile-photo endpoints are still missing. The assistant depends on `LLM_API_KEY` and only answers from the catalog sent by the frontend.
