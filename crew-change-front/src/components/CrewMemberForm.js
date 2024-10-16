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

const CrewMembersForm = () => {
  const [crewMember, setCrewMember] = useState({
    numeroAtendimento: '',
    nome: '',
    nacionalidade: '',
    dataNascimento: '',
    passaporte: '',
    validadePassaporte: '',
    seamansBook: '',
    validadeSeamans: '',
    voo: '',
    vooNumero: '',
    data: '',
    trajeto: '',
    partida: '',
    chegada: '',
    companhiaAerea: '',
    rank: '',
  });

  const [flights, setFlights] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // Fetch flights
    const fetchFlights = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/flights`);
        setFlights(response.data);
      } catch (error) {
        console.error('Erro ao buscar voos:', error);
      }
    };

    fetchFlights();
  }, []);

  useEffect(() => {
    // Fetch crew member data if id is present
    if (id) {
      const fetchCrewMember = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}api/crewmembers/${id}`);
          setCrewMember(response.data);
        } catch (error) {
          console.error('Erro ao buscar membro da tripulação:', error);
        }
      };

      fetchCrewMember();
    }
  }, [id]);

  const handleChange = (e) => {
    setCrewMember({ ...crewMember, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const apiUrl = process.env.REACT_APP_API_URL;
    const method = id ? 'put' : 'post';
    const url = id
      ? `${apiUrl}api/crew/${id}`
      : `${apiUrl}api/crew`;

    if (!crewMember.voo) {
      console.error('O campo voo é obrigatório.');
      return;
    }

    console.log('Submitting data:', crewMember); 

    axios[method](url, crewMember)
      .then(() => navigate('/crew'))
      .catch((error) => {
        console.error('Erro ao enviar dados:', error);
        if (error.response) {
          console.error('Dados do erro:', error.response.data);
        }
      });
  };

  return (
    <Container>
      <Typography variant="h4">{id ? 'Editar Membro da Tripulação' : 'Criar Membro da Tripulação'}</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Número de Atendimento"
          name="numeroAtendimento"
          value={crewMember.numeroAtendimento}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Nome"
          name="nome"
          value={crewMember.nome}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Nacionalidade"
          name="nacionalidade"
          value={crewMember.nacionalidade}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Data de Nascimento"
          name="dataNascimento"
          type="date"
          value={crewMember.dataNascimento}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Passaporte"
          name="passaporte"
          value={crewMember.passaporte}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Validade do Passaporte"
          name="validadePassaporte"
          type="date"
          value={crewMember.validadePassaporte}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Seaman's Book"
          name="seamansBook"
          value={crewMember.seamansBook}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Validade do Seaman's Book"
          name="validadeSeamans"
          type="date"
          value={crewMember.validadeSeamans}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="voo-label">Voo</InputLabel>
          <Select
            labelId="voo-label"
            name="voo"
            value={crewMember.voo}
            onChange={handleChange}
            required
          >
            {flights.map((flight) => (
              <MenuItem key={flight._id} value={flight._id}>
                {flight.numeroVoo}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Número do Voo"
          name="vooNumero"
          value={crewMember.vooNumero}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Data"
          name="data"
          type="date"
          value={crewMember.data}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Trajeto"
          name="trajeto"
          value={crewMember.trajeto}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Partida"
          name="partida"
          type="datetime-local"
          value={crewMember.partida}
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
          value={crewMember.chegada}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Companhia Aérea"
          name="companhiaAerea"
          value={crewMember.companhiaAerea}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Rank"
          name="rank"
          value={crewMember.rank}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          {id ? 'Atualizar' : 'Criar'}
        </Button>
      </form>
    </Container>
  );
};

export default CrewMembersForm;