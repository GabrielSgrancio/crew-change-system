import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Container,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const ShipForm = () => {
  const [ship, setShip] = useState({
    nome: '',
    empresa: '',
    armador: '',
    porto: '',
    numeroAtendimento: '',
    quantidadeON: '',
    quantidadeOFF: '',
  });

  const [ports, setPorts] = useState([]);
  const [empresas, setEmpresas  ] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL;

    // Fetch ports
    axios
      .get(`${apiUrl}api/ports`)
      .then((response) => setPorts(response.data))
      .catch((error) => console.error('Erro ao buscar portos:', error));

    // Fetch armadores
    axios
      .get(`${apiUrl}api/companies`)
      .then((response) => setEmpresas(response.data))
      .catch((error) => console.error('Erro ao buscar empresas:', error));

    // Fetch ship data if id is present
    if (id) {
      axios
        .get(`${apiUrl}api/ships/${id}`)
        .then((response) => setShip(response.data))
        .catch((error) => console.error('Erro ao buscar navio:', error));
    }
  }, [id]);

  const handleChange = (e) => {
    setShip({ ...ship, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const apiUrl = process.env.REACT_APP_API_URL;
    const method = id ? 'put' : 'post';
    const url = id
      ? `${apiUrl}api/ships/${id}`
      : `${apiUrl}api/ships`;

    axios[method](url, ship)
      .then(() => navigate('/ships'))
      .catch((error) => console.error('Erro ao enviar dados:', error));
  };

  const handleCancel = () => {
    navigate(-1); 
  };

  return (
    <Container sx={{ marginTop: 11 }}>
      <Typography variant="h4" gutterBottom align="center">
        {id ? 'Editar Navio' : 'Adicionar Navio'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nome"
          name="nome"
          value={ship.nome}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
      <FormControl fullWidth margin="normal">
        <InputLabel id="empresa-label">Empresa</InputLabel>
        <Select
          labelId="empresa-label"
          name="empresa"
          value={ship.empresas}
          onChange={handleChange}
          required
        >
            {empresas.map((empresas) => (
              <MenuItem key={empresas._id} value={empresas._id}>
                {empresas.nome}
              </MenuItem>
    ))}
  </Select>
  </FormControl>
  <FormControl fullWidth margin="normal">
  <InputLabel id="porto-label">Porto</InputLabel>
    <Select
      labelId="porto-label"
      name="porto"
      value={ship.porto}
      onChange={handleChange}
      required
    >
      {ports.map((porto) => (
        <MenuItem key={porto._id} value={porto._id}>
          {porto.nome}
        </MenuItem>
      ))}
      </Select>
        </FormControl>
        <TextField
          label="Número de Atendimento"
          name="numeroAtendimento"
          value={ship.numeroAtendimento}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Armador"
          name="armador"
          value={ship.armador}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Quantidade ON"
          name="quantidadeON"
          value={ship.quantidadeON}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="number"
        />
        <TextField
          label="Quantidade OFF"
          name="quantidadeOFF"
          value={ship.quantidadeOFF}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="number"
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: 2, marginTop: 2 }}>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ marginTop: 2 }}
        >
          {id ? 'Salvar Alterações' : 'Adicionar'}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleCancel}
          sx={{ backgroundColor: 'red', color: 'white', marginTop: 2 }}
        >
        Cancelar
        </Button>
        </Box>
      </form>
    </Container>
  );
};

export default ShipForm;