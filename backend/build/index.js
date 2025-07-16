//Arquivo pra montar o servidor Express, conectar com banco, definir rotas da API e fazer a validação de dados
//imports
import express from 'express';
import { sequelize } from './database.js';
import { Product } from './product.js';
import { productSchema } from './productSchema.js';
//cria instancia do servidor express
const app = express();
app.use(express.json());
//Rotas crud. cada rota é uma ação que o cliente pode fazer na api.
app.get('/products', async (req, res) => {
    const products = await Product.findAll();
    res.json(products);
}); //transforma os produtos do banco e retorna json da resposta.
app.get('/products/:id', async (req, res) => {
    const product = await Product.findByPk(req.params.id);
    if (!product)
        return res.status(404).json({ error: 'Not found' });
    res.json(product);
}); //Busca um produto específico pelo ID. Se não encontrar retorna 404.
app.post('/products', async (req, res) => {
    const result = productSchema.safeParse(req.body);
    if (!result.success)
        return res.status(400).json({ error: result.error.format() });
    const product = await Product.create(result.data);
    res.status(201).json(product);
}); //recebe dados pra criar novo produto, valida o corpo da requisição (zod). se der erro, responde 400, se der válido cria o produto e retorna 201
app.put('/products/:id', async (req, res) => {
    const product = await Product.findByPk(req.params.id);
    if (!product)
        return res.status(404).json({ error: 'Not found' });
    const result = productSchema.safeParse(req.body);
    if (!result.success)
        return res.status(400).json({ error: result.error.format() });
    await product.update(result.data);
    res.json(product);
}); // atualiza produto existente, garantindo que o produto existe, valida o corpo da requisição, atualizaa e retorna o produto atualizado.
app.delete('/products/:id', async (req, res) => {
    const product = await Product.findByPk(req.params.id);
    if (!product)
        return res.status(404).json({ error: 'Not found' });
    await product.destroy();
    res.status(204).send();
}); //apaga o produto que existe, responde 204 quando deletado com sucesso
app.listen(3000, async () => {
    await sequelize.sync();
    console.log('API rodando em http://localhost:3000');
}); //porta do servidor e chama o sequelize para criar as tabelas conforme os modelos definidos 
