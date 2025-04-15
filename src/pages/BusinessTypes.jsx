import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button.jsx';
import logo from './logo.png';

// Contenedor principal (reutilizado de Home)
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 30px;
  min-height: 100vh;
  background-color: #f5f5f5;
  font-family: 'Arial', sans-serif;

  @media (max-width: 768px) {
    padding: 20px 15px;
  }
`;

// Contenedor del encabezado (reutilizado de Home)
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1100px;
  margin-bottom: 40px;
  padding: 15px 25px;
  background-color: #fff;
  border-radius: 10px;
  border: 2px solid #d3c1e9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
    padding: 10px 15px;
  }
`;

// Contenedor del logo (reutilizado de Home)
const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  width: 70px;
  margin-right: 15px;

  @media (max-width: 768px) {
    width: 50px;
    margin-right: 10px;
  }
`;

const LogoText = styled.span`
  font-size: 32px;
  font-weight: 700;
  color: #6a1b9a;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

// Contenedor de los botones de navegación (reutilizado de Home)
const NavButtons = styled.div`
  display: flex;
  gap: 15px;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
  }
`;

// Contenedor de las secciones (ajustado para un diseño de tres columnas)
const SectionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  margin-bottom: 40px;
  justify-content: center;
  width: 100%;
  max-width: 1100px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
`;

// Sección individual (ajustada para el diseño de la imagen)
const Section = styled.div`
  background-color: #f3e5f5;
  border: 2px solid #d3c1e9;
  border-radius: 15px;
  padding: 20px;
  flex: 1;
  min-height: 200px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: left;

  @media (max-width: 768px) {
    width: 100%;
    padding: 15px;
  }

  h2, h3 {
    font-size: 24px;
    font-weight: 700;
    color: #333;
    margin-bottom: 15px;
    text-transform: uppercase;
  }

  ul {
    list-style-type: disc;
    margin-left: 20px;
    color: #666;
    font-size: 16px;
  }

  li {
    margin-bottom: 10px;
  }

  p {
    color: #666;
    font-size: 16px;
    line-height: 1.5;
  }
`;

// Sección más pequeña para la tercera columna
const SmallSection = styled(Section)`
  flex: 0 0 20%;
  min-width: 200px;

  @media (max-width: 768px) {
    flex: 1;
    min-width: 100%;
  }
`;

// Texto adicional (reutilizado de Home)
const AdditionalText = styled.p`
  font-size: 12px;
  color: #666;
  margin-bottom: 50px;
  font-style: italic;
  text-align: center;
  padding: 5px 15px;
  border: 2px solid #d3c1e9;
  border-radius: 5px;
  background-color: transparent;

  @media (max-width: 768px) {
    font-size: 10px;
    padding: 4px 10px;
    margin-bottom: 40px;
  }
`;

// Botón circular "Exactita" (reutilizado de Home)
const ExactitaButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #6a1b9a;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s;

  &:hover {
    background-color: #5e1691;
  }

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
    font-size: 12px;
    bottom: 15px;
    right: 15px;
  }
`;

const BusinessTypes = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Header>
        <LogoContainer>
          <Logo src={logo} alt="Exact-App Logo" />
          <LogoText>Exact-App</LogoText>
        </LogoContainer>
        <NavButtons>
          <Button onClick={() => navigate('/')}>
            Lo que ofrecemos
          </Button>
          <Button primary onClick={() => navigate('/business-types')}>
            Tipos de negocio
          </Button>
          <Button primary onClick={() => navigate('/login')}>
            Ingresar a Exact-App <span>WEB</span>
          </Button>
        </NavButtons>
      </Header>
      <SectionsContainer>
        <Section>
          <h2>Comidas y bebidas</h2>
          <ul>
            <li>Restaurantes y cafeterías</li>
            <li>Panaderías y pastelerías</li>
            <li>Tiendas de bebidas y licores</li>
          </ul>
        </Section>
        <Section>
          <h2>Servicios</h2>
          <p>
            Ofrecemos soluciones para negocios de servicios como peluquerías, 
            talleres mecánicos, y consultorías, ayudándote a gestionar citas, 
            facturación y más.
          </p>
        </Section>
        <SmallSection>
          <h2>xxxxxxx</h2>
        </SmallSection>
      </SectionsContainer>
      <AdditionalText>propagandas, pendiente pantalla principal</AdditionalText>
      <ExactitaButton>Exactita</ExactitaButton>
    </Container>
  );
};

export default BusinessTypes;