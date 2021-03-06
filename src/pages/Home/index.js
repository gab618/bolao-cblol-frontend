import React, { useState, useMemo, useEffect } from 'react';
import { toast } from 'react-toastify';
import { format, getHours, parseISO, startOfDay, isAfter } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { MdChevronLeft, MdChevronRight, MdStar } from 'react-icons/md';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import CircularProgress from '@material-ui/core/CircularProgress';
import api from '../../services/api';

import { Container, Match, Team } from './styles';

export default function Home() {
  const [date, setDate] = useState(new Date());
  const [bets, setBets] = useState([]);
  const [round, setRound] = useState({});
  const [allRoundsDates, setAllRoundsDates] = useState([]);

  async function loadBets() {
    const responseBets = await api.get('bets');
    setBets(responseBets.data);
  }
  useEffect(() => {
    async function loadAllRoundsDates() {
      const response = await api.get('rounds');
      const dates = response.data.map((r) => parseISO(r.start_time));
      setAllRoundsDates(dates);
    }
    loadBets();
    loadAllRoundsDates();
  }, []);

  useEffect(() => {
    function setValidDay() {
      if (allRoundsDates.length > 0) {
        const roundDay = allRoundsDates.find((d) => d > startOfDay(new Date()));
        if (roundDay) {
          setDate(roundDay);
        } else {
          setDate(allRoundsDates[allRoundsDates.length - 1]);
        }
      }
    }
    setValidDay();
  }, [allRoundsDates]);

  useEffect(() => {
    async function loadRound() {
      const responseSchedule = await api.get('schedule', {
        params: { date },
      });
      if (!!responseSchedule.data && !!responseSchedule.data.Matches) {
        const formatedMatches = responseSchedule.data.Matches.map((m) => {
          const past = isAfter(new Date(), parseISO(m.start_time));
          const start_hour = { start_hour: getHours(parseISO(m.start_time)) };
          const bet = bets.filter((b) => b.match_id === m.id);
          const choice = bet[0] ? bet[0].choice : null;
          return Object.assign(m, start_hour, { choice }, { past });
        });
        setRound(
          Object.assign(responseSchedule.data, { Matches: formatedMatches })
        );
      }
      setRound(responseSchedule.data);
    }
    loadRound();
  }, [date, bets]);

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

  function handleChange(match, choice) {
    async function bet() {
      try {
        await api.post(`bet/${match}`, { choice });
        await loadBets();
        toast.success('Aposta computada com sucesso');
      } catch (err) {
        toast.error('Error ao registrar aposta :(');
      }
    }
    bet();
  }
  function handlePrevDay() {
    const index = allRoundsDates.indexOf(date);
    if (index !== 0) {
      setDate(allRoundsDates[index - 1]);
    }
  }
  function handleNextDay() {
    const index = allRoundsDates.indexOf(date);
    if (index !== allRoundsDates.length - 1) {
      setDate(allRoundsDates[index + 1]);
    }
  }
  return (
    <Container>
      <header>
        <button type="button" onClick={handlePrevDay}>
          <MdChevronLeft size={36} color="#FFF" />
        </button>
        <strong>{dateFormatted}</strong>
        <button type="button" onClick={handleNextDay}>
          <MdChevronRight size={36} color="#FFF" />
        </button>
      </header>
      <span>{!!round && !!round.name ? round.name : 'Carregando...'}</span>

      <ul>
        {!!round && !!round.Matches ? (
          round.Matches.map((m) => (
            <Match
              key={m.id}
              past={m.past}
              unique={!!(round.Matches.length === 1)}
            >
              <strong>{m.start_hour}h</strong>
              {round.Matches.length === 1 ? <p>Melhor de 5</p> : ''}
              <RadioGroup row className="teams">
                <Team
                  winner={m.blue.id === m.winner}
                  unique={!!(round.Matches.length === 1)}
                >
                  <MdStar
                    size={14}
                    className={
                      round.Matches.length === 1 ? 'chip-larger' : 'chip'
                    }
                  />
                  <div className="img-container">
                    <img src={m.blue.image} alt={m.blue.name} />
                  </div>
                  <span>{m.blue.code}</span>
                  <Radio
                    checked={m.blue.id === m.choice}
                    onChange={() => handleChange(m.id, m.blue.id)}
                    value={m.blue.id}
                    name="radio-button-demo"
                  />
                </Team>
                X
                <Team
                  winner={m.red.id === m.winner}
                  unique={!!(round.Matches.length === 1)}
                >
                  <MdStar
                    size={14}
                    className={
                      round.Matches.length === 1 ? 'chip-larger' : 'chip'
                    }
                  />

                  <div className="img-container">
                    <img src={m.red.image} alt={m.red.name} />
                  </div>
                  <span>{m.red.code}</span>
                  <Radio
                    checked={m.red.id === m.choice}
                    onChange={() => handleChange(m.id, m.red.id)}
                    value={m.red.id}
                    name="radio-button-demo"
                  />
                </Team>
              </RadioGroup>
            </Match>
          ))
        ) : (
          <li className="loading">
            <CircularProgress color="secondary" size={64} />
          </li>
        )}
      </ul>
    </Container>
  );
}
