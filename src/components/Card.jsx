import styled from 'styled-components';

// Ícono SVG para la mano tocando el botón de "play"
const PlayIcon = () => (
  <svg
    width="36"
    height="36"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ opacity: 0.2 }}
  >
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#6a1b9a', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#2196f3', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <path
      d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 16.5V7.5L16 12L10 16.5Z"
      fill="url(#grad1)"
    />
    <path
      d="M12 14C13.66 14 15 12.66 15 11C15 9.34 13.66 8 12 8C10.34 8 9 9.34 9 11C9 12.66 10.34 14 12 14ZM12 6C14.76 6 17 8.24 17 11C17 13.76 14.76 16 12 16C9.24 16 7 13.76 7 11C7 8.24 9.24 6 12 6Z"
      fill="url(#grad1)"
    />
  </svg>
);

const StyledCard = styled.div`
  background-color: #fff; // Fondo blanco exacto
  border: 2px solidrgb(175, 173, 177); // Borde morado claro exacto
  border-radius: 10px; // Bordes redondeados exactos
  padding: 20px;
  margin: 10px;
  text-align: center;
  width: 280px; // Ancho exacto
  height: 120px; // Altura exacta
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #666; // Color del texto exacto
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); // Sombra exacta
  position: relative;

  // Responsive: Ajustar tamaño en pantallas pequeñas
  @media (max-width: 768px) {
    width: 100%;
    height: 100px;
    font-size: 12px;
  }
`;

const Card = ({ children }) => {
  return (
    <StyledCard>
      <div style={{ position: 'absolute' }}>
        <PlayIcon />
      </div>
      {children}
    </StyledCard>
  );
};

export default Card;