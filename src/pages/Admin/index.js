import React, { useEffect, useState } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import api from '../../services/api';

// import { Container } from './styles';

function Admin() {
  const [teams, setTeams] = useState([]);
  const [rounds, setRounds] = useState([]);
  const [matches, setMatches] = useState([]);
  useEffect(() => {
    async function loadTeams() {
      const response = await api.get('team');
      setTeams(response.data);
    }
    async function loadRounds() {
      const response = await api.get('rounds');
      setRounds(response.data);
    }
    async function loadMatches() {
      const response = await api.get('matches');
      setMatches(response.data);
    }
    loadTeams();
    loadRounds();
    loadMatches();
  }, []);

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
  async function handleUpdateLeaderboard(data) {
    try {
      await api.put(`result/${data.id}`);
      toast.success('placar alterado');
    } catch (err) {
      toast.error('error');
    }
  }

  return (
    <>
      <h4>Team</h4>
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
      <br />
      <h4>Round</h4>
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
      <br />

      <h4>Matches</h4>
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
      <br />

      <h4>Result</h4>
      <Form onSubmit={handleUpdateLeaderboard}>
        <Input name="id" placeholder="id" />
        <button type="submit">atualizar placar</button>
      </Form>
    </>
  );
}

export default Admin;
