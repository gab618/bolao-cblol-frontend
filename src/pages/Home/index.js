import React, { useState, useMemo, useEffect } from 'react';
import { toast } from 'react-toastify';
import { format, subDays, addDays, getHours, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import api from '../../services/api';

import { Container, Match } from './styles';

export default function Home() {
  const [date, setDate] = useState(new Date());
  const [round, setRound] = useState({});

  useEffect(() => {
    async function loadRound() {
      const response = await api.get('schedule', {
        params: { date },
      });
      setRound(response.data);
      console.log(response.data);
    }
    loadRound();
  }, [date]);

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

  function handleChange(match, choice) {
    async function bet() {
      try {
        await api.post(`bet/${match}`, { choice });
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
              <Match>
                <strong>{getHours(parseISO(m.start_time))}h</strong>
                <RadioGroup row className="teams">
                  <div className="team">
                    <img src={m.blue.image} alt="" />
                    <span>{m.blue.code}</span>
                    <Radio
                      onChange={() => handleChange(m.id, m.blue.id)}
                      value={m.blue.id}
                      name="radio-button-demo"
                    />
                  </div>
                  X
                  <div className="team">
                    <img src={m.red.image} alt="" />
                    <span>{m.red.code}</span>
                    <Radio
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
      <button type="button">Apostar!</button>
    </Container>
  );
}
