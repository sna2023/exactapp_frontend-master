import React, { useState, useEffect } from "react";
import "../../css/MenuCss/EstiloProducto.css";
import AddProductForm from "../AddProductForm";

const MProducto = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    companiaId: "c8faa65e-1343-46e4-b0de-fe3b3a82d709",
    categoriaId: "",
    codigo: "",
    codigoAuxiliar: "",
    nombre: "",
    valor: 0,
    precio: 0,
    stock: 0,
    codigoTipoImpuesto: "s",
    codigoIva: "s",
    porcentajeIva: 0,
    codigoIce: "string",
    porcentajeIce: 0,
    descripcion: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const COMPANIA_ID = "c8faa65e-1343-46e4-b0de-fe3b3a82d709";
  const CATEGORIA_API_URL = "https://aadministracion.infor-business.com/api/1.0/Categoria";

  const [newCategory, setNewCategory] = useState({
    nombre: "",
    orden: "",
  });

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }

    const storedCategories = localStorage.getItem("categories");
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

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

  const handleAddProduct = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!newProduct.nombre) {
      setError("El nombre del producto es obligatorio");
      setLoading(false);
      return;
    }
    if (!newProduct.categoriaId) {
      setError("Debe seleccionar una categoría");
      setLoading(false);
      return;
    }
    if (newProduct.valor <= 0) {
      setError("El costo debe ser mayor que 0");
      setLoading(false);
      return;
    }
    if (newProduct.precio <= 0) {
      setError("El precio debe ser mayor que 0");
      setLoading(false);
      return;
    }

    const productToAdd = {
      ...newProduct,
      id: editingProduct ? editingProduct.id : Date.now().toString(),
      codigo: newProduct.codigo || "",
      codigoAuxiliar: newProduct.codigo || "",
      descripcion: newProduct.descripcion || "",
    };

    if (editingProduct) {
      setProducts(products.map((prod) => (prod.id === editingProduct.id ? productToAdd : prod)));
      setSuccess("Producto actualizado correctamente");
    } else {
      setProducts([...products, productToAdd]);
      setSuccess("Producto agregado correctamente");
    }

    setShowAddForm(false);
    setEditingProduct(null);
    setNewProduct({
      companiaId: "c8faa65e-1343-46e4-b0de-fe3b3a82d709",
      categoriaId: "",
      codigo: "",
      codigoAuxiliar: "",
      nombre: "",
      valor: 0,
      precio: 0,
      stock: 0,
      codigoTipoImpuesto: "s",
      codigoIva: "s",
      porcentajeIva: 0,
      codigoIce: "string",
      porcentajeIce: 0,
      descripcion: "",
    });
    setTimeout(() => setSuccess(""), 3000);
    setLoading(false);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct({
      ...product,
      precio: product.precio || product.valor + 100,
    });
    setShowAddForm(true);
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter((prod) => prod.id !== productId));
    setSuccess("Producto eliminado correctamente");
    setTimeout(() => setSuccess(""), 3000);
  };

  const handleCloseAddForm = () => {
    setShowAddForm(false);
    window.history.back();
  };

  const handleAddCategory = () => {
    setCategories([...categories, newCategory]);
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
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => {
              const category = categories.find(cat => cat.id === product.categoriaId);
              return (
                <tr key={product.id}>
                  <td>{product.nombre}</td>
                  <td>{category ? category.nombre : "Sin categoría"}</td>
                  <td>{product.codigo}</td>
                  <td>{product.valor}</td>
                  <td>{product.precio}</td>
                  <td>{product.stock}</td>
                  <td>{product.descripcion}</td>
                  <td>
                    <button onClick={() => handleEditProduct(product)}>Editar</button>
                    <button onClick={() => handleDeleteProduct(product.id)}>Eliminar</button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="8">No hay productos agregados.</td>
            </tr>
          )}
        </tbody>
      </table>


      {showAddForm && (
        <div className="overlay">
          <AddProductForm
  onClose={handleCloseAddForm}
  onOpenCategoryForm={() => setShowCategoryForm(true)}
  onSave={(productData) => {
    setProducts((prev) => [...prev, { ...productData, id: Date.now().toString() }]);
  }}
  editingProduct={editingProduct}
/>
  
        </div>
      )}

      {loading && <p>Cargando...</p>}
    </div>
  );
};

export default MProducto;
