const mongoose = require('mongoose');

const ShipSchema = new mongoose.Schema({
  nome: {type:String},
  armador: { type: String },
  empresa: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  porto: { type: String },
  numeroAtendimento: { type: String, required: true },
  quantidadeON: { type: Number },
  quantidadeOFF: { type: Number },
  IMO: { type: String },
});

module.exports = mongoose.model('Ship', ShipSchema);
