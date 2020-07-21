import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  FormGroup,
  FormControlLabel,
  Badge,
  Switch,
  Paper,
  Tooltip,
  IconButton,
} from '@material-ui/core';

import {
  MdFirstPage,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdLastPage,
  MdMic as CasterIcon,
} from 'react-icons/md';
import { Wrapper } from './styles';
import api from '../../services/api';

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? (
          <MdLastPage color="white" />
        ) : (
          <MdFirstPage color="white" />
        )}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? (
          <MdKeyboardArrowRight color="white" />
        ) : (
          <MdKeyboardArrowLeft color="white" />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? (
          <MdKeyboardArrowLeft color="white" />
        ) : (
          <MdKeyboardArrowRight color="white" />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? (
          <MdFirstPage color="white" />
        ) : (
          <MdLastPage color="white" />
        )}
      </IconButton>
    </div>
  );
}
TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const useStyles2 = makeStyles({
  table: {
    minWidth: 360,
    margin: 'auto',
  },
  caster: {
    border: '3px solid transparent',
    borderRadius: '50%',
    backgroundImage:
      'linear-gradient(white, white), linear-gradient(#FF3030, #EE2C2C, #CD2626, #8B1A1A)',
    backgroundOrigin: 'border-box',
    backgroundClip: 'content-box, border-box',
    '& img': {
      border: '2px solid white',
      boxShadow: 'inset 0px 0px 0px 10px red',
      borderRadius: '50%',
      boxSizing: 'border-box',
    },
  },
  casterBox: {
    width: 16,
    height: 16,
    marginBottom: '6px',
    marginRight: '4px',
    background: '#FFF',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  casterImage: {
    border: '5px solid white',
  },
});

export default function Leaderboard() {
  const profile = useSelector((state) => state.user.profile);
  const classes = useStyles2();
  const [users, setUsers] = useState([]);
  const [usersWithCasters, setUsersWithCasters] = useState([]);
  const [usersWithoutCasters, setUsersWithoutCasters] = useState([]);
  const [points, setPoints] = useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [castersChecked, setCastersChecked] = React.useState(true);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function handleSwitcherCasters() {
    setCastersChecked((prev) => !prev);
    if (castersChecked) {
      setUsers(usersWithoutCasters);
    } else {
      setUsers(usersWithCasters);
    }
  }

  useEffect(() => {
    async function getUsers() {
      const response = await api.get('users');
      setUsers(response.data);
      setUsersWithCasters(response.data);
      setUsersWithoutCasters(
        response.data.filter((u) => {
          return !u.is_caster;
        })
      );
    }
    async function getPoints() {
      const response = await api.get(`users/${profile.id}`);
      setPoints(response.data.points);
    }
    getUsers();
    getPoints();
  }, []);

  return (
    <Wrapper>
      <span>Sua pontuação: {points}</span>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="leaderboard table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="left">Nome</TableCell>
              <TableCell align="right">Pontos</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? users.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : users
            ).map((row) => (
              <TableRow key={row.id}>
                <TableCell align="left">
                  {row.is_caster ? (
                    <Badge
                      overlap="circle"
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                      badgeContent={
                        <Tooltip title="Caster" placement="right" arrow>
                          <div className={classes.casterBox}>
                            <CasterIcon
                              style={{ fontSize: 13, color: '#f50057' }}
                            />
                          </div>
                        </Tooltip>
                      }
                    >
                      <Avatar
                        alt={row.name}
                        className={classes.caster}
                        src={row.avatar && row.avatar.url}
                      />
                    </Badge>
                  ) : (
                    <Avatar alt={row.name} src={row.avatar && row.avatar.url} />
                  )}
                </TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="right">{row.points} </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>

          <TableFooter>
            <TableRow>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Switch
                      name="listLasters"
                      color="secondary"
                      label="Caster"
                      checked={castersChecked}
                      onChange={() => handleSwitcherCasters()}
                    />
                  }
                  label="Casters"
                />
              </FormGroup>

              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
                labelRowsPerPage="Usuários por página"
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Wrapper>
  );
}
