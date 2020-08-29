import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 1280px;
  margin: 50px auto;

  input,
  select {
    color: #fff;
    background: rgba(255, 255, 255, 0.2);
    border: 0;
    border-radius: 50px;
    height: 24px;
    padding: 0 15px;
    margin-top: 16px;
    margin-bottom: 8px;
    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
  }

  option {
    color: #333;
  }

  .admin-forms,
  .points,
  .update-round {
    button {
      padding: 0 8px;
      height: 28px;
      background: #3f51b5;
      color: #fff;
      border: 0;
      border-radius: 50px;
      font-size: 14px;
      transition: background 0.2s;
      &:hover {
        background: ${darken(0.08, '#3f51b5')};
      }
    }
  }

  form {
    padding-bottom: 16px;
    border-bottom: 1px solid rgb(87, 95, 104);

    input,
    select {
      margin-right: 8px;
    }
  }

  .points,
  .update-round {
    border-bottom: 0;
  }
`;
