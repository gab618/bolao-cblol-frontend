import styled from 'styled-components';

export const Container = styled.div`
  color: black;
  max-width: 1280px;
  margin: 50px auto;

  input, select {
      background: rgba(0,0,0, 0.2);
      border: 0;
      border-radius: 50px;
      height: 24px;
      padding: 0 15px;
      color: #000;
      margin-top: 16px;
      margin-bottom: 8px;
      &::placeholder {
        color: rgba(0, 0, 0, 0.5);
      }
`;
