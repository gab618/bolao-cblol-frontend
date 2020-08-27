import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import api from '../../services/api';

// import { Container } from './styles';

function TeamForms({ teams }) {
  async function handleNewTeam(data) {
    try {
      await api.post('team', data);
      toast.success('time criada');
    } catch (err) {
      toast.error('error');
    }
  }

  async function handleUpdateTeam(data) {
    try {
      await api.put(`team/${data.id}`, data);
      toast.success('time editado');
    } catch (err) {
      toast.error('error');
    }
  }
  return (
    <>
      <Form onSubmit={handleNewTeam}>
        <Input name="name" placeholder="name" />
        <Input name="code" placeholder="code" />
        <Input name="image" placeholder="image" />

        <button type="submit">create</button>
      </Form>
      <Form onSubmit={handleUpdateTeam}>
        <Input name="id" placeholder="id" />
        <Input name="name" placeholder="name" />
        <Input name="code" placeholder="code" />
        <Input name="image" placeholder="image" />

        <button type="submit">update</button>
      </Form>

      {teams.map((t) => (
        <p key={t.id}>
          {t.id}:{t.name}:{t.code}:{t.image}
        </p>
      ))}
    </>
  );
}

export default TeamForms;
