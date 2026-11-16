# Database schema / Schema do banco

## Português

O banco usa PostgreSQL com Prisma. O schema atual contém três modelos:

| Modelo | Campos principais | Relações |
| --- | --- | --- |
| `User` | `id`, `email`, `name`, `passwordHash`, timestamps | possui `CartItem[]` e `WishlistItem[]` |
| `CartItem` | `id`, `userId`, `apiProduct`, `quantity`, `createdAt` | pertence a `User` |
| `WishlistItem` | `id`, `userId`, `apiProduct`, `createdAt` | pertence a `User` |

`email` é único. A combinação `userId` + `apiProduct` é única tanto no carrinho quanto na wishlist. A remoção de um usuário usa cascade para remover seus itens relacionados. `apiProduct` guarda o ID do produto do catálogo externo, não uma cópia completa do produto.

Migrações ficam em `backend/prisma/migrations`. Para aplicar em um ambiente já criado, use `npx prisma migrate deploy` dentro de `backend`.

## English

The database uses PostgreSQL with Prisma. The current schema contains three models:

| Model | Main fields | Relations |
| --- | --- | --- |
| `User` | `id`, `email`, `name`, `passwordHash`, timestamps | owns `CartItem[]` and `WishlistItem[]` |
| `CartItem` | `id`, `userId`, `apiProduct`, `quantity`, `createdAt` | belongs to `User` |
| `WishlistItem` | `id`, `userId`, `apiProduct`, `createdAt` | belongs to `User` |

`email` is unique. The `userId` + `apiProduct` combination is unique for both cart and wishlist records. Deleting a user cascades to related items. `apiProduct` stores the external catalog product ID rather than a full product copy.

Migrations live in `backend/prisma/migrations`. Apply them to an existing environment with `npx prisma migrate deploy` from `backend`.
