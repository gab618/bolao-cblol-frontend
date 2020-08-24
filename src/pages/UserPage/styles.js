import styled from 'styled-components';

export const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    margin: 20px auto;
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding-bottom: 15px;
    border-bottom: 1px solid rgb(87, 95, 104);

    @media (max-width: 768px) {
      flex-direction: column;
      .date-navigation {
        margin-top: 15px;
      }
    }

    .date-navigation {
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
    margin-top: 15px;
  }

  .loading {
    margin: 30px auto;
    grid-column: 1/3;
  }

  @media (max-width: 768px) {
    ul {
      grid-gap: 5px;
    }
  }
`;

export const UserTitle = styled.div`
  display: flex;
  align-items: center;

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
  grid-column: ${(props) => (props.unique ? '1 / span 2' : '')};

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
    height: ${(props) => (props.unique ? 128 : 64)}px;
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
