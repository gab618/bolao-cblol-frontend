import styled from 'styled-components';

export const Wrapper = styled.div`
  max-width: 900px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;

  span {
    font-weight: bold;
    text-align: center;
    font-size: 24px;
    margin-bottom: 15px;
  }

  th {
    font-size: 18px;
    font-weight: bold;
  }

  td {
    font-size: 18px;
  }
`;
