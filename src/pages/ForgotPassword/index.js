import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import api from '../../services/api';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
});

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit({ email }) {
    // dispatch(signInRequest(email, password));
    try {
      setLoading(true);
      await api.post('password', { email });
      toast.success('Sucesso! Verifique seu email');
    } catch (error) {
      toast.error('Algo errado aconteceu!');
    }
    setLoading(false);
  }
  return (
    <>
      <h1 className>Oh não, a Panela Craft roubou minha senha 🙀</h1>
      <span>Insira seu email para recuperar a sua senha</span>
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="email" type="email" placeholder="Seu e-mail" />

        <button type="submit">{loading ? 'Carregando...' : 'Recuperar'}</button>
        <Link to="/">Voltar</Link>
      </Form>
    </>
  );
}
