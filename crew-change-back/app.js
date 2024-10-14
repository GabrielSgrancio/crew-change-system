require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Conexão com o MongoDB
mongoose.connect(process.env.MONGODB_URI, {
})
.then(() => console.log('Conectado ao MongoDB'))
.catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

// Rotas
const authRoutes = require('./routes/auth');
const shipRoutes = require('./routes/ships');
const crewRoutes = require('./routes/crew');
const flightRoutes = require('./routes/flights');

app.use('/api/auth', authRoutes);
app.use('/api/ships', shipRoutes);
app.use('/api/crew', crewRoutes);
app.use('/api/flights', flightRoutes);

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
