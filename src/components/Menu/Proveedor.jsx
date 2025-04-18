import React, { useState } from 'react';
import '../../css/MenuCss/EstiloProveedor.css'

function ProveedorComponent() {
  const [selectedProvider, setSelectedProvider] = useState(null);

  const proveedores = [
    { id: 1, nombre: 'La Fabril / Mayorista' },
    { id: 2, nombre: 'El Arbolito / Minorista' },
  ];

  const handleProveedorClick = (id) => {
    setSelectedProvider(id);
    // Lógica para cargar los datos del proveedor a editar
  };

  return (
    <div className="container">
      <div className="list-section">
        <div className="list-header">
          <span className="back-arrow-list">←</span>
          <h2 className="list-title">Lista de Proveedor</h2>
        </div>
        {proveedores.map(proveedor => (
          <div
            key={proveedor.id}
            className={`provider-item ${selectedProvider === proveedor.id ? 'selected' : ''}`}
            onClick={() => handleProveedorClick(proveedor.id)}
          >
            {proveedor.nombre}
          </div>
        ))}
      </div>
      <div className="edit-section">
        <div className="edit-header">
          <span className="back-arrow-edit">←</span>
          <h2 className="edit-title">Editar Proveedor</h2>
        </div>
        <div className="form-group">
          <label htmlFor="nombreEmpresa">Nombre de la Empresa</label>
          <input type="text" id="nombreEmpresa" />
        </div>
        <div className="form-group">
          <label htmlFor="ruc">Ruc</label>
          <input type="text" id="ruc" />
        </div>
        <div className="form-group">
        <label htmlFor="ruc">Correo Electronico</label>
        <input type="text" id="email" />
        </div>
        <div className="form-group">
        <label htmlFor="ruc">Numero de Celular</label>
        <input type="text" id="num" />
        </div>
        {/* ... otros campos del formulario ... */}
        <div className="provider-type-group">
          <div className="radio-wrapper">
            <input type="radio" id="minorista" name="tipoProveedor" />
            <label htmlFor="minorista">Minorista</label>
          </div>
          <div className="radio-wrapper">
            <input type="radio" id="mayorista" name="tipoProveedor" defaultChecked />
            <label htmlFor="mayorista">Mayorista</label>
          </div>
        </div>
        <button className="save-button">Guardar Compra</button>
      </div>
    </div>
  );
}

export default ProveedorComponent;