# Products API

## Endpoints

### GET /products
- Retorna a lista de todos os produtos.

### GET /products/:id
- Retorna o produto pelo id.
- Respostas:
  - 200: Produto encontrado.
  - 404: Produto não encontrado.

### POST /products
- Cria um novo produto.
- Corpo (JSON):
  ```json
  {
    "name": "string",
    "description": "string",
    "price": number
  }
