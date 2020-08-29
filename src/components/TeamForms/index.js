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

function TeamForms({ teams }) {
  const classes = useStyles();
  async function handleNewTeam(data) {
    try {
      await api.post('team', data);
      toast.success('time criada');
    } catch (err) {
      toast.error('error');
    }
  }

  async function handleUpdateTeam(data) {
    try {
      await api.put(`team/${data.id}`, data);
      toast.success('time editado');
    } catch (err) {
      toast.error('error');
    }
  }
  return (
    <>
      <Form onSubmit={handleNewTeam}>
        <Input name="name" placeholder="name" />
        <Input name="code" placeholder="code" />
        <Input name="image" placeholder="image" />

        <button type="submit">create</button>
      </Form>
      <Form onSubmit={handleUpdateTeam}>
        <Input name="id" placeholder="id" />
        <Input name="name" placeholder="name" />
        <Input name="code" placeholder="code" />
        <Input name="image" placeholder="image" />

        <button type="submit">update</button>
      </Form>

      <ExpansionPanel className={classes.root}>
        <ExpansionPanelSummary
          expandIcon={<MdExpandMore color="#fff" />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Teams</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className={classes.accordionText}>
            {teams.map((t) => (
              <p key={t.id}>
                {t.id}:{t.name}:{t.code}:{t.image}
              </p>
            ))}
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </>
  );
}

export default TeamForms;
