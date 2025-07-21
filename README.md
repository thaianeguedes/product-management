

# 📦 Product Management

Aplicação fullstack para gerenciamento de produtos, desenvolvido em React no frontend e API RESTful em Node.js no backend.

 
## 📋 Tecnologias

**Backend:** Node.js, Express, Sequelize, SQLite, TypeScript, Zod
**Frontend:** React, TypeScript, Material UI



## 🔧 Instalação e execução

1. Clone o repositório:

```bash
git clone https://github.com/thaianeguedes/product-management.git
```

2. Acesse o diretório do projeto:

```bash
cd product-management
```

3. Instale as dependências do backend e frontend:

```bash
cd backend
npm install

cd ../frontend
npm install
```

4. Execute os servidores:

Na raíz do projeto (product-management), execute npm start para iniciar o backend e o frontend juntos.

* Na raíz no projeto:

```bash

npm start
```


5. Acesse a aplicação no navegador:
   [http://localhost:3000](http://localhost:3000)



### Observação

Na primeira execução, o backend cria automaticamente o banco de dados SQLite (`database.sqlite`). Não é necessária nenhuma configuração adicional.


## ⚙️ Funcionalidades

* Cadastro, edição e exclusão de produtos
* Validação backend com Zod para garantir integridade dos dados
* Dashboard responsivo e estilizado com Material UI
* Busca e filtros dinâmicos para facilitar navegação pelos produtos

