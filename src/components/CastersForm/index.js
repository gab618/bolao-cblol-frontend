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
  MenuItem,
  FormGroup,
  FormControl,
  InputLabel,
  FormControlLabel,
  Switch,
} from '@material-ui/core';
import { MdExpandMore } from 'react-icons/md';
import { blue } from '@material-ui/core/colors';
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

function MatchesForms({ matches, teams, rounds, casters }) {
  const classes = useStyles();
  const [selectMatches, setSelectMatchesOptions] = useState([]);
  const [checked, setChecked] = useState(false);
  const [castersChoices, setCastersChoices] = useState(
    Object.fromEntries(casters.map((caster) => [caster.id, false]))
  );
  const [currentMatch, setCurrentMatch] = useState('');

  useEffect(() => {
    const matchesOptions = matches.map((m) => {
      return {
        id: m.id,
        title: `${`${m.round.name} | ${m.blue.code}`}x${m.red.code}`,
      };
    });
    // const teamOptions = matches.map((m) => {
    //   return { id: m.id, title: m.name };
    // });
    // setSelectTeamsOptions(teamOptions);
    setSelectMatchesOptions(matchesOptions);
    console.log(matches);
  }, []);

  async function handleUpdateMatch(data) {
    try {
      await api.put(`match/${data.id}`, { ...data, is_bo5: checked });
      toast.success('match editado');
    } catch (err) {
      toast.error('error');
    }
  }

  const handleToggleCaster = (event) => {
    setCastersChoices({
      ...castersChoices,
      [event.target.name]: event.target.checked,
    });
    console.log(castersChoices);
  };

  const handleChangeMatch = (event) => {
    setCurrentMatch(event.target.value);
  };

  return (
    <>
      <Select
        name="blue_team"
        options={selectMatches}
        placeholder="Match"
        onChange={handleChangeMatch}
      />
      <span>{currentMatch}</span>
      <FormGroup row>
        {casters.map((caster) => (
          <FormControlLabel
            key={caster.id}
            control={
              <Switch
                onChange={handleToggleCaster}
                name={caster.id}
                checked={castersChoices[caster.id]}
              />
            }
            label={caster.name}
          />
        ))}
      </FormGroup>

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
