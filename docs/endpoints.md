# API endpoints / Endpoints da API

## Português

Base local: `http://localhost:10000`. As rotas protegidas exigem o cookie JWT criado no login. O frontend envia credenciais com `withCredentials`.

| Método | Rota | Auth | Uso |
| --- | --- | --- | --- |
| `POST` | `/register` | Não | Cria usuário com senha hash |
| `POST` | `/login` | Não | Valida credenciais e cria cookie JWT por 7 dias |
| `POST` | `/logout` | Não | Remove o cookie de autenticação |
| `GET` | `/profile` | Sim | Retorna o usuário autenticado |
| `GET` | `/cart` | Sim | Lista itens do carrinho |
| `POST` | `/cart` | Sim | Adiciona produto; body: `{ productId, quantity? }` |
| `PUT` | `/cart/:productId` | Sim | Define a quantidade do produto |
| `DELETE` | `/cart/:productId` | Sim | Remove produto do carrinho |
| `GET` | `/wishlist` | Sim | Lista itens salvos |
| `POST` | `/wishlist` | Sim | Salva produto; body: `{ productId }` |
| `DELETE` | `/wishlist/:productId` | Sim | Remove produto salvo |
| `POST` | `/assistant/chat` | Não | Responde perguntas sobre catálogo e navegação |

`/assistant/chat` aceita `message` com 1–600 caracteres, até 8 mensagens de histórico e até 36 produtos. A resposta bem-sucedida tem o formato `{ "answer": "..." }`.

O catálogo de produtos não é servido pelo backend: o frontend consulta diretamente as categorias do DummyJSON.

## English

Local base URL: `http://localhost:10000`. Protected routes require the JWT cookie created during login. The frontend sends credentials with `withCredentials`.

| Method | Route | Auth | Purpose |
| --- | --- | --- | --- |
| `POST` | `/register` | No | Creates a user with a hashed password |
| `POST` | `/login` | No | Validates credentials and creates a 7-day JWT cookie |
| `POST` | `/logout` | No | Clears the authentication cookie |
| `GET` | `/profile` | Yes | Returns the authenticated user |
| `GET` | `/cart` | Yes | Lists cart items |
| `POST` | `/cart` | Yes | Adds a product; body: `{ productId, quantity? }` |
| `PUT` | `/cart/:productId` | Yes | Sets the product quantity |
| `DELETE` | `/cart/:productId` | Yes | Removes a cart product |
| `GET` | `/wishlist` | Yes | Lists saved products |
| `POST` | `/wishlist` | Yes | Saves a product; body: `{ productId }` |
| `DELETE` | `/wishlist/:productId` | Yes | Removes a saved product |
| `POST` | `/assistant/chat` | No | Answers catalog and navigation questions |

`/assistant/chat` accepts a 1–600 character `message`, up to 8 history messages, and up to 36 products. A successful response is `{ "answer": "..." }`.

The product catalog is not served by the backend: the frontend queries DummyJSON categories directly.
