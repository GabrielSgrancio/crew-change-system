const Company = require('../models/Company');

// Função para obter todas as empresas
exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar empresas', error: err.message });
  }
};

// Função para obter uma empresa por ID
exports.getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) return res.status(404).json({ message: 'Empresa não encontrada' });
    res.json(company);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar empresa', error: err.message });
  }
};

// Função para criar uma nova empresa
exports.createCompany = async (req, res) => {
  try {
    const newCompany = new Company(req.body);
    const savedCompany = await newCompany.save();
    res.status(201).json(savedCompany);
  } catch (err) {
    res.status(400).json({ message: 'Erro ao criar empresa', error: err.message });
  }
};

// Função para atualizar uma empresa por ID
exports.updateCompany = async (req, res) => {
  try {
    const updatedCompany = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCompany) return res.status(404).json({ message: 'Empresa não encontrada' });
    res.json(updatedCompany);
  } catch (err) {
    res.status(400).json({ message: 'Erro ao atualizar empresa', error: err.message });
  }
};

// Função para deletar uma empresa por ID
exports.deleteCompany = async (req, res) => {
  try {
    const deletedCompany = await Company.findByIdAndDelete(req.params.id);
    if (!deletedCompany) return res.status(404).json({ message: 'Empresa não encontrada' });
    res.json({ message: 'Empresa deletada com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar empresa', error: err.message });
  }
};