import React, { useState } from 'react';
import './CategoryForm.css'; // Importa el archivo de estilos

const CategoryForm = ({ onClose, onSaveCategory }) => {
  const [categoryName, setCategoryName] = useState('');
  const [variations, setVariations] = useState({
    Tamaño: false,
    Capacidad: false,
    Color: false,
    Peso: false,
  });

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

  const handleGuardar = () => {
    const selectedVariations = Object.keys(variations).filter(
      (key) => variations[key]
    );
    onSaveCategory({ name: categoryName, variations: selectedVariations });
    onClose();
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
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="Tamaño"
                name="Tamaño"
                className="checkbox"
                checked={variations.Tamaño}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="Tamaño">Tamaño</label>
            </div>
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="Capacidad"
                name="Capacidad"
                className="checkbox"
                checked={variations.Capacidad}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="Capacidad">Capacidad</label>
            </div>
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="Color"
                name="Color"
                className="checkbox"
                checked={variations.Color}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="Color">Color</label>
            </div>
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="Peso"
                name="Peso"
                className="checkbox"
                checked={variations.Peso}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="Peso">Peso</label>
            </div>
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

            
           