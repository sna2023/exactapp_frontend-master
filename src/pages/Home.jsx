import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button.jsx';
import Card from '../components/Card.jsx';
import logo from './logo.png'; // Asegúrate de que la ruta del logo sea correcta

// Contenedor principal
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 30px; // Padding exacto
  min-height: 100vh;
  background-color: #f5f5f5; // Fondo gris claro exacto
  font-family: 'Arial', sans-serif; // Fuente exacta

  // Responsive: Ajustar padding en pantallas pequeñas
  @media (max-width: 768px) {
    padding: 20px 15px;
  }
`;

// Contenedor del encabezado (rectángulo superior)
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%; // Ocupa el ancho completo
  max-width: 1100px; // Ancho máximo exacto
  margin-bottom: 40px; // Margen inferior exacto
  padding: 15px 25px; // Padding exacto
  background-color: #fff; // Fondo blanco exacto
  border-radius: 10px; // Bordes redondeados exactos
  border: 2px solid #d3c1e5; // Borde morado claro exacto
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); // Sombra exacta

  // Responsive: Ajustar padding y disposición en pantallas pequeñas
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
    padding: 10px 15px;
  }
`;

// Contenedor del logo
const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  width: 70px; // Tamaño exacto según la imagen
  margin-right: 15px; // Espaciado exacto

  // Responsive: Ajustar tamaño en pantallas pequeñas
  @media (max-width: 768px) {
    width: 50px;
    margin-right: 10px;
  }
`;

const LogoText = styled.span`
  font-size: 32px; // Tamaño exacto según la imagen
  font-weight: 700; // Negrita
  color: #6a1b9a; // Color morado exacto

  // Responsive: Ajustar tamaño en pantallas pequeñas
  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

// Contenedor de los botones de navegación
const NavButtons = styled.div`
  display: flex;
  gap: 15px; // Espaciado exacto entre botones

  // Responsive: Ajustar disposición en pantallas pequeñas
  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
  }
`;

// Título principal
const Title = styled.h2`
  font-size: 36px; // Tamaño exacto
  font-weight: 700; // Negrita
  color: #6a1b9a; // Color morado según la imagen
  margin: 30px 0; // Margen exacto
  text-align: center;
  text-transform: uppercase; // Mayúsculas exactas

  // Responsive: Ajustar tamaño de fuente en pantallas pequeñas
  @media (max-width: 768px) {
    font-size: 28px;
    margin: 20px 0;
  }
`;

// Contenedor de las tarjetas
const CardsContainer = styled.div`
  display: flex; // Disposición horizontal (fila)
  flex-wrap: wrap; // Permitir que las tarjetas se envuelvan en pantallas pequeñas
  gap: 30px; // Espaciado exacto entre tarjetas
  margin-bottom: 40px; // Margen inferior exacto
  justify-content: center; // Centrar las tarjetas

  // Responsive: Ajustar disposición en pantallas pequeñas
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
`;

// Texto adicional (rectángulo inferior)
const AdditionalText = styled.p`
  font-size: 12px; // Tamaño exacto
  color: #666; // Color gris exacto
  margin-bottom: 50px; // Margen inferior exacto
  font-style: italic; // Cursiva exacta
  text-align: center;
  padding: 5px 15px; // Padding para el rectángulo
  border: 2px solid #d3c1e5; // Borde morado claro exacto
  border-radius: 5px; // Bordes redondeados exactos
  background-color: transparent; // Fondo transparente

  // Responsive: Ajustar padding en pantallas pequeñas
  @media (max-width: 768px) {
    font-size: 10px;
    padding: 4px 10px;
    margin-bottom: 40px;
  }
`;

// Botón circular "Exactita"
const ExactitaButton = styled.button`
  position: fixed;
  bottom: 20px; // Posición exacta
  right: 20px; // Posición exacta
  background-color: #6a1b9a; // Fondo morado exacto
  color: #fff; // Texto blanco exacto
  border: none;
  border-radius: 50%; // Circular
  width: 70px; // Tamaño exacto
  height: 70px; // Tamaño exacto
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px; // Tamaño de fuente exacto
  font-weight: 700; // Negrita
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); // Sombra exacta
  transition: background-color 0.3s;

  &:hover {
    background-color: #5e1691; // Color más oscuro al pasar el mouse
  }

  // Responsive: Ajustar tamaño en pantallas pequeñas
  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
    font-size: 12px;
    bottom: 15px;
    right: 15px;
  }
`;

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Header>
        <LogoContainer>
          <Logo src={logo} alt="Exact-App Logo" />
          <LogoText>Exact-App</LogoText>
        </LogoContainer>
        <NavButtons>
          <Button onClick={() => navigate('/offers')}>
            Lo que ofrecemos
          </Button>
          <Button onClick={() => navigate('/business-types')}>
            Tipos de negocio
          </Button>
          <Button primary onClick={() => navigate('/login')}>
            Ingresar a Exact-App <span>WEB</span>
          </Button>
        </NavButtons>
      </Header>
      <Title>Gestión y Facturación sin Límites</Title>
      <CardsContainer>
        <Card>XXXXXX</Card>
        <Card>XXXXXX</Card>
        <Card>XXXXXX</Card>
        <Card>XXXXXX</Card>
      </CardsContainer>
      <AdditionalText>propagandas, pendiente pantalla principal</AdditionalText>
      <ExactitaButton>Exactita</ExactitaButton>
    </Container>
  );
};

export default Home;