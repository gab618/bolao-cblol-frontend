import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import { Link } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogTitle,
  Button,
} from '@material-ui/core';
import * as Yup from 'yup';
import api from '../../services/api';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
});

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const handleClose = () => {
    setOpen(false);
  };

  async function handleSubmit({ email }) {
    try {
      setLoading(true);
      setUserEmail(email);
      await api.post('password', { email });
      // toast.success('Sucesso! Verifique seu email');
      setOpen(true);
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

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Email de recuperação enviado
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Um email foi enviado para <strong>{userEmail}</strong> com as
            instruções de recuperação. Vai dar tudo certo 🙏
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
