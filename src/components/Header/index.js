import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Content, Profile } from './styles';
import logo from '../../assets/logo.png';

function Header() {
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} height={32} alt="Bolao CBLOL" />
          <Link to="/home">BOLÃO CBLOL</Link>
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>Ezreal Blindado</strong>
              <Link to="/profile">Minha conta</Link>
            </div>
            <img
              src="https://pbs.twimg.com/profile_images/1259582410565521414/xCU-mVLs_bigger.png"
              alt="Ezreal Blindado"
            />
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}

export default Header;
