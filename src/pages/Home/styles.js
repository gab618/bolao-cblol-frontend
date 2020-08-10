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

  @media (max-width: 768px) {
    margin: 10px 10px;
    ul {
      grid-gap: 5px;
    }
  }
`;

export const Match = styled.li`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #2c3036;
  color: #fff;
  grid-column: ${(props) => (props.unique ? '1 / span 2' : '')};
  opacity: ${(props) => (props.past ? 0.4 : 1)};

  strong {
    display: block;
    font-size: 20px;
    font-weight: normal;
    text-align: center;
  }

  p {
    display: block;
    font-size: 14px;
    font-weight: normal;
    text-align: center;
    margin-top: 5px;
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

  .chip {
    position: absolute;
    background: rgb(245, 0, 87);
    border-radius: 50%;
    top: -20px;
    right: 22px;
    width: 14px;
    height: 14px;
    visibility: ${(props) => (props.winner ? 'visible' : 'hidden')};
  }

  .img-container {
    display: block;
    height: ${(props) => (props.unique ? 128 : 64)}px;
    padding-bottom: 5px;
    border-bottom: 1px solid rgb(87, 95, 104);

    img {
      height: 100%;
    }
  }

  span {
    margin-top: 5px;
  }
`;
