const mongoose = require('mongoose');
const Company = require('../models/Company');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('Conectado ao MongoDB');
  await Company.deleteMany({});
  await Company.insertMany([
    { nome: 'LMA', logo: 'logo_lma.png' },
    { nome: 'LMK', logo: 'logo_lmk.png' },
    { nome: 'Waypoint', logo: 'logo_waypoint.png' },
  ]);
  console.log('Empresas adicionadas com sucesso!');
  mongoose.disconnect();
})
.catch((err) => {
  console.error('Erro ao conectar ao MongoDB:', err);
});
