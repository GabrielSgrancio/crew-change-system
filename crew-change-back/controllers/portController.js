const Port = require('../models/Port');

exports.createPort = async (req, res) => {
    try {
     const port = new Port(req.body);
     await port.save();
     res.status(201).json(port);
    } catch (err) {
        res.status(500).json({message: 'Erro ao criar porto', error: err.message});
    }
};

exports.getPorts = async (req, res) => {
    try{
     const ports = await Port.find();
     res.json(ports)
    } catch (err) {
     res.status(500).json({message: 'Erro ao buscar portos', error: err.message});
    }
};

exports.getPortById = async (req, res) => {
    try {
        const port = await Port.findById(req.params.id);
        if (!port) return res.status(404).json({message: 'Porto não encontrado'});
         res.json(port);
    } catch (err){
        res.status(500).json({message: 'Erro ao buscar porto. ', error: err.message});
    }

}

exports.updatePort = async (req, res) => {
    try {
        const port = await Port.findByIdAndUpdate(req.params.id, req.body, {new:true});
        if (!port) return res.status(404).json({message: 'Porto não encontrado'});
        res.json(port);
    } catch (err) {
        res.status(500).json({message: 'Erro ao atualizar porto', error: err.message});
    }
}

exports.deletePort = async (req, res) => {
    try {
        const port = await Port.findByIdAndDelete(req.params.id);
        if (!port) return res.status(404).json({message: 'Porto não encontrado'});
        res.json({message: 'Porto deletado com sucesso'});
    }catch (err) {
        res.status(500).json({message: 'Erro ao detelar porto', error: err.message});
    }
}