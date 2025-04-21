

import React, { useState } from 'react';
import './CategoryForm.css'; // Importa el archivo de estilos
import { v4 as uuidv4 } from 'uuid';


const CategoryForm = ({ onClose, onSaveCategory }) => {
  const [categoryName, setCategoryName] = useState('');
  const [variations, setVariations] = useState({
    Tamaño: false,
    Capacidad: false,
    Color: false,
    Peso: false,
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (event) => {
    setCategoryName(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setVariations((prevVariations) => ({
      ...prevVariations,
      [name]: checked,
    }));
  };

  const handleGuardar = async () => {
    const selectedVariations = Object.keys(variations)
      .filter((key) => variations[key])
      .join(', '); // para guardarlo como string separado por coma
  
    const newCategoryData = {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6", // puedes usar un UUID dinámico si quieres
      nombre: categoryName,
      orden: 0,
      app: selectedVariations, // esto será por ejemplo: "Tamaño, Color"
      enabled: true,
    };
  
    try {
      const response = await fetch('https://aadministracion.infor-business.com/api/1.0/Categoria', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
          'Authorization': 'Token XYTYJKSBVOSIDHFKNSFBOAHJSDBVBUYGFGKBSDFJKBDSJVKSD' // Incluimos el token en el encabezado Authorization
        },
        body: JSON.stringify(newCategoryData)
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error al guardar la categoría:', errorText);
        setErrorMessage('Error al guardar la categoría. Intenta nuevamente.');
        return;
      }
  
      const savedCategory = await response.json();
      console.log('Categoría guardada exitosamente:', savedCategory);
      onSaveCategory(savedCategory);
      onClose();
    } catch (error) {
      console.error('Error de red:', error);
      setErrorMessage('Error de red. Verifica tu conexión.');
    }
  };
  
  return (
    <div className="overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Agregar Categorías</h2>
          <button type="button" className="close-button" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
              <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div className="form-group">
          <label htmlFor="categoryName" className="label">Nombre</label>
          <input
            type="text"
            id="categoryName"
            className="input"
            placeholder="Nombre del Producto"
            value={categoryName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label className="label">Seleccionar Variaciones</label>
          <div className="variations-grid">
          {Object.keys(variations).map((key) => (
              <div key={key} className="checkbox-container">
                <input
                  type="checkbox"
                  id={key}
                  name={key}
                  className="checkbox"
                  checked={variations[key]}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor={key}>{key}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="button-group">
          <button type="button" className="button cancel" onClick={onClose}>
            Cancelar
          </button>
          <button type="button" className="button submit guardar-button" onClick={handleGuardar}>
            GUARDAR
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryForm;
