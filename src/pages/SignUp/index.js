import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { Link } from 'react-router-dom';

export default function SignUp() {
  return (
    <>
      <h1>Crie sua conta</h1>
      <Form>
        <Input name="name" placeholder="Nome" />
        <Input name="email" type="email" placeholder="E-mail" />
        <Input name="password" type="password" placeholder="Senha" />

        <button type="submit">Cadastrar</button>
        <Link to="/">Já tenho login</Link>
      </Form>
    </>
  );
}
