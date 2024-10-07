const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  nome: { type: String, required: true },
  logo: { type: String },
});

module.exports = mongoose.model('Company', CompanySchema);
