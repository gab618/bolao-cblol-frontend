import styled from 'styled-components';

export const Container = styled.div`
  background: #000;
  padding: 0 30px;
  border-bottom: 1px solid rgb(87, 95, 104);
  @media screen and (max-width: 480px) {
    padding: 0 10px;
  }
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
      @media screen and (max-width: 480px) {
        margin-right: 5px;
        padding-right: 5px;
      }
    }

    a {
      font-weight: bold;
      color: #fff;
      margin-left: 15px;
      @media screen and (max-width: 480px) {
        margin-left: 0px;
      }
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
  a {
    display: block;
    margin-top: 2px;
    margin-right: 20px;
    font-size: 14px;
    color: rgb(197, 193, 185);
    @media screen and (max-width: 480px) {
      margin-right: 10px;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
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
