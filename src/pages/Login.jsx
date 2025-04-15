import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Button from '../components/Button.jsx';
import logo from './logo.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Logo = styled.img`
  width: 100px;
  margin-bottom: 20px;
`;

const Form = styled.form`
  background-color: #f3e5f5;
  border: 1px solid #d1c4e9;
  border-radius: 10px;
  padding: 20px;
  width: 300px;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #d1c4e9;
  border-radius: 5px;
`;

const ErrorMessage = styled.p`
  color: red;
  margin: 10px 0;
`;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(username, password);
    if (success) {
      navigate('/dashboard'); // Redirige a la pantalla protegida
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <Container>
      <Logo src={logo} alt="Exact-App Logo" />
      <Form onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>
        <Input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button primary type="submit">
          Ingresar
        </Button>
      </Form>
    </Container>
  );
};

export default Login;