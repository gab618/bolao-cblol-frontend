import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import { Link, useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import api from '../../services/api';

import { signInRequest } from '../../store/modules/auth/actions';

const schema = Yup.object().shape({
  password: Yup.string().min(6).required('Insira sua nova senha'),
  confirmPassword: Yup.string().when('password', (password, field) =>
    password
      ? field.required('As senhas não batem').oneOf([Yup.ref('password')])
      : field
  ),
});

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function PasswordReset() {
  const [loading, setLoading] = useState(false);
  const query = useQuery();
  const dispatch = useDispatch();

  async function handleSubmit({ password, confirmPassword }) {
    setLoading(true);
    try {
      const token = query.get('token');
      const { email } = jwt.decode(token);

      await api.put('password', { token, password, confirmPassword });

      dispatch(signInRequest(email, password));
    } catch (error) {
      toast.error('Algo errado aconteceu!');
    }
    setLoading(false);
  }

  return (
    <>
      <h1 className>Vai dar tudo certo</h1>
      <span>Insira sua nova senha</span>
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="password" type="password" placeholder="Senha" />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirmar senha"
        />

        <button type="submit">
          {loading ? 'Carregando...' : 'Atualizar senha'}
        </button>
        <Link to="/">Tela de login</Link>
      </Form>
    </>
  );
}
