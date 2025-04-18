import React, { useState } from 'react';
import '../../css/MenuCss/EstiloCliente.css';

const ListaClientes = () => {
  const [clientes, setClientes] = useState([
    // Ejemplo de datos de clientes
    { id: 1, nombre: 'Ana Pérez', celular: '0991234567', correo: 'ana.perez@example.com' },
    { id: 2, nombre: 'Carlos López', celular: '0987654321', correo: 'carlos.lopez@example.com' },
    // ... más clientes
  ]);

  const handleAgregarCliente = () => {
    // Lógica para agregar un nuevo cliente (redirigir a un formulario, etc.)
    console.log('Agregar Cliente');
  };

  const handleEditarCliente = (id) => {
    // Lógica para editar el cliente con el ID especificado
    console.log('Editar Cliente:', id);
  };

  const handleEliminarCliente = (id) => {
    // Lógica para eliminar el cliente con el ID especificado
    const nuevosClientes = clientes.filter(cliente => cliente.id !== id);
    setClientes(nuevosClientes);
    console.log('Eliminar Cliente:', id);
  };

  return (
    <div className="lista-clientes-container">
      <div className="lista-clientes-header">
        <button className="back-button-clientes">←</button>
        <h2 className="lista-clientes-title">Lista de Clientes</h2>
        <button className="agregar-clientes-button" onClick={handleAgregarCliente}>
          <span className="plus-icon">+</span> Agregar Clientes
        </button>
      </div>

      <div className="lista-clientes-table-container">
        <table className="lista-clientes-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Celular</th>
              <th>Correo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map(cliente => (
              <tr key={cliente.id}>
                <td>{cliente.nombre}</td>
                <td>{cliente.celular}</td>
                <td>{cliente.correo}</td>
                <td className="acciones-clientes">
                  <button className="editar-cliente-button" onClick={() => handleEditarCliente(cliente.id)}>
                    <span className="editar-icon">✏️</span>
                  </button>
                  <button className="eliminar-cliente-button" onClick={() => handleEliminarCliente(cliente.id)}>
                    <span className="eliminar-icon">🗑️</span>
                  </button>
                </td>
              </tr>
            ))}
            {clientes.length === 0 && (
              <tr>
                <td colSpan="4" className="no-clientes">No hay clientes registrados.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListaClientes;
