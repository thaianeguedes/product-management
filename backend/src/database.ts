//Iniciação da conexão com banco SQlite, para sequelize ter controle de criar tabelas, fazer consultas, etc. Essa conexão gerencia tudo

import { Sequelize } from 'sequelize'; //importa classe sequelize do pacote sequelize pra gerenciar a conexão com banco e interação com ele

//Cria instancia do sequelize pra poder usa-lo no meu modelo de product
export const sequelize = new Sequelize({ dialect: 'sqlite', storage: './src/database.sqlite' }); // diz para o Sequelize que o banco é SQLite e o caminho do arquivo do banco sqlite
