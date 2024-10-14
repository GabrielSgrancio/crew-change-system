import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Container,
  Typography,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const ShipForm = () => {
  const [ship, setShip] = useState({
    armador: '',
    porto: '',
    quantidadeON: '',
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const apiUrl = process.env.REACT_APP_API_URL;
      axios
        .get(`${apiUrl}/ships/${id}`)
        .then((response) => setShip(response.data))
        .catch((error) => console.error(error));
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
      ? `${apiUrl}/ships/${id}`
      : `${apiUrl}/ships`;

    axios[method](url, ship)
      .then(() => navigate('/ships'))
      .catch((error) => console.error(error));
  };

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        {id ? 'Editar Navio' : 'Adicionar Navio'}
      </Typography>
      <form onSubmit={handleSubmit}>
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
          label="Porto"
          name="porto"
          value={ship.porto}
          onChange={handleChange}
          fullWidth
          margin="normal"
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
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ marginTop: 2 }}
        >
          {id ? 'Salvar Alterações' : 'Adicionar'}
        </Button>
      </form>
    </Container>
  );
};

export default ShipForm;
