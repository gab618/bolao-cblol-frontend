import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Container, Content, Profile } from './styles';

function Header() {
  const profile = useSelector((state) => state.user.profile);
  return (
    <Container>
      <Content>
        <nav>
          <Link to="/home">
            <img
              src="https://i.imgur.com/8FV4ALd.png"
              height={48}
              alt="Bolao CBLOL"
            />
          </Link>
          <Link to="/home">BOLÃO CBLOL</Link>
        </nav>

        <aside>
          <Link to="/leaderboard">Placar</Link>
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <Link to="/profile">Minha conta</Link>
            </div>
            <img
              src={
                profile.avatar
                  ? profile.avatar.url
                  : 'https://www.riotgames.com/darkroom/390/9820c18bc625d00fe118be10405c065a:9aaf80fdbeca44bcf50651584a14423a/idahotb-icon.png'
              }
              alt={profile.name}
            />
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}

export default Header;
