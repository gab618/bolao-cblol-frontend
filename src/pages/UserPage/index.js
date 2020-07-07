import React from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../services/api';

import { Container } from './styles';

export default function UserPage() {
  const { id } = useParams();
  return (
    <Container>
      <h1>Id da url: {id}</h1>
    </Container>
  );
}
