const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//registro
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    let user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'Usuário registrado com sucesso.' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao registrar usuário.', error: err.message });
  }
};

//login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    let user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Credenciais inválidas.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Credenciais inválidas.' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '8h' });
    res.json({ token, user: { id: user._id, username: user.username } });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao fazer login.', error: err.message });
  }
};
