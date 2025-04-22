import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const API_URL = 'https://aadministracion.infor-business.com/api/1.0/Categoria';

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ id: '', nombre: '', app: '', enabled: true });
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState('');

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(API_URL, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'accept': 'application/json'
        }
      });
      const responseData = await res.json();
      const categorias = responseData.data;
  
      if (Array.isArray(categorias)) {
        setCategories(categorias);
      } else if (categorias) {
        setCategories([categorias]);
      } else {
        setCategories([]);
      }
    } catch (error) {
      console.error('Error al obtener categorías:', error);
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleGuardar = async () => {
    const token = localStorage.getItem('token');
    const body = {
      ...form,
      id: editMode ? form.id : uuidv4(),
      orden: 0,
      companiaId: "f1a7e9cd-3fcd-4567-a3e8-b67f50c210a3",
    };

    try {
      const res = await fetch(API_URL, {
        method: editMode ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'accept': 'application/json'
        },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setMessage(editMode ? '¡Categoría actualizada!' : '¡Categoría agregada!');
        setForm({ id: '', nombre: '', app: '', enabled: true });
        setEditMode(false);
        fetchCategories();
      } else {
        const err = await res.text();
        setMessage('Error: ' + err);
      }
    } catch (error) {
      setMessage('Error de red.');
    }
  };

  const handleEdit = (cat) => {
    setForm(cat);
    setEditMode(true);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setMessage('Categoría eliminada.');
        fetchCategories();
      } else {
        const err = await res.text();
        setMessage('Error al eliminar: ' + err);
      }
    } catch (error) {
      setMessage('Error de red.');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Gestión de Categorías</h2>

      {message && <p style={{ color: 'green' }}>{message}</p>}

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="app"
          placeholder="Variaciones (ej: Color, Tamaño)"
          value={form.app}
          onChange={handleInputChange}
        />
        <button onClick={handleGuardar}>{editMode ? 'Actualizar' : 'Guardar'}</button>
      </div>

      <table border="1" cellPadding="5" cellSpacing="0">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Variaciones</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 ? (
            categories.map((cat) => (
              <tr key={cat.id}>
                <td>{cat.nombre}</td>
                <td>{cat.app}</td>
                <td>{cat.enabled ? 'Activo' : 'Inactivo'}</td>
                <td>
                  <button onClick={() => handleEdit(cat)}>Editar</button>
                  <button onClick={() => handleDelete(cat.id)}>Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No hay categorías registradas</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryManager;
