
const Ship = require('../models/Ship');

exports.createShip = async (req, res) => {
  try {
    const ship = new Ship(req.body);
    await ship.save();
    res.status(201).json(ship);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar navio.', error: err.message });
  }
};

exports.getShips = async (req, res) => {
  try {
    const ships = await Ship.find().populate('empresa');
    res.json(ships);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar navios.', error: err.message });
  }
};

exports.getShipById = async (req, res) => {
  try {
    const ship = await Ship.findById(req.params.id).populate('empresa');
    if (!ship) return res.status(404).json({ message: 'Navio não encontrado.' });
    res.json(ship);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar navio.', error: err.message });
  }
};

exports.updateShip = async (req, res) => {
  try {
    const ship = await Ship.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!ship) return res.status(404).json({ message: 'Navio não encontrado.' });
    res.json(ship);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar navio.', error: err.message });
  }
};

exports.deleteShip = async (req, res) => {
  try {
    const ship = await Ship.findByIdAndDelete(req.params.id);
    if (!ship) return res.status(404).json({ message: 'Navio não encontrado.' });
    res.json({ message: 'Navio deletado com sucesso.' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar navio.', error: err.message });
  }
};
