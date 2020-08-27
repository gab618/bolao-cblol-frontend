import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import api from '../../services/api';

// import { Container } from './styles';

function MatchesForms({ matches }) {
  async function handleNewMatch(data) {
    try {
      await api.post('match', data);
      toast.success('match criada');
    } catch (err) {
      toast.error('error');
    }
  }

  async function handleUpdateMatch(data) {
    try {
      await api.put(`match/${data.id}`, data);
      toast.success('match editado');
    } catch (err) {
      toast.error('error');
    }
  }
  async function handleSetWinMatch(data) {
    try {
      await api.put(`match/${data.id}`, data);
      toast.success('match editado');
    } catch (err) {
      toast.error('error');
    }
  }

  return (
    <>
      <Form onSubmit={handleNewMatch}>
        <Input name="blue_team" placeholder="blue_team" />
        <Input name="red_team" placeholder="red_team" />
        <Input name="round_id" placeholder="round_id" />
        <Input name="start_time" placeholder="start_time" />

        <button type="submit">create</button>
      </Form>
      <Form onSubmit={handleUpdateMatch}>
        <Input name="id" placeholder="id" />
        <Input name="blue_team" placeholder="blue_team" />
        <Input name="red_team" placeholder="red_team" />
        <Input name="round_id" placeholder="round_id" />
        <Input name="start_time" placeholder="start_time" />

        <button type="submit">edit</button>
      </Form>
      <Form onSubmit={handleSetWinMatch}>
        <Input name="id" placeholder="id" />
        <Input name="winner" placeholder="winner" />

        <button type="submit">set win</button>
      </Form>
      {matches.map((t) => (
        <p key={t.id}>
          {t.id}:{t.winner}:blue[{t.blue.id}:{t.blue.code}]:red[
          {t.red.id}:{t.red.code}]:round[{t.round.name}] === {t.start_time}
        </p>
      ))}
    </>
  );
}

export default MatchesForms;
