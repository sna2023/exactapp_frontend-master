import React from 'react';
import '../../css/MenuCss/EstiloCompra.css';

const ComprasCarrito = () => {
  return (
    <div className="container">
      {/* Sección izquierda */}
      <div className="cart-section">
        <div className="cart-header">
          <button className="back-button">&#8592;</button>
          <h2>Carrito de Compras</h2>
        </div>

        <div className="cart-info">
          <input type="text" placeholder="Número de la Factura" />
          <input type="text" placeholder="Fecha" />
          <div className="provider-row">
            <input type="text" placeholder="Nombre del Proveedor" className="full-width" />
            <button className="add-button">+</button>
          </div>
        </div>

        <div className="cart-table">
          <div className="table-header">
            <span>Cantidad</span>
            <span>Producto</span>
            <span>Total</span>
          </div>
          <div className="table-content">
            {/* Aquí irán los productos dinámicos */}
          </div>
        </div>

        <div className="cart-summary">
          <div className="summary-row">
            <label>Sub Total</label>
            <input type="text" readOnly value="0.00" />
          </div>
          <div className="summary-row">
            <label>Descuento</label>
            <input type="text" />
          </div>
          <div className="summary-row">
            <label>Iva</label>
            <input type="text" readOnly value="0.00" />
          </div>
          <div className="summary-row">
            <label>Total</label>
            <input type="text" readOnly value="0.00" />
          </div>
        </div>

        <div className="cart-buttons">
          <button className="extract-button">EXTRAER XML</button>
          <button className="payment-button">FORMA DE PAGO</button>
        </div>
      </div>

      {/* Sección derecha */}
      <div className="payment-section">
        <div className="payment-header">
          <label>Total a pagar</label>
          <span>$000000.00</span>
        </div>

        <h3>Seleccione el metodo de pago</h3>

        <div className="payment-methods">
          <button className="method">TARJETA <br /> $$$$$$$</button>
          <button className="method">EFECTIVO <br /> $$$$$$$</button>
          <button className="method">TRANSFERENCIA <br /> $$$$$$</button>
        </div>

        <div className="payment-actions">
          <button className="save">Guardar Compra</button>
        </div>
      </div>
    </div>
  );
};

export default ComprasCarrito;
