import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  CardActions,
  Button,
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
        Próximos Voos
      </Typography>
      <Grid container spacing={4}>
        {flights.map((flight) => (
          <Grid item xs={12} sm={6} md={4} key={flight._id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Voo {flight.numeroVoo}
                </Typography>
                <Typography variant="body1">
                  Navio: {flight.ship?.armador || 'Não informado'}
                </Typography>
                <Typography variant="body2">
                  Número de Tripulantes: {flight.onSigners.length}
                </Typography>
                <Typography variant="body2">
                  Partida: {new Date(flight.partida).toLocaleString()}
                </Typography>
                <Typography variant="body2">
                  Chegada: {new Date(flight.chegada).toLocaleString()}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" component={Link} to={`/flights/${flight._id}`}>
                  Detalhes
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard;