import React, { useState, useMemo, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
  format,
  subDays,
  addDays,
  getHours,
  parseISO,
  isAfter,
} from 'date-fns';
import pt from 'date-fns/locale/pt';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import api from '../../services/api';

import { Container, Match } from './styles';

export default function Home() {
  const [date, setDate] = useState(new Date());
  const [bets, setBets] = useState([]);
  const [round, setRound] = useState({});

  async function loadBets() {
    const responseBets = await api.get('bets');
    setBets(responseBets.data);
  }
  useEffect(() => {
    loadBets();
  }, []);

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
          return Object.assign(
            m,
            start_hour,
            { choice: bet[0].choice },
            { past }
          );
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
    setDate(subDays(date, 1));
  }
  function handleNextDay() {
    setDate(addDays(date, 1));
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
      <span>{!!round && !!round.name ? round.name : ''}</span>

      <ul>
        {!!round && !!round.Matches
          ? round.Matches.map((m) => (
              <Match key={m.id} past={m.past}>
                <strong>{m.start_hour}h</strong>
                <RadioGroup row className="teams">
                  <div className="team">
                    <img src={m.blue.image} alt={m.blue.name} />
                    <span>{m.blue.code}</span>
                    <Radio
                      checked={m.blue.id === m.choice}
                      onChange={() => handleChange(m.id, m.blue.id)}
                      value={m.blue.id}
                      name="radio-button-demo"
                    />
                  </div>
                  X
                  <div className="team">
                    <img src={m.red.image} alt={m.red.name} />
                    <span>{m.red.code}</span>
                    <Radio
                      checked={m.red.id === m.choice}
                      onChange={() => handleChange(m.id, m.red.id)}
                      value={m.red.id}
                      name="radio-button-demo"
                    />
                  </div>
                </RadioGroup>
              </Match>
            ))
          : 'Sem jogos nesse dia :('}
      </ul>
    </Container>
  );
}
