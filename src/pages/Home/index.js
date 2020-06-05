import React, { useState, useMemo } from 'react';
import { format, subDays, addDays } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import api from '../../services/api';

import { Container, Match } from './styles';

export default function Home() {
  const [date, setDate] = useState(new Date());

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

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

      <ul>
        <Match past>
          <strong>13h</strong>
          <div className="teams">
            <div className="team">
              <img
                src="https://lolstatic-a.akamaihd.net/esports-assets/production/team/pain-gaming-bb42sl8r.png"
                alt=""
              />
              <span>PNG</span>
            </div>
            X
            <div className="team">
              <img
                src="http://static.lolesports.com/teams/1591044143429_LogoFlamengo_Light.png"
                alt=""
              />
              <span>PNG</span>
            </div>
          </div>
        </Match>
        <Match>
          <strong>13h</strong>
          <div className="teams">
            <div className="team">
              <img
                src="https://lolstatic-a.akamaihd.net/esports-assets/production/team/pain-gaming-bb42sl8r.png"
                alt=""
              />
              <span>PNG</span>
            </div>
            X
            <div className="team">
              <img
                src="http://static.lolesports.com/teams/1591044143429_LogoFlamengo_Light.png"
                alt=""
              />
              <span>PNG</span>
            </div>
          </div>
        </Match>
        <Match>
          <strong>13h</strong>
          <div className="teams">
            <div className="team">
              <img
                src="https://lolstatic-a.akamaihd.net/esports-assets/production/team/pain-gaming-bb42sl8r.png"
                alt=""
              />
              <span>PNG</span>
            </div>
            X
            <div className="team">
              <img
                src="http://static.lolesports.com/teams/1591044143429_LogoFlamengo_Light.png"
                alt=""
              />
              <span>PNG</span>
            </div>
          </div>
        </Match>
        <Match>
          <strong>13h</strong>
          <div className="teams">
            <div className="team">
              <img
                src="https://lolstatic-a.akamaihd.net/esports-assets/production/team/pain-gaming-bb42sl8r.png"
                alt=""
              />
              <span>PNG</span>
            </div>
            X
            <div className="team">
              <img
                src="http://static.lolesports.com/teams/1591044143429_LogoFlamengo_Light.png"
                alt=""
              />
              <span>PNG</span>
            </div>
          </div>
        </Match>
      </ul>
      <button type="button">Apostar!</button>
    </Container>
  );
}
