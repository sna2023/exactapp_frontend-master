import React, { useState } from 'react';
import './CategoryForm.css'; // Importa los estilos proporcionados

const CategoryForm = ({ categories, setCategories, handleCategorySubmit, onClose }) => {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Ejemplo de estado de carga

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) {
      setError('El nombre de la categoría es obligatorio');
      return;
    }

    // Simulación de guardado (puedes reemplazar con tu lógica de API)
    setLoading(true);
    setTimeout(() => {
      const newCategory = {
        id: Date.now(), // Simulación de ID
        nombre: newCategoryName,
      };
      handleCategorySubmit(newCategory);
      setNewCategoryName('');
      setError('');
      setLoading(false);
      onClose();
    }, 500);
  };

  return (
    <div className="overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Agregar Nueva Categoría</h2>
          <button type="button" className="close-button" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
              <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="newCategoryName" className="label">Nombre de la Categoría:</label>
            <input
              type="text"
              id="newCategoryName"
              className="input"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />
          </div>
          {error && <div className="alert-error">{error}</div>}
          <div className="button-group">
            <button type="button" className="button cancel" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="button submit" disabled={loading}>
              {loading && <span className="spinner"></span>}
              Guardar Categoría
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;
