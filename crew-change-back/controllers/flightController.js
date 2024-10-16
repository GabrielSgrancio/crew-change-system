const Ship = require('../models/Ship');
const Flight = require('../models/Flight');

exports.createFlight = async (req, res) => {
  try {
    const flight = new Flight(req.body);
    await flight.save();
    res.status(201).json(flight);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar voo.', error: err.message });
  }
};

exports.getFlights = async (req, res) => {
  try {
    const flights = await Flight.find()
      .populate('onSigners')
      .populate('offSigners');
    res.json(flights);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar voos.', error: err.message });
  }
};

exports.getFlightById = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id)
      .populate('onSigners')
      .populate('offSigners');
    if (!flight) return res.status(404).json({ message: 'Voo não encontrado.' });
    res.json(flight);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar voo.', error: err.message });
  }
};

exports.updateFlight = async (req, res) => {
  try {
    const flight = await Flight.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!flight) return res.status(404).json({ message: 'Voo não encontrado.' });
    res.json(flight);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar voo.', error: err.message });
  }
};

exports.deleteFlight = async (req, res) => {
  try {
    const flight = await Flight.findByIdAndDelete(req.params.id);
    if (!flight) return res.status(404).json({ message: 'Voo não encontrado.' });
    res.json({ message: 'Voo deletado com sucesso.' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar voo.', error: err.message });
  }
};
