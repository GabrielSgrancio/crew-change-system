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

const ShipList = () => {
  const [ships, setShips] = useState([]);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL;
    axios
      .get(`${apiUrl}/ships`)
      .then((response) => setShips(response.data))
      .catch((error) => console.error(error));
  }, []);

  const deleteShip = (id) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    axios
      .delete(`${apiUrl}/ships/${id}`)
      .then(() => setShips(ships.filter((ship) => ship._id !== id)))
      .catch((error) => console.error(error));
  };

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Navios
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/ships/add"
        sx={{ marginBottom: 2 }}
      >
        Adicionar Navio
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Armador</TableCell>
            <TableCell>Porto</TableCell>
            <TableCell>Quantidade ON</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ships.map((ship) => (
            <TableRow key={ship._id}>
              <TableCell>{ship.armador}</TableCell>
              <TableCell>{ship.porto}</TableCell>
              <TableCell>{ship.quantidadeON}</TableCell>
              <TableCell>
                <IconButton
                  color="primary"
                  component={Link}
                  to={`/ships/edit/${ship._id}`}
                >
                  <Edit />
                </IconButton>
                <IconButton color="secondary" onClick={() => deleteShip(ship._id)}>
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

export default ShipList;
