import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import { AppBar, Tabs, Tab, Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import api from '../../services/api';

import TeamForms from '../../components/TeamForms';
import RoundForms from '../../components/RoundForms';
import MatchesForms from '../../components/MatchesForms';

import { Container } from './styles';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

function Admin() {
  const [teams, setTeams] = useState([]);
  const [rounds, setRounds] = useState([]);
  const [matches, setMatches] = useState([]);
  useEffect(() => {
    async function loadTeams() {
      const response = await api.get('team');
      setTeams(response.data);
    }
    async function loadRounds() {
      const response = await api.get('rounds');
      setRounds(response.data);
    }
    async function loadMatches() {
      const response = await api.get('matches');
      setMatches(response.data);
    }
    loadTeams();
    loadRounds();
    loadMatches();
  }, []);

  async function handleUpdateLeaderboard(data) {
    try {
      await api.put(`result/${data.id}`);
      toast.success('round alterado');
    } catch (err) {
      toast.error('error');
    }
  }

  async function handleUpdatePoints() {
    try {
      await api.put('points');
      toast.success('placar alterado');
    } catch (err) {
      toast.error('error');
    }
  }

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Container>
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="Team" {...a11yProps(0)} />
            <Tab label="Rounds" {...a11yProps(1)} />
            <Tab label="Matches" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <TeamForms teams={teams} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <RoundForms rounds={rounds} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <MatchesForms matches={matches} teams={teams} rounds={rounds} />
        </TabPanel>
      </div>

      <h4>Result</h4>
      <Form onSubmit={handleUpdateLeaderboard}>
        <Input name="id" placeholder="id" />
        <button type="submit">atualizar round</button>
      </Form>
      <Form onSubmit={handleUpdatePoints}>
        <button type="submit">atualizar pontos</button>
      </Form>
    </Container>
  );
}

export default Admin;
