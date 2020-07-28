import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import { Link, useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import api from '../../services/api';

const schema = Yup.object().shape({
  password: Yup.string().min(6).required(),
  confirmPassword: Yup.string().when('password', (password, field) =>
    password ? field.required().oneOf([Yup.ref('password')]) : field
  ),
});

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function PasswordReset() {
  const [loading, setLoading] = useState(false);
  const query = useQuery();
  async function handleSubmit({ password, confirmPassword }) {
    const token = query.get('token');
    try {
      setLoading(true);
      await api.put('password', { token, password, confirmPassword });
      toast.success('Senha atualizada!');
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
