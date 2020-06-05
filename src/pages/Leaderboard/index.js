import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Wrapper } from './styles';
import api from '../../services/api';

const useStyles = makeStyles({
  table: {
    minWidth: 400,
    background: '#fff',
  },
  drawerPaper: { background: '#2c3036' },
});

export default function Leaderboard() {
  const profile = useSelector((state) => state.user.profile);
  const [users, setUsers] = useState([]);
  const [points, setPoints] = useState('');

  useEffect(() => {
    async function getUsers() {
      const response = await api.get('users');
      setUsers(response.data);
    }
    async function getPoints() {
      const response = await api.get(`users/${profile.id}`);
      setPoints(response.data.points);
    }
    getUsers();
    getPoints();
  }, []);

  const classes = useStyles();

  return (
    <Wrapper>
      <span>Sua pontuação: {points}</span>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="left">Nome</TableCell>
              <TableCell align="right">Pontos</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row) => (
              <TableRow key={row.id}>
                <TableCell align="center">
                  <Avatar alt={row.name} src={row.avatar.url} />
                </TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="right">{row.points}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Wrapper>
  );
}
