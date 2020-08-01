import styled from 'styled-components';

export const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;

  header {
    display: flex;
    align-self: center;
    align-items: center;
    margin-top: 30px;

    button {
      border: 0;
      background: none;
    }

    strong {
      font-size: 24px;
      margin: 0 15px;
    }
  }
  ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 15px;
    margin-top: 30px;
  }

  span {
    font-size: 24px;
    text-align: center;
    margin-top: 5px;
  }

  .loading {
    margin: 30px auto;
    grid-column: 1/3;
  }
`;

export const UserTitle = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;

  align-items: center;
  margin-bottom: 10px;

  strong {
    font-size: 32px;
    margin: 0 15px;
  }

  img {
    width: 72px;
    height: 72px;
    border-radius: 50%;
  }

  span {
    font-size: 21px;
  }

  div {
    display: flex;
    flex-direction: column;
    text-align: left;
  }
`;

export const Match = styled.li`
  display: flex;
  flex-direction: column;
  padding: 20px;
  color: #fff;
  background: ${(props) => (props.win ? 'rgb(0, 80, 80)' : '#2c3036')};
  strong {
    display: block;
    font-size: 20px;
    font-weight: normal;
    text-align: center;
  }

  .teams {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const Team = styled.div`
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: column;

  img {
    display: block;
    height: 64px;
    padding-bottom: 5px;
    border-bottom: 1px solid rgb(87, 95, 104);
  }

  span {
    margin-top: 5px;
  }
`;

export const NotFound = styled.div`
  display: flex;
  text-align: center;
  margin: 100px auto;
`;
