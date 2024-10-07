// controllers/crewController.js
const CrewMember = require('../models/CrewMember');

exports.createCrewMember = async (req, res) => {
  try {
    const crewMember = new CrewMember(req.body);
    await crewMember.save();
    res.status(201).json(crewMember);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar tripulante.', error: err.message });
  }
};

exports.getCrewMembers = async (req, res) => {
  try {
    const crewMembers = await CrewMember.find().populate('voo');
    res.json(crewMembers);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar tripulantes.', error: err.message });
  }
};

exports.getCrewMemberById = async (req, res) => {
  try {
    const crewMember = await CrewMember.findById(req.params.id).populate('voo');
    if (!crewMember) return res.status(404).json({ message: 'Tripulante não encontrado.' });
    res.json(crewMember);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar tripulante.', error: err.message });
  }
};

exports.updateCrewMember = async (req, res) => {
  try {
    const crewMember = await CrewMember.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!crewMember) return res.status(404).json({ message: 'Tripulante não encontrado.' });
    res.json(crewMember);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar tripulante.', error: err.message });
  }
};

exports.deleteCrewMember = async (req, res) => {
  try {
    const crewMember = await CrewMember.findByIdAndDelete(req.params.id);
    if (!crewMember) return res.status(404).json({ message: 'Tripulante não encontrado.' });
    res.json({ message: 'Tripulante deletado com sucesso.' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar tripulante.', error: err.message });
  }
};
