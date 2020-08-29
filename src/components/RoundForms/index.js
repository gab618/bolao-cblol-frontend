import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { MdExpandMore } from 'react-icons/md';
import api from '../../services/api';

// import { Container } from './styles';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: '#22262c',
    marginTop: 16,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    color: '#fff',
  },
  accordionText: {
    color: '#fff',
  },
}));

function RoundsForms({ rounds }) {
  const classes = useStyles();
  async function handleNewRound(data) {
    try {
      await api.post('round', data);
      toast.success('round criada');
    } catch (err) {
      toast.error('error');
    }
  }
  async function handleUpdateRound(data) {
    try {
      await api.put(`round/${data.id}`, data);
      toast.success('round editado');
    } catch (err) {
      toast.error('error');
    }
  }

  return (
    <>
      <Form onSubmit={handleNewRound}>
        <Input name="name" placeholder="name" />
        <Input name="start_time" placeholder="start_time" />
        <Input name="strategy" placeholder="strategy" />

        <button type="submit">create</button>
      </Form>
      <Form onSubmit={handleUpdateRound}>
        <Input name="id" placeholder="id" />
        <Input name="name" placeholder="name" />
        <Input name="start_time" placeholder="start_time" />
        <Input name="strategy" placeholder="strategy" />
        <Input name="completed" placeholder="completed" />

        <button type="submit">edit</button>
      </Form>

      <ExpansionPanel className={classes.root}>
        <ExpansionPanelSummary
          expandIcon={<MdExpandMore color="#fff" />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Rounds</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className={classes.accordionText}>
            {rounds.map((t) => (
              <p key={t.id}>
                {t.id}:{t.name}:{t.start_time}:{t.strategy}:
                {String(t.completed)}
              </p>
            ))}
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </>
  );
}

export default RoundsForms;
