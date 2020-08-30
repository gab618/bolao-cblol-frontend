import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Select } from '@rocketseat/unform';
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

function MatchesForms({ matches, teams, rounds }) {
  const classes = useStyles();
  const [selectTeams, setSelectTeamsOptions] = useState([]);
  const [selectRounds, setSelectRoundsOptions] = useState([]);
  const [selectMatchesOptions, setSelectMatchesOptions] = useState([]);
  const [selectWinnerOptions, setSelectWinnerOptions] = useState([]);

  useEffect(() => {
    const teamOptions = teams.map((t) => {
      return { id: t.id, title: t.name };
    });
    const roundOptions = rounds.map((r) => {
      return { id: r.id, title: r.name };
    });
    const matchOptions = matches.map((r) => {
      return { id: r.id, title: `[${r.id}] ${r.blue.code} x ${r.red.code}` };
    });

    setSelectTeamsOptions(teamOptions);
    setSelectRoundsOptions(roundOptions);
    setSelectMatchesOptions(matchOptions);
  }, [teams, rounds, matches]);

  async function handleNewMatch(data) {
    try {
      await api.post('match', data);
      toast.success('match criada');
    } catch (err) {
      toast.error('error');
    }
  }

  async function handleUpdateMatch(data) {
    try {
      await api.put(`match/${data.id}`, data);
      toast.success('match editado');
    } catch (err) {
      toast.error('error');
    }
  }

  async function handleSetWinMatch(data) {
    try {
      await api.put(`match/${data.id}`, data);
      toast.success('match editado');
    } catch (err) {
      toast.error('error');
    }
  }

  function handleSelectMatchesToUpdate(e) {
    const matchId = Number(e.target.value);
    const selectedMatch = matches.filter((match) => {
      return match.id === matchId;
    });

    if (selectedMatch[0]) {
      // setUpdateMatch(selectedRound[0].name);
    }
  }

  function handleSelectWinnerToUpdate(e) {
    const matchId = Number(e.target.value);
    const selectedMatch = matches.filter((match) => {
      return match.id === matchId;
    });
    if (selectedMatch[0]) {
      const { blue } = selectedMatch[0];
      const { red } = selectedMatch[0];

      setSelectWinnerOptions([
        { id: blue.id, title: blue.name },
        { id: red.id, title: red.name },
      ]);
    }
  }

  return (
    <>
      <Form onSubmit={handleNewMatch}>
        <Select
          name="blue_team"
          options={selectTeams}
          placeholder="blue_team"
        />
        <Select name="red_team" options={selectTeams} placeholder="red_team" />
        <Select name="round_id" options={selectRounds} placeholder="round_id" />
        <Input
          name="start_time"
          type="datetime-local"
          placeholder="start_time"
        />

        <button type="submit">create</button>
      </Form>
      <Form onSubmit={handleUpdateMatch}>
        <Select
          name="id"
          placeholder="id"
          options={selectMatchesOptions}
          onChange={handleSelectMatchesToUpdate}
        />
        <Select
          name="blue_team"
          options={selectTeams}
          placeholder="blue_team"
        />
        <Select name="red_team" options={selectTeams} placeholder="red_team" />
        <Select name="round_id" options={selectRounds} placeholder="round_id" />
        <Input
          name="start_time"
          type="datetime-local"
          placeholder="start_time"
        />

        <button type="submit">edit</button>
      </Form>
      <Form onSubmit={handleSetWinMatch}>
        <Select
          name="id"
          placeholder="id"
          options={selectMatchesOptions}
          onChange={handleSelectWinnerToUpdate}
        />
        <Select
          name="winner"
          placeholder="winner"
          options={selectWinnerOptions}
        />

        <button type="submit">set win</button>
      </Form>

      <ExpansionPanel className={classes.root}>
        <ExpansionPanelSummary
          expandIcon={<MdExpandMore color="#fff" />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Matches</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className={classes.accordionText}>
            {matches.map((t) => (
              <p key={t.id}>
                {t.id}:{t.winner}:blue[{t.blue.id}:{t.blue.code}]:red[
                {t.red.id}:{t.red.code}]:round[{t.round.name}] ==={' '}
                {t.start_time}
              </p>
            ))}
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </>
  );
}

export default MatchesForms;
