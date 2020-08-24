import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { format, getHours, parseISO, startOfDay, isAfter } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { MdChevronLeft, MdChevronRight, MdStar } from 'react-icons/md';
import { Radio, RadioGroup, CircularProgress } from '@material-ui/core';

import api from '../../services/api';

import { Container, UserTitle, Match, Team, NotFound } from './styles';

export default function UserPage() {
  const [user, setUser] = useState({});
  const [date, setDate] = useState(new Date());
  const [round, setRound] = useState({});
  const [bets, setBets] = useState([]);
  const [allRoundsDates, setAllRoundsDates] = useState([]);
  const { id } = useParams();

  async function loadBets() {
    const responseBets = await api.get(`bets/${id}`);
    setBets(responseBets.data);
  }

  useEffect(() => {
    async function loadAllRoundsDates() {
      const response = await api.get('rounds');
      const dates = response.data
        .filter((r) => r.completed)
        .map((r) => parseISO(r.start_time));
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

  useEffect(() => {
    async function getUserData() {
      const response = await api.get(`/users/${id}`);
      setUser(response.data);
    }
    getUserData();
  }, [id]);

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

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

  return (
    <Container>
      {!!user && user.name ? (
        <>
          <UserTitle>
            <img
              alt={user.name}
              src={
                user.avatar
                  ? user.avatar.url
                  : 'https://api.adorable.io/avatars/50/abott@adorable.png'
              }
            />
            <div>
              <strong>{user.name}</strong>
              <span>Pontos: {user.points}</span>
            </div>
          </UserTitle>
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
                  win={m.winner === m.choice}
                  unique={!!(round.Matches.length === 1)}
                >
                  <strong>{m.start_hour}h</strong>
                  <RadioGroup row className="teams">
                    <Team
                      winner={m.blue.id === m.winner}
                      unique={!!(round.Matches.length === 1)}
                    >
                      <img src={m.blue.image} alt={m.blue.name} />
                      <span>{m.blue.code}</span>
                      <Radio
                        checked={m.blue.id === m.choice}
                        value={m.blue.id}
                        name="radio-button-demo"
                      />
                    </Team>
                    X
                    <Team
                      winner={m.red.id === m.winner}
                      unique={!!(round.Matches.length === 1)}
                    >
                      <img src={m.red.image} alt={m.red.name} />
                      <span>{m.red.code}</span>
                      <Radio
                        checked={m.red.id === m.choice}
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
        </>
      ) : (
        <NotFound>
          <h1>
            Usuario não encontrado{' '}
            <span role="img" aria-label="Sad face">
              😕
            </span>
          </h1>
        </NotFound>
      )}
    </Container>
  );
}
