require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const Port = require('../models/Port');

const ports = [
  { nome: 'Porto de Santos', estado: 'SP' },
  { nome: 'Porto de Paranaguá', estado: 'PR' },
  { nome: 'Porto de Itaguaí', estado: 'RJ' },
  { nome: 'Porto do Itaqui', estado: 'MA' },
  { nome: 'Porto de Rio Grande', estado: 'RS' },
  { nome: 'Porto de Suape', estado: 'PE' },
  { nome: 'Porto de São Francisco do Sul', estado: 'SC' },
  { nome: 'Porto de Vila do Conde', estado: 'PA' },
  { nome: 'Porto de Santarém', estado: 'PA' },
  { nome: 'Porto do Rio de Janeiro', estado: 'RJ' },
];

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  console.error('Erro: MONGODB_URI não está definido no arquivo .env');
  process.exit(1);
}

mongoose.connect(mongoUri).then(async () => {
  try {
    await Port.insertMany(ports);
    console.log('Portos inseridos com sucesso!');
  } catch (err) {
    console.error('Erro ao inserir portos:', err);
  } finally {
    mongoose.disconnect();
  }
}).catch((err) => {
  console.error('Erro ao conectar ao MongoDB:', err);
});