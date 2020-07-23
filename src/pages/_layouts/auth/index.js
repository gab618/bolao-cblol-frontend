import React from 'react';
import PropTypes from 'prop-types';

import { Grid, CssBaseline, Avatar, Paper } from '@material-ui/core';
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
}));
export default function AuthLayout({ children }) {
  const classes = useStyles();
  return (
    <Wrapper>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
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
