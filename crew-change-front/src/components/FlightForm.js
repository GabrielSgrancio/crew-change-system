import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Container,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const FlightForm = () => {
  const [flight, setFlight] = useState({
    numeroAtendimento: '',
    navio: '',
    companhiaAerea: '',
    destino: '',
    numeroVoo: '',
    partida: '',
    chegada: '',
  });

  const [ships, setShips] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // Fetch ships from the API
    const fetchShips = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/ships`);
        setShips(response.data);
      } catch (error) {
        console.error('Erro ao buscar navios:', error);
      }
    };

    fetchShips();
  }, []);

  useEffect(() => {
    // Fetch flight data if id is present
    if (id) {
      const fetchFlight = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}api/flights/${id}`);
          setFlight(response.data);
        } catch (error) {
          console.error('Erro ao buscar voo:', error);
        }
      };

      fetchFlight();
    }
  }, [id]);

  const handleChange = (e) => {
    setFlight({ ...flight, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const apiUrl = process.env.REACT_APP_API_URL;
    const method = id ? 'put' : 'post';
    const url = id
      ? `${apiUrl}api/flights/${id}`
      : `${apiUrl}api/flights`;
    axios[method](url, flight)
      .then(() => navigate('/flights'))
      .catch((error) => console.error(error));
  };

  return (
    <Container>
      <Typography variant="h4">{id ? 'Editar Voo' : 'Criar Voo'}</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Número de Atendimento"
          name="numeroAtendimento"
          value={flight.numeroAtendimento}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="navio-label">Navio</InputLabel>
          <Select
            labelId="navio-label"
            name="navio"
            value={flight.navio}
            onChange={handleChange}
            required
          >
            {ships.map((ship) => (
              <MenuItem key={ship._id} value={ship._id}>
                {ship.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Companhia Aérea"
          name="companhiaAerea"
          value={flight.companhiaAerea}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Destino"
          name="destino"
          value={flight.destino}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Número do Voo"
          name="numeroVoo"
          value={flight.numeroVoo}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Partida"
          name="partida"
          type="datetime-local"
          value={flight.partida}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Chegada"
          name="chegada"
          type="datetime-local"
          value={flight.chegada}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button type="submit" variant="contained" color="primary">
          {id ? 'Atualizar' : 'Criar'}
        </Button>
      </form>
    </Container>
  );
};

export default FlightForm;