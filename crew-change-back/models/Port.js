const mongoose = require('mongoose');

const PortSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    estado: {type: String}
});

module.exports = mongoose.model('Port', PortSchema);