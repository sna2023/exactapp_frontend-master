import React, { useState, useEffect } from "react";
import "../../css/MenuCss/EstiloVentas.css";

const NuevaVenta = ({ cargarContenido }) => {
  const [showClientList, setShowClientList] = useState(false);
  const [showProductList, setShowProductList] = useState(false);
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [clients, setClients] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const COMPANIA_ID = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
  const USERS_API_URL = `https://aadministracion.infor-business.com/api/1.0/Usuario?CompaniaId=${COMPANIA_ID}`;
  const CATEGORIA_API_URL = `https://nova-inventario-api.infor-business.com/inventario/1.0/${COMPANIA_ID}/Categoria`;
  const ARTICULO_API_URL = `https://nova-inventario-api.infor-business.com/inventario/1.0/${COMPANIA_ID}/Articulo?CompaniaId=${COMPANIA_ID}`;

  // Fetch clients
  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      try {
        const response = await fetch(USERS_API_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // 'Authorization': `Bearer ${token}` // Uncomment and add token if needed
          },
        });

        if (!response.ok) throw new Error("Error al obtener los clientes");
        const result = await response.json();
        setClients(result.data || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, []);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(CATEGORIA_API_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // 'Authorization': `Bearer ${token}` // Uncomment and add token if needed
          },
        });

        if (!response.ok) throw new Error("Error al obtener las categorías");
        const result = await response.json();
        setCategories(result.data || []);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchCategories();
  }, []);

  // Fetch products (articulos)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(ARTICULO_API_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // 'Authorization': `Bearer ${token}` // Uncomment and add token if needed
          },
        });

        if (!response.ok) throw new Error("Error al obtener los productos");
        const result = await response.json();
        setProducts(result.data || []);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchProducts();
  }, []);

  // Calculate item count per category
  const getItemCountPerCategory = (categoriaId) => {
    return products.filter(product => product.categoriaId === categoriaId).length;
  };

  const handleClientSelect = (client) => {
    setSelectedClient(client);
    setShowClientList(false);
    setShowProductList(true);
  };

  const handleProductSelect = (product) => {
    if (!selectedProducts.includes(product)) {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  return (
    <div className="container">
      <div className="venta-section">
        <h2>Agregar Nueva Venta</h2>
        <div className="form-group">
          <label>Número de factura</label>
          <input type="number" defaultValue="00050" />
        </div>
        <div className="form-group">
          <label>Fecha</label>
          <input type="date" defaultValue="2024-09-13" />
        </div>
        <div className="form-group cliente-input">
          <input
            type="text"
            placeholder="Nombre del Cliente"
            value={selectedClient || ""}
            readOnly
          />
          <button className="add-button" onClick={() => setShowClientList(true)}>
            +
          </button>
        </div>
      </div>

      <div className="categorias-section">
        <h2>Categorías</h2>
        <div className="categoria-container">
          {categories.map((cat, index) => (
            <div key={index} className={`categoria ${cat.nombre.toLowerCase()}`}>
              {cat.nombre} <br /> {getItemCountPerCategory(cat.id)}
            </div>
          ))}
          {/* Fallback for static example */}
          {categories.length === 0 && (
            <>
              <div className="categoria">Categoría <br /> Items</div>
              <div className="categoria">Categoría <br /> Items</div>
              <div className="categoria">Categoría <br /> Items</div>
              <div className="categoria electronica">Electrónica <br /> 3</div>
            </>
          )}
        </div>
      </div>

      <div className="productos-section">
        <h3>
          <em>Productos</em>
        </h3>
        {selectedProducts.length > 0 ? (
          <ul className="selected-products">
            {selectedProducts.map((product, index) => (
              <li key={index} className="product-item">{product}</li>
            ))}
          </ul>
        ) : (
          <p>No hay productos seleccionados</p>
        )}
        <button
          className="carrito-button"
          onClick={() => cargarContenido("VentasCarrito")}
        >
          ENVIAR AL CARRITO 🛒
        </button>
      </div>

      {/* Modal flotante de la lista de clientes */}
      {showClientList && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Lista de Clientes</h3>
            <button
              className="close-button"
              onClick={() => setShowClientList(false)}
            >
              X
            </button>
            <div className="client-list">
              {clients.map((client, index) => (
                <div
                  key={index}
                  className="client-item"
                  onClick={() => handleClientSelect(client.name || client.userName)}
                >
                  {client.name || client.userName}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal flotante de la lista de productos */}
      {showProductList && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Lista de Productos</h3>
            <button
              className="close-button"
              onClick={() => setShowProductList(false)}
            >
              X
            </button>
            <div className="product-list">
              {products.map((product, index) => (
                <div
                  key={index}
                  className="product-item"
                  onClick={() => handleProductSelect(product.nombre || product.descripcion)}
                >
                  {product.nombre || product.descripcion}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {error && <p className="error-message">{error}</p>}
      {loading && <p>Cargando...</p>}
    </div>
  );
};

export default NuevaVenta;