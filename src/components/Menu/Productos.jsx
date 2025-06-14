
import React, { useState, useEffect } from "react";
import "../../css/MenuCss/EstiloProducto.css";
import AddProductForm from "../AddProductForm";
import CategoryForm from "../CategoryForm";

const MProducto = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showCategoryForm, setShowCategoryForm] = useState(false);

  const apiUrl = "https://nova-inventario-api.infor-business.com/inventario/1.0";
  const companiaId = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
  const articuloEndpoint = `${apiUrl}/${companiaId}/Articulo`;
  const categoriaEndpoint = "https://aadministracion.infor-business.com/api/1.0/Categoria";

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${articuloEndpoint}?CompaniaId=${companiaId}`, {
        headers: { accept: "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const { data } = await res.json();
      setProducts(data || []);
    } catch (e) {
      console.error("Error fetching products:", e);
      setError("Error al cargar productos");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    setError("");
    try {
      const res = await fetch(`${categoriaEndpoint}?CompaniaId=${companiaId}`, {
        headers: { accept: "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const { data } = await res.json();
      setCategories(data || []);
    } catch (e) {
      console.error("Error fetching categories:", e);
      setError("Error al cargar categorías");
    }
  };

  const handleEditProduct = (product) => {
    setError("");
    setSuccess("");
    setEditingProduct(product);
    setShowAddForm(true);
  };

  const handleDeleteProduct = async (id) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${articuloEndpoint}/${id}?CompaniaId=${companiaId}`, {
        method: "DELETE",
        headers: { accept: "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await fetchProducts();
      setSuccess("Producto eliminado correctamente");
      setTimeout(() => setSuccess(""), 3000);
    } catch (e) {
      console.error("Error deleting product:", e);
      setError(`Error al eliminar el producto: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseAddForm = () => {
    setShowAddForm(false);
    setEditingProduct(null);
    setError("");
    setSuccess("");
  };

  const handleAddProduct = async (data) => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch(articuloEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", accept: "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
        body: JSON.stringify({
          companiaId,
          categoriaId: data.categoriaId,
          codigo: data.codigo,
          nombre: data.nombre,
          valor: data.valor,
          precio: data.precio,
          stock: data.stock,
        }),
      });
      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.message || `HTTP ${res.status}`);
      }
      await fetchProducts();
      setSuccess("Producto agregado correctamente");
      setTimeout(() => setSuccess(""), 3000);
      setShowAddForm(false);
    } catch (e) {
      console.error("Error adding product:", e);
      setError(`Error al agregar el producto: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProduct = async (data) => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch(`${articuloEndpoint}/${editingProduct.id}?CompaniaId=${companiaId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", accept: "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
        body: JSON.stringify({
          id: editingProduct.id,
          companiaId,
          categoriaId: data.categoriaId,
          codigo: data.codigo,
          nombre: data.nombre,
          valor: parseFloat(data.valor),
          precio: parseFloat(data.precio),
          stock: parseInt(data.stock, 10),
        }),
      });
      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.message || `HTTP ${res.status}`);
      }
      await fetchProducts();
      setSuccess("Producto actualizado correctamente");
      setTimeout(() => setSuccess(""), 3000);
      setShowAddForm(false);
      setEditingProduct(null);
    } catch (e) {
      console.error("Error updating product:", e);
      setError(`Error al actualizar el producto: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProduct = (data) =>
    editingProduct ? handleUpdateProduct(data) : handleAddProduct(data);

  const handleSaveNewCategory = (newCat) => {
    setShowCategoryForm(false);
    fetchCategories();
  };

  return (
    <div className="producto-container">
      <button className="back-button" onClick={() => window.history.back()}>←</button>
      <h2>PRODUCTOS</h2>

      <button className="add-product-button" onClick={() => setShowAddForm(true)}>+ NUEVO PRODUCTO</button>
     

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <table className="product-table">
        <thead>
          <tr>
            <th value="nombre ">Producto</th>
            <th value="categoria ">Categoría</th>
            <th value=" "> COMPRADO</th>
            <th value="cantidad ">Existencia</th>
            <th value="tipo de moneda ">Moneda</th>
            <th value="precio ">Costo</th>
            <th value="sumar cantidad+precio mas el iva de 12% ">total</th>
            <th value="nombre ">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan="7"></td></tr>
          ) : products.length ? (
            products.map((prod) => {
              const cat = categories.find((c) => c.id === prod.categoriaId);
              return (
                <tr key={prod.id}>
                  <td>{prod.nombre}</td>
                  <td>{cat?.nombre || "Sin categoría"}</td>
                  <td>{prod.codigo}</td>
                  <td>{prod.stock}</td>
                  <td>{"USD"}</td>
                  <td>{prod.precio?.toFixed(2) || "5"}</td>
                  <td>{((prod.precio || 0) * (prod.stock || 0) * 1.12).toFixed(2)}</td>
                  <td>
                    <button onClick={() => handleEditProduct(prod)}>Editar</button>
                    <button onClick={() => handleDeleteProduct(prod.id)}>Eliminar</button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr><td colSpan="7">No hay productos.</td></tr>
          )}
        </tbody>
      </table>

      {showAddForm && (
        <div className="overlay">
          <AddProductForm
            onClose={handleCloseAddForm}
            onOpenCategoryForm={() => setShowCategoryForm(true)}
            onSave={handleSaveProduct}
            editingProduct={editingProduct}
            categories={categories}
          />
        </div>
      )}
      {showCategoryForm && (
        <div className="overlay">
          <CategoryForm
            onClose={() => setShowCategoryForm(false)}
            onSaveCategory={handleSaveNewCategory}
          />
        </div>
      )}
    </div>
  );
};

export default MProducto;
