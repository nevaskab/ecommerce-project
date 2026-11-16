# Security and authentication / Segurança e autenticação

## Português

- Senhas são armazenadas com hash `bcrypt` e salt rounds 10; o hash nunca é retornado ao cliente.
- O login assina um JWT com `JWT_SECRET` e o envia em cookie `httpOnly` com validade de 7 dias.
- Em desenvolvimento local, o cookie usa `sameSite=lax`; em frontend remoto, usa `secure=true` e `sameSite=none`.
- CORS aceita apenas `FRONTEND_URL`, localhost e 127.0.0.1 configurados.
- `authTokenMiddleware` valida o token antes de acessar perfil, carrinho e wishlist.
- O assistente limita tamanho do texto, histórico e catálogo enviados ao provedor LLM e tem timeout de 30 segundos.

Limitações conhecidas: não há proteção CSRF dedicada, rate limiting ou validação por schema nos bodies. Essas medidas devem ser adicionadas antes de um uso de produção com dados reais.

## English

- Passwords are stored with `bcrypt` using 10 salt rounds; the hash is never returned to clients.
- Login signs a JWT with `JWT_SECRET` and sends it in an `httpOnly` cookie valid for 7 days.
- In local development the cookie uses `sameSite=lax`; with a remote frontend it uses `secure=true` and `sameSite=none`.
- CORS only allows `FRONTEND_URL`, localhost, and configured 127.0.0.1 origins.
- `authTokenMiddleware` verifies the token before profile, cart, and wishlist access.
- The assistant limits message length, history, and catalog size sent to the LLM provider and has a 30-second timeout.

Known limitations: there is no dedicated CSRF protection, rate limiting, or schema-based body validation yet. Add these controls before production use with real data.
