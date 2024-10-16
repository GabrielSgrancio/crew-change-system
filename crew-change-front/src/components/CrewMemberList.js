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

const CrewMembersListList = () => {
  const [crewMembers, setCrewMembers] = useState([]);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL;
    axios
      .get(`${apiUrl}api/crew`)
      .then((response) => setCrewMembers(response.data))
      .catch((error) => console.error('Erro ao buscar navios:', error));
  }, []);

  const deleteCrewMembers = (id) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    axios
      .delete(`${apiUrl}api/crew/${id}`)
      .then(() => setCrewMembers(crewMembers.filter((crewMembers) => crewMembers._id !== id)))
      .catch((error) => console.error('Erro ao deletar navio:', error));
  };

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Tripulantes
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/crewmembers/add"
        sx={{ marginBottom: 2 }}
      >
        Adicionar Tripulante
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Nacionalidade</TableCell>
            <TableCell>DOB</TableCell>
            <TableCell>POB</TableCell>
            <TableCell>PP</TableCell>
            <TableCell>PP Ex</TableCell>
            <TableCell>SBK</TableCell>
            <TableCell>SBK EX</TableCell>
            <TableCell>Validade Seamans</TableCell>
            <TableCell>voo Numero</TableCell>
            <TableCell>Rank</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {crewMembers.map((crewMembers) => (
            <TableRow key={crewMembers._id}>
              <TableCell>{crewMembers.nome}</TableCell>
              <TableCell>{crewMembers.armador}</TableCell>
              <TableCell>{crewMembers.porto}</TableCell>
              <TableCell>{crewMembers.numeroAtendimento}</TableCell>
              <TableCell>{crewMembers.quantidadeON}</TableCell>
              <TableCell>{crewMembers.quantidadeOFF}</TableCell>
              <TableCell>{crewMembers.IMO}</TableCell>
              <TableCell>
                <IconButton
                  color="primary"
                  component={Link}
                  to={`/crew/edit/${crewMembers._id}`}
                >
                  <Edit />
                </IconButton>
                <IconButton color="secondary" onClick={() => deleteCrewMembers(crewMembers._id)}>
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

export default CrewMembersListList;
