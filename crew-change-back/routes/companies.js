const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');

// Rota para obter todas as empresas
router.get('/', companyController.getAllCompanies);

// Rota para obter uma empresa por ID
router.get('/:id', companyController.getCompanyById);

// Rota para criar uma nova empresa
router.post('/', companyController.createCompany);

// Rota para atualizar uma empresa por ID
router.put('/:id', companyController.updateCompany);

// Rota para deletar uma empresa por ID
router.delete('/:id', companyController.deleteCompany);

module.exports = router;