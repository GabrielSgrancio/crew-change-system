const mongoose = require('mongoose');

const FlightSchema = new mongoose.Schema({
  numeroAtendimento: { type: String, required: true },
  navio:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ship' }],
  companhiaAerea: { type: String },
  numeroVoo: { type: String },
  onSigners: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CrewMember' }],
  offSigners: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CrewMember' }],
  partida: { type: Date },
  chegada: { type: Date },
  destino: { type: String },
  trajeto: { type: String },
});

module.exports = mongoose.model('Flight', FlightSchema);
