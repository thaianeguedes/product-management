//Define o modelo/entidade de Product para o Sequelize. Ponte entre código e a tabela do bd. Sem ele não daria para manipular os dados do jeito correto.
// Importa tipos e ferramentas do Sequelize. model e datatypes, que definem os tipos das colunas (string, float,etc).
import { DataTypes, Model } from 'sequelize';
// Importa a conexão com o banco configurada no arquivo database.ts
import { sequelize } from './database.js';
//Classe product que herda o model.
export class Product extends Model {
}
// mapeia a estrtura da tabela products para o sequelize.
Product.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    price: { type: DataTypes.FLOAT },
}, {
    //conexão com banco
    sequelize,
    modelName: 'Product',
    tableName: 'products',
    timestamps: true,
});
