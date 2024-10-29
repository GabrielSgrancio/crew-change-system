import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Typography,
} from '@mui/material';

const Dashboard = () => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL;
    axios
      .get(`${apiUrl}api/flights`)
      .then((response) => {
        const now = new Date();
        const upcomingFlights = response.data.filter(flight => new Date(flight.partida) > now);
        setFlights(upcomingFlights);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Movimentação de Tripulantes
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="crew movement table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Nº</TableCell>
              <TableCell align="center">Data / Hora</TableCell>
              <TableCell align="center">Navio</TableCell>
              <TableCell align="center">Terminal</TableCell>
              <TableCell align="center">Quantidade</TableCell>
              <TableCell align="center">Atendimento</TableCell>
              <TableCell align="center">Tipo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {flights.map((flight, index) => (
              <TableRow key={flight._id}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">
                  {new Date(flight.partida).toLocaleString()} - {new Date(flight.chegada).toLocaleString()}
                </TableCell>
                <TableCell align="center">{flight.ship?.armador || 'Não informado'}</TableCell>
                <TableCell align="center">{flight.terminal || '-'}</TableCell>
                <TableCell align="center">{flight.onSigners.length}</TableCell>
                <TableCell align="center">{flight.atendimento || 'N/A'}</TableCell>
                <TableCell align="center">{flight.tipo || 'OFF'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Dashboard;