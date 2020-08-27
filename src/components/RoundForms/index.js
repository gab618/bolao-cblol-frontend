import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import api from '../../services/api';

// import { Container } from './styles';

function RoundsForms({ rounds }) {
  async function handleNewRound(data) {
    try {
      await api.post('round', data);
      toast.success('round criada');
    } catch (err) {
      toast.error('error');
    }
  }
  async function handleUpdateRound(data) {
    try {
      await api.put(`round/${data.id}`, data);
      toast.success('round editado');
    } catch (err) {
      toast.error('error');
    }
  }

  return (
    <>
      <Form onSubmit={handleNewRound}>
        <Input name="name" placeholder="name" />
        <Input name="start_time" placeholder="start_time" />
        <Input name="strategy" placeholder="strategy" />

        <button type="submit">create</button>
      </Form>
      <Form onSubmit={handleUpdateRound}>
        <Input name="id" placeholder="id" />
        <Input name="name" placeholder="name" />
        <Input name="start_time" placeholder="start_time" />
        <Input name="strategy" placeholder="strategy" />
        <Input name="completed" placeholder="completed" />

        <button type="submit">edit</button>
      </Form>
      {rounds.map((t) => (
        <p key={t.id}>
          {t.id}:{t.name}:{t.start_time}:{t.strategy}:{String(t.completed)}
        </p>
      ))}
    </>
  );
}

export default RoundsForms;
