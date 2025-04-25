import React, { useState, useEffect } from "react";
import "../../css/MenuCss/EstiloProducto.css";
import AddProductForm from "../AddProductForm";

const MProducto = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [newCategory, setNewCategory] = useState({ nombre: "", orden: "" });
  const [showCategoryForm, setShowCategoryForm] = useState(false); // agregado

  const apiUrl = "https://nova-inventario-api.infor-business.com/inventario/1.0";
  const companiaId = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
  const articuloEndpoint = `${apiUrl}/${companiaId}/Articulo`;

  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${articuloEndpoint}?CompaniaId=${companiaId}`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error(`Error HTTP! estado: ${response.status}`);

      const { data } = await response.json();
      setProducts(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const storedCategories = localStorage.getItem("categories");
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    } else {
      setCategories([
        { id: "1", nombre: "Electrónicos" },
        { id: "2", nombre: "Ropa" },
        { id: "3", nombre: "Alimentos" },
      ]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowAddForm(true);
  };

  const handleDeleteProduct = async (productId) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${articuloEndpoint}/${productId}?CompaniaId=${companiaId}`, {
        method: "DELETE",
        headers: { accept: "application/json" },
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      setProducts(products.filter((prod) => prod.id !== productId));
      setSuccess("Producto eliminado correctamente de la API");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Error al eliminar el producto de la API");
      console.error("Error deleting product:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseAddForm = () => {
    setShowAddForm(false);
    setEditingProduct(null);
  };

  const handleAddProduct = async (productData) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(articuloEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          companiaId,
          categoriaId: productData.categoriaId,
          codigo: productData.codigo,
          nombre: productData.nombre,
          valor: productData.valor,
          stock: productData.stock,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al guardar");
      }

      await fetchProducts();
      setSuccess("Producto agregado correctamente");
      setShowAddForm(false);
    } catch (err) {
      setError("Error al agregar el producto a la API");
      console.error("Error adding product:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProduct = async (productData) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${articuloEndpoint}/${editingProduct.id}?CompaniaId=${companiaId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          id: editingProduct.id,
          companiaId,
          categoriaId: productData.categoriaId,
          codigo: productData.codigo,
          codigoAuxiliar: productData.codigoAuxiliar || "",
          nombre: productData.nombre,
          valor: parseFloat(productData.valor),
          codigoTipoImpuesto: productData.codigoTipoImpuesto || "",
          codigoIva: productData.codigoIva || "",
          porcentajeIva: parseFloat(productData.porcentajeIva) || 0,
          codigoIce: productData.codigoIce || "",
          porcentajeIce: parseFloat(productData.porcentajeIce) || 0,
          stock: parseInt(productData.stock),
        }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const updatedProduct = await response.json();
      setProducts(products.map((p) => (p.id === editingProduct.id ? updatedProduct : p)));
      setSuccess("Producto actualizado correctamente");
      setShowAddForm(false);
      setEditingProduct(null);
    } catch (err) {
      setError("Error al actualizar el producto");
      console.error("Error updating product:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProduct = (productData) => {
    editingProduct ? handleUpdateProduct(productData) : handleAddProduct(productData);
  };

  const handleAddCategory = () => {
    const newCategoryId = Date.now().toString();
    setCategories([...categories, { ...newCategory, id: newCategoryId }]);
    setNewCategory({ nombre: "", orden: "" });
    setShowCategoryForm(false);
  };

  return (
    <div className="producto-container">
      <button className="back-button" onClick={() => window.history.back()}>
        ←
      </button>
      <h2>PRODUCTOS</h2>

      <button className="add-product-button" onClick={() => setShowAddForm(true)}>
        + NUEVO PRODUCTO
      </button>

      <table className="product-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Código</th>
            <th>Valor</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="7">Cargando productos...</td>
            </tr>
          ) : products.length > 0 ? (
            products.map((product) => {
              const category = categories.find((cat) => cat.id === product.categoriaId);
              return (
                <tr key={product.id}>
                  <td>{product.nombre}</td>
                  <td>{category ? category.nombre : "Sin categoría"}</td>
                  <td>{product.codigo}</td>
                  <td>{product.valor}</td>
                  <td>{product.precio || "—"}</td>
                  <td>{product.stock}</td>
                  <td>
                    <button onClick={() => handleEditProduct(product)}>Editar</button>
                    <button onClick={() => handleDeleteProduct(product.id)}>Eliminar</button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="7">No hay productos agregados.</td>
            </tr>
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

      {loading && <p>Cargando...</p>}
      {success && <p className="success-message">{success}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default MProducto;
