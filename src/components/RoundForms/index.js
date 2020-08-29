import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Select, Check } from '@rocketseat/unform';
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
  const [selectRoundsOptions, setSelectRoundsOptions] = useState([]);
  const [updateRoundName, setUpdateRoundName] = useState('');
  const [updateRoundStartTime, setUpdateRoundStartTime] = useState('');
  const [updateRoundStrategy, setUpdateRoundStrategy] = useState('');
  const [updateRoundCompleted, setUpdateRoundCompleted] = useState('');

  useEffect(() => {
    const options = rounds.map((r) => {
      return { id: r.id, title: r.name };
    });
    setSelectRoundsOptions(options);
  }, [rounds]);

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

  function handleSelectRoundToUpdate(e) {
    const roundId = Number(e.target.value);
    const selectedRound = rounds.filter((round) => {
      return round.id === roundId;
    });

    if (selectedRound[0]) {
      setUpdateRoundName(selectedRound[0].name);
      setUpdateRoundStartTime(selectedRound[0].start_time);
      setUpdateRoundStrategy(selectedRound[0].strategy);
      setUpdateRoundCompleted(!!selectedRound[0].completed);
    }
  }

  return (
    <>
      <Form onSubmit={handleNewRound}>
        <Input name="name" placeholder="name" />
        <Input
          name="start_time"
          placeholder="start_time"
          type="datetime-local"
        />
        <Input name="strategy" placeholder="strategy" />

        <button type="submit">create</button>
      </Form>
      <Form onSubmit={handleUpdateRound}>
        <Select
          name="id"
          placeholder="id"
          options={selectRoundsOptions}
          onChange={handleSelectRoundToUpdate}
        />
        <Input
          name="name"
          placeholder="name"
          value={updateRoundName}
          onChange={(e) => setUpdateRoundName(e.target.value)}
        />
        <Input
          name="start_time"
          placeholder="start_time"
          type="datetime-local"
          value={updateRoundStartTime}
          onChange={(e) => setUpdateRoundStartTime(e.target.value)}
        />
        <Input
          name="strategy"
          placeholder="strategy"
          value={updateRoundStrategy}
          onChange={(e) => setUpdateRoundStrategy(e.target.value)}
        />
        <Input
          name="completed"
          placeholder="completed"
          value={updateRoundCompleted}
          onChange={(e) => setUpdateRoundCompleted(e.target.value)}
        />

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
