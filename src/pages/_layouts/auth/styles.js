import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #0e1012;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  text-align: center;

  h1 {
    font-size: 1.5rem;
    font-weight: 400;
    line-height: 1.334;
    letter-spacing: 0em;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 14px;
    input {
      background: rgba(255, 255, 255, 0.9);
      border: 0;
      border-radius: 50px;
      height: 56px;
      padding: 0 15px;
      color: #000;
      margin-top: 16px;
      margin-bottom: 8px;
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
    button {
      margin: 24px 0px 16px;
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
    a {
      color: #fff;
      margin-top: 15px;
      font-size: 16px;
      opacity: 0.8;
      &:hover {
        opacity: 1;
      }
    }
  }
`;
