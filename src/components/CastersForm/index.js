import React, { useEffect, useState } from 'react';
import { Select } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography,
  makeStyles,
  FormGroup,
  FormControlLabel,
  Switch,
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

function MatchesForms({ matches, casters }) {
  const classes = useStyles();
  const [selectMatches, setSelectMatchesOptions] = useState([]);
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
    setSelectMatchesOptions(matchesOptions);
  }, []);

  const uncheckAllCasters = () => {
    const newCastersChoices = castersChoices;

    Object.keys(newCastersChoices).forEach((key) => {
      newCastersChoices[key] = false;
    });

    setCastersChoices(newCastersChoices);
  };

  const handleToggleCaster = (event) => {
    setCastersChoices({
      ...castersChoices,
      [event.target.name]: event.target.checked,
    });
  };

  const handleChangeMatch = (event) => {
    uncheckAllCasters();
    setCurrentMatch(event.target.value);
  };

  const handleBet = async () => {
    const blueCasters = [];
    const redCasters = [];
    Object.entries(castersChoices).forEach((entry) => {
      const [key, value] = entry;
      if (value === true) {
        blueCasters.push(key);
      } else {
        redCasters.push(key);
      }
    });

    const {
      blue: { id: blueId },
      red: { id: redId },
    } = matches.filter((m) => m.id === Number(currentMatch))[0];

    for (let i = 0; i < blueCasters.length; i++) {
      const casterId = blueCasters[i];
      try {
        // eslint-disable-next-line no-await-in-loop
        await api.post(`casters/bet/${currentMatch}`, {
          choice: blueId,
          casterId,
        });
        toast.success('Aposta computada com sucesso');
      } catch (err) {
        toast.error('Error ao registrar aposta :(');
      }
    }

    for (let i = 0; i < redCasters.length; i++) {
      const casterId = redCasters[i];
      try {
        // eslint-disable-next-line no-await-in-loop
        await api.post(`casters/bet/${currentMatch}`, {
          choice: redId,
          casterId,
        });
        toast.success('Aposta computada com sucesso');
      } catch (err) {
        toast.error('Error ao registrar aposta :(');
      }
    }
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
      <button type="button" onClick={handleBet}>
        Bet
      </button>
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
