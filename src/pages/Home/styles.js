import styled from 'styled-components';
import { darken } from 'polished';

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
`;

export const Match = styled.li`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #2c3036;
  color: #fff;

  opacity: ${(props) => (props.past ? 0.4 : 1)};

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

    .team {
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
    }
  }
`;
