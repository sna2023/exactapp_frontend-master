import React, { useState } from "react";
import './CategoryForm'

const CategoryForm = ({
  newCategory,
  setNewCategory,
  categories,
  handleAddCategory,
  setShowCategoryForm,
  success,
  error,
}) => {
  const handleCategoryInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory((prev) => ({
      ...prev,
      [name]: name === "orden" ? parseInt(value) : value,
    }));
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Categorías</h3>
        <button className="close-button" onClick={() => setShowCategoryForm(false)}>
          X
        </button>
        <div className="form-group">
          <input type="text" placeholder="Buscar Categorías" />
        </div>
        <div className="form-group">
          <label>Nombre de la Categoría</label>
          <input
            type="text"
            placeholder="Agregar Categoría"
            name="nombre"
            value={newCategory.nombre}
            onChange={handleCategoryInputChange}
          />
        </div>
        <div className="form-group">
          <label>Orden</label>
          <input
            type="number"
            name="orden"
            value={newCategory.orden}
            onChange={handleCategoryInputChange}
            placeholder="Orden (opcional)"
          />
        </div>
        <div className="form-group">
          <button onClick={handleAddCategory}>Agregar Categoría</button>
        </div>
        <div className="form-group">
          <h4>Lista de categorías agregadas</h4>
          <ul>
            {categories.map((category) => (
              <li key={category.id}>{category.nombre}</li>
            ))}
          </ul>
        </div>
        {success && <p className="success-message">{success}</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default CategoryForm;
