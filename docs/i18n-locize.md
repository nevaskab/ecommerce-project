# Internationalization / Internacionalização

## Português

O frontend usa `i18next` e `react-i18next` com dois idiomas suportados: `en` e `pt-BR`. Os fallbacks locais estão em `src/locales/en/translation.json` e `src/locales/pt-BR/translation.json`.

O idioma é detectado primeiro no `localStorage` pela chave `cybertech-language` e depois pelo idioma do navegador. O seletor de idioma persiste a escolha e atualiza `document.documentElement.lang`.

Quando `VITE_LOCIZE_PROJECT_ID` está configurado, o `i18next-locize-backend` consulta o namespace `translation` no Locize. A tradução local continua disponível como fallback. Apenas o ID público do projeto deve ir para o bundle; chaves de escrita não devem ser usadas no frontend.

O conteúdo de produtos vindo da API também aceita traduções opcionais no namespace `products.<id>` para título, descrição, entrega, garantia, devolução, disponibilidade, avaliações e tags.

## English

The frontend uses `i18next` and `react-i18next` with two supported languages: `en` and `pt-BR`. Local fallbacks live in `src/locales/en/translation.json` and `src/locales/pt-BR/translation.json`.

Language detection checks `localStorage` first, using `cybertech-language`, and then the browser language. The language selector persists the choice and updates `document.documentElement.lang`.

When `VITE_LOCIZE_PROJECT_ID` is configured, `i18next-locize-backend` reads the `translation` namespace from Locize. Local translations remain available as a fallback. Only the public project ID belongs in the browser bundle; write keys must not be used in the frontend.

API product content may also use optional `products.<id>` translations for title, description, shipping, warranty, returns, availability, reviews, and tags.
