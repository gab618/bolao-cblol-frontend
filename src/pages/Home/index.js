import React from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import api from '../../services/api';

import { Container, Match } from './styles';

export default function Home() {
  return (
    <Container>
      <header>
        <button type="button">
          <MdChevronLeft size={36} color="#FFF" />
        </button>
        <strong>06 de junho</strong>
        <button type="button">
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
