import React, { useState, useEffect } from 'react';
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
  const [selectTeamsOptions, setSelectTeamsOptions] = useState([]);
  const [updateTeamName, setUpdateTeamName] = useState('');
  const [updateTeamCode, setUpdateTeamCode] = useState('');
  const [updateTeamImage, setUpdateTeamImage] = useState('');

  useEffect(() => {
    const options = teams.map((t) => {
      return { id: t.id, title: t.name };
    });
    setSelectTeamsOptions(options);
  }, [teams]);

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

  function handleSelectTeamToUpdate(e) {
    const teamId = Number(e.target.value);
    const selectedTeam = teams.filter((team) => {
      return team.id === teamId;
    });

    if (selectedTeam[0]) {
      setUpdateTeamName(selectedTeam[0].name);
      setUpdateTeamCode(selectedTeam[0].code);
      setUpdateTeamImage(selectedTeam[0].image);
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
        <Select
          name="id"
          placeholder="id"
          options={selectTeamsOptions}
          onChange={handleSelectTeamToUpdate}
        />
        <Input
          name="name"
          placeholder="name"
          value={updateTeamName}
          onChange={(e) => setUpdateTeamName(e.target.value)}
        />
        <Input
          name="code"
          placeholder="code"
          value={updateTeamCode}
          onChange={(e) => setUpdateTeamCode(e.target.value)}
        />
        <Input
          name="image"
          placeholder="image"
          value={updateTeamImage}
          onChange={(e) => setUpdateTeamImage(e.target.value)}
        />

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
