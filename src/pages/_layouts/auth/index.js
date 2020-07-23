import React from 'react';
import PropTypes from 'prop-types';

import { Grid, CssBaseline, Avatar, Paper, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MdLockOutline } from 'react-icons/md';
import { Wrapper, Content } from './styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  rightSide: {
    background: '#0e1012',
  },
  image: {
    backgroundImage:
      'url(https://jpimg.com.br/uploads/2018/09/44555992641_49faa4e5bf_h-1079x720.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: 'white',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  gridItem: {
    margin: '256px auto',
    padding: '0 8px',
    maxWidth: '100%',
    minWidth: 200,
    textAlign: 'left',
    alignItems: 'center',
    flexDirection: 'column',
  },
}));
export default function AuthLayout({ children }) {
  const classes = useStyles();
  return (
    <Wrapper>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image}>
          <Box
            component={Grid}
            className={classes.gridItem}
            item
            xs={3}
            display={{ xs: 'none', sm: 'flex' }}
          >
            <h1>Bolão CBLOL</h1>
            <h3>
              Dispute com narradores, convide seus amigos e veja quem vence
            </h3>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          className={classes.rightSide}
        >
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <MdLockOutline />
            </Avatar>
            <Content>{children}</Content>
          </div>
        </Grid>
      </Grid>
    </Wrapper>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
