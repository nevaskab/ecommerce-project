# Localização com Locize

O app consulta o namespace `translation` no Locize e usa os arquivos em `src/locales` como fallback local. O idioma de referência é `en`; o segundo idioma inicial é `pt-BR`.

## Configuração do projeto Locize

No Locize, mantenha os idiomas `en` e `pt-BR` e o namespace `translation`. Use a estrutura de chaves dos arquivos locais para preencher as traduções. Depois de publicar a versão, as atualizações do Locize aparecem no site sem uma nova publicação do frontend.

O conteúdo de produtos que vem da API aceita chaves opcionais neste formato:

- `products.<id>.title`
- `products.<id>.description`
- `products.<id>.shipping`, `warranty`, `returns` e `availability`
- `products.<id>.reviews.<índice>
- `products.<id>.tags.<slug>`

Se uma dessas chaves não existir, o site mostra o valor recebido da API.

## Variáveis de ambiente

O desenvolvimento local usa `VITE_LOCIZE_PROJECT_ID` e `VITE_LOCIZE_VERSION`, já configurados em `.env.development.local`. O Project ID basta para ler traduções públicas; não coloque uma chave de escrita no bundle do navegador. Configure as mesmas variáveis no ambiente de publicação e reinicie o servidor Vite depois de alterar o arquivo local.
