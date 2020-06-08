import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    input {
      background: rgba(255, 255, 255, 0.9);
      border: 0;
      border-radius: 50px;
      height: 44px;
      padding: 0 15px;
      color: #000;
      margin: 0 0 10px;
      &::placeholder {
        color: rgba(0, 0, 0, 0.5);
      }
    }

    span {
      color: #fa7394;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }

    hr {
      border: 0;
      height: 1px;
      background: rgb(87, 95, 104);
      margin: 10px 0 20px;
    }

    button {
      margin: 5px 0 0;
      height: 44px;
      background: rgb(31, 101, 119);
      font-weight: bold;
      color: rgb(220, 218, 212);
      border: 0;
      border-radius: 50px;
      font-size: 16px;
      transition: background 0.2s;
      &:hover {
        background: ${darken(0.04, 'rgb(31, 101, 119)')};
      }
    }
  }

  > button {
    width: 100%;
    margin: 10px 0 0;
    height: 44px;
    background: #d13639;
    font-weight: bold;
    color: rgb(220, 218, 212);
    border: 0;
    border-radius: 50px;
    font-size: 16px;
    transition: background 0.2s;
    &:hover {
      background: ${darken(0.08, '#d13639')};
    }
  }
`;
