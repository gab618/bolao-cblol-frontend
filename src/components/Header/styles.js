import styled from 'styled-components';

export const Container = styled.div`
  background: #000;
  padding: 0 30px;
  border-bottom: 1px solid rgb(87, 95, 104);
`;

export const Content = styled.div`
  height: 64px;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid rgb(87, 95, 104);
    }

    a {
      font-weight: bold;
      color: #fff;
      margin-left: 15px;
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
  a {
    display: block;
    margin-top: 2px;
    font-size: 14px;
    color: rgb(197, 193, 185);
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid rgb(87, 95, 104);

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #fff;
    }

    a {
      display: block;
      margin-top: 2px;
      font-size: 12px;
      color: rgb(197, 193, 185);
    }
  }
  img {
    height: 40px;
    width: 40px;
    border-radius: 50%;
  }
`;
