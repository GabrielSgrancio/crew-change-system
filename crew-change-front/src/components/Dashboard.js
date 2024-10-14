import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
} from '@mui/material';

const Dashboard = () => {
    const [flights, setFlights] = useState([]);
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        axios
            .get(apiUrl)
            .then(response => setFlights(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <Container>
          <Typography variant="h4" gutterBottom>
            Próximos Voos
          </Typography>
          <Grid container spacing={3}>
            {flights.map((flight) => (
              <Grid item xs={12} sm={6} md={4} key={flight._id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">
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
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      );
    };
