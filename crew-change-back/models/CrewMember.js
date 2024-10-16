const mongoose = require('mongoose');

const CrewMemberSchema = new mongoose.Schema({
    numeroAtendimento: { type: String, required: true },
    nome: { type: String, required: true },
    nacionalidade: { type: String, default: null },
    dataNascimento: { type: Date, default: null },
    passaporte: { type: String, default: null },
    validadePassaporte: { type: Date, default: null },
    seamansBook: { type: String, default: null },
    validadeSeamans: { type: Date, default: null },
    voo: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight', default: null },
    vooNumero: { type: String, default: null },
    data: { type: Date, default: null },
    trajeto: { type: String, default: null },
    partida: { type: Date, default: null },
    chegada: { type: Date, default: null },
    companhiaAerea: { type: String, default: null },
    rank: { type: String, default: null },
  });

module.exports = mongoose.model('CrewMember', CrewMemberSchema);
