import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: ${props => (props.primary ? '#6a1b9a' : 'transparent')}; // Fondo morado solo para "primary"
  color: ${props => (props.primary ? '#fff' : '#6a1b9a')}; // Texto blanco para "primary", morado para los demás
  border: 2px solidrgb(235, 145, 27); // Borde morado exacto
  padding: 10px 20px; // Padding exacto
  border-radius: 20px; // Bordes redondeados exactos
  cursor: pointer;
  font-size: 14px; // Tamaño de fuente exacto
  font-weight: 600; // Negrita
  margin: 5px;
  display: flex;
  align-items: center;
  gap: 5px; // Espacio para la flecha
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => (props.primary ? '#5e1691' : '#f0e4f7')}; // Hover exacto
    color: ${props => (props.primary ? '#fff' : '#6a1b9a')};
  }

  span {
    font-weight: 400; // Peso más ligero para "WEB"
  }

  // Responsive: Ajustar padding y tamaño de fuente en pantallas pequeñas
  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 12px;
  }
`;

const Button = ({ children, primary, onClick }) => {
  return (
    <StyledButton primary={primary} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default Button;