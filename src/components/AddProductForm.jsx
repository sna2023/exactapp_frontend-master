import React, { useState, useEffect } from 'react';
import './AddProductForm.css';
import CategoryForm from './CategoryForm.jsx';

const AddProductForm = ({ onClose, onSave, editingProduct = null }) => {
  const [product, setProduct] = useState({
    companiaId: "c8faa65e-1343-46e4-b0de-fe3b3a82d709",
    categoriaId: "",
    codigo: "",
    codigoAuxiliar: "",
    nombre: "",
    valor: null,
    precio: null,
    stock: null,
    codigoTipoImpuesto: "s",
    codigoIva: "s",
    porcentajeIva: 0,
    codigoIce: "string",
    porcentajeIce: 0,
    descripcion: "",
  });
  const [categories, setCategories] = useState([]);
  const CATEGORIA_API_URL = "https://aadministracion.infor-business.com/api/1.0/Categoria";
  const ARTICULO_API_URL = "https://nova-inventario-api.infor-business.com/inventario/1.0";
  const COMPANIA_ID = "c8faa65e-1343-46e4-b0de-fe3b3a82d709";
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch(CATEGORIA_API_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Error al obtener las categorías");
        const result = await response.json();
        setCategories(result.data || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();

    if (editingProduct) {
      setProduct({
        companiaId: editingProduct.companiaId,
        categoriaId: editingProduct.categoriaId,
        codigo: editingProduct.codigo,
        codigoAuxiliar: editingProduct.codigoAuxiliar,
        nombre: editingProduct.nombre,
        valor: editingProduct.valor,
        precio: editingProduct.precio,
        stock: editingProduct.stock,
        codigoTipoImpuesto: editingProduct.codigoTipoImpuesto,
        codigoIva: editingProduct.codigoIva,
        porcentajeIva: editingProduct.porcentajeIva,
        codigoIce: editingProduct.codigoIce,
        porcentajeIce: editingProduct.porcentajeIce,
        descripcion: editingProduct.descripcion,
      });
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === "valor" || name === "precio" || name === "stock"
        ? parseFloat(value) || 0
        : value,
    }));
  };

  const handleCategorySubmit = (newCategory) => {
    setCategories((prev) => [...prev, newCategory]);
    setShowCategoryForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!product.nombre) {
      setError("El nombre del producto es obligatorio");
      setLoading(false);
      return;
    }
    if (!product.categoriaId) {
      setError("Debe seleccionar una categoría");
      setLoading(false);
      return;
    }
    if (product.valor <= 0) {
      setError("El costo debe ser mayor que 0");
      setLoading(false);
      return;
    }
    if (product.precio <= 0) {
      setError("El precio debe ser mayor que 0");
      setLoading(false);
      return;
    }

    const payload = {
      companiaId: COMPANIA_ID,
      categoriaId: product.categoriaId,
      codigo: product.codigo,
      codigoAuxiliar: product.codigoAuxiliar || "",
      nombre: product.nombre,
      valor: parseFloat(product.valor),
      precio: parseFloat(product.precio),
      stock: parseInt(product.stock),
      codigoTipoImpuesto: product.codigoTipoImpuesto || "s",
      codigoIva: product.codigoIva || "s",
      porcentajeIva: parseFloat(product.porcentajeIva) || 0,
      codigoIce: product.codigoIce || "",
      porcentajeIce: parseFloat(product.porcentajeIce) || 0,
      descripcion: product.descripcion || "",
    };

    const url = editingProduct
      ? `${ARTICULO_API_URL}/${COMPANIA_ID}/Articulo/${editingProduct.id}?CompaniaId=${COMPANIA_ID}`
      : `${ARTICULO_API_URL}/${COMPANIA_ID}/Articulo?CompaniaId=${COMPANIA_ID}`;
    const method = editingProduct ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || `Error al ${editingProduct ? 'actualizar' : 'guardar'} el producto`);
      }

      const result = await response.json();
      setSuccess(`Producto ${editingProduct ? 'actualizado' : 'guardado'} correctamente`);
      if (onSave) {
        onSave(result.data); // Assuming your API returns the saved/updated product data
      }
      setTimeout(() => {
        onClose();
        setSuccess("");
      }, 2000);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="form-content">
        <button className="close-btn" onClick={onClose}>
          X
        </button>
        <h3>{editingProduct ? 'Editar Producto' : 'Agregar Nuevo Producto'}</h3>

        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="nombre"
              value={product.nombre}
              onChange={handleChange}
              placeholder="Nombre del Poducto"
              required
              className="nombre-input"
            />
          </div>
          <div>
            <select
              name="categoriaId"
              value={product.categoriaId}
              onChange={handleChange}
              required
              className="categoria-select"
            >
              <option value="">Seleccione Categoría del Producto </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.nombre}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="mas-button"
              onClick={(e) => {
                e.preventDefault(); // Previene el submit del form
                setShowCategoryForm(true);
              }}
            >
              +
            </button>
          </div>
          <div>
            <input
              name="descripcion"
              value={product.descripcion}
              onChange={handleChange}
              placeholder="Descripción (opcional)"
              className="descripcion-input"
            />
          </div>
          <div>
            <input
              type="text"
              name="codigo"
              value={product.codigo}
              onChange={handleChange}
              placeholder="Código del Producto (opcional)"
              className="codigo-input"
            />
          </div>
          <div>
            <input
              type="number"
              name="valor"
              value={product.valor}
              onChange={handleChange}
              placeholder="Costo"
              required
              min="0.01"
              step="0.01"
              className="Costo-input"
            />
          </div>
          <div>
            <input
              type="number"
              name="precio"
              value={product.precio}
              onChange={handleChange}
              placeholder="Precio"
              required
              min="0.01"
              step="0.01"
              className="precio-input"
            />
          </div>
          <div>
            <input
              type="number"
              name="stock"
              value={product.stock}
              onChange={handleChange}
              placeholder="Cantidad"
              min="0"
              step="1"
              className="stock-input"
            />
          </div>
          <div>
            <select name="moneda" value="USD" className="moneda-input" disabled>
              <option value="USD">USD</option>
              <option value="EUR">EURO</option>
            </select>
          </div>
          <button type="submit" className="save-btn" disabled={loading}>
            {loading ? 'Guardando...' : 'Guardar'}
          </button>
        </form>

        {success && <p className="success-message">{success}</p>}
        {error && <p className="error-message">{error}</p>}
      </div>

      {showCategoryForm && (
        <CategoryForm
          categories={categories}
          setCategories={setCategories}
          onClose={() => setShowCategoryForm(false)}
          onSaveCategory={handleCategorySubmit}
        />
      )}
    </div>
  );
};

export default AddProductForm;