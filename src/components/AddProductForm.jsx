import React, { useState, useEffect } from 'react';
import './AddProductForm.css';
import CategoryForm from './CategoryForm.jsx';


const AddProductForm = ({ onClose, onOpenCategoryForm }) => {
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
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [savedProducts, setSavedProducts] = useState([]);

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
  }, []);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!product.nombre) {
      setError("El nombre del producto es obligatorio");
      return;
    }
    if (!product.categoriaId) {
      setError("Debe seleccionar una categoría");
      return;
    }
    if (product.valor <= 0) {
      setError("El costo debe ser mayor que 0");
      return;
    }
    if (product.precio <= 0) {
      setError("El precio debe ser mayor que 0");
      return;
    }
    const payload = {
      companiaId: "c8faa65e-1343-46e4-b0de-fe3b3a82d709",
      categoriaId: product.categoriaId,
      codigo: product.codigo || "",
      codigoAuxiliar: product.codigo || "",
      nombre: product.nombre,
      valor: parseFloat(product.valor),
      precio: parseFloat(product.precio),
      stock: product.stock || 0,
      codigoTipoImpuesto: "s",
      codigoIva: "s",
      porcentajeIva: 0,
      codigoIce: "string",
      porcentajeIce: 0,
      descripcion: product.descripcion || "",
    };

    if (editingProduct) {
      const updatedProducts = savedProducts.map((item) =>
        item.codigo === editingProduct.codigo ? payload : item
      );
      setSavedProducts(updatedProducts);
      setEditingProduct(null);
      setSuccess("Producto actualizado correctamente");
    } else {
      setSavedProducts((prev) => [...prev, payload]);
      setSuccess("Guardado correctamente");
    }

    setTimeout(() => {
      onClose();
      setSuccess("");
    }, 2000);
  };

  return (
    <div>
      <div className="form-content">
        <button className="close-btn" onClick={onClose}>
          X
        </button>
        <h3>Agregar Nuevo Producto</h3>

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
          <button type="submit" className="save-btn">
            Guardar
          </button>
        </form>

        {success && <p className="success-message">{success}</p>}
        {error && <p className="error-message">{error}</p>}
        {loading && <p>Cargando categorias...</p>}
      </div>

      {showCategoryForm && (
        <CategoryForm
          categories={categories}
          setCategories={setCategories}
          handleCategorySubmit={handleCategorySubmit}
          onClose={() => setShowCategoryForm(false)}
        />
      )}
    </div>
  );
};

export default AddProductForm;
