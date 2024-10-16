import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Container,
  Typography,
  IconButton,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Delete, Edit } from '@mui/icons-material';

const FlightList = () => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL;
    axios
      .get(`${apiUrl}api/flights`)
      .then((response) => setFlights(response.data))
      .catch((error) => console.error('Erro ao buscar navios:', error));
  }, []);

  const deleteFlight = (id) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    axios
      .delete(`${apiUrl}api/flights/${id}`)
      .then(() => setFlights(flights.filter((flight) => flight._id !== id)))
      .catch((error) => console.error('Erro ao deletar navio:', error));
  };

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Voos
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/flights/add"
        sx={{ marginBottom: 2 }}
      >
        Adicionar Voo
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Número de atendimento</TableCell>
            <TableCell>Navio</TableCell>
            <TableCell>Número de Atendimento</TableCell>
            <TableCell>Quantidade ON</TableCell>
            <TableCell>Quantidade OFF</TableCell>
            <TableCell>IMO</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {flights.map((flight) => (
            <TableRow key={flight._id}>
              <TableCell>{flight.armador}</TableCell>
              <TableCell>{flight.porto}</TableCell>
              <TableCell>{flight.numeroAtendimento}</TableCell>
              <TableCell>{flight.quantidadeON}</TableCell>
              <TableCell>{flight.quantidadeOFF}</TableCell>
              <TableCell>{flight.IMO}</TableCell>
              <TableCell>
                <IconButton
                  color="primary"
                  component={Link}
                  to={`/flights/edit/${flight._id}`}
                >
                  <Edit />
                </IconButton>
                <IconButton color="secondary" onClick={() => deleteFlight(flight._id)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default FlightList;
