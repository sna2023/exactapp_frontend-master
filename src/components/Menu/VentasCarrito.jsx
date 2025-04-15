import React, { useState } from 'react';
import '../../css/MenuCss/EstiloVC.css';


const ShoppingCart = () => {
  return (
    <div className="container">
      {/* Sección izquierda - Carrito */}
      <div className="cart-section">
        <div className="cart-header">
          <button className="back-button">&#8592;</button>
          <h2>Carrito</h2>
        </div>
        <div className="cart-info">
          <input type="text" placeholder="Número de la Factura" />
          <input type="text" placeholder="Fecha" />
          <input type="text" placeholder="Nombre del Cliente" className="full-width" />
        </div>
        <div className="cart-table">
          <div className="table-header">
            <span>Cantidad</span>
            <span>Producto</span>
            <span>Total</span>
          </div>
          <div className="table-content">
            {/* Aquí irán los productos agregados al carrito */}
          </div>
        </div>
        <div className="cart-summary">
          <div className="summary-row">
            <label>Sub Total</label>
            <input type="text" />
          </div>
          <div className="summary-row">
            <label>Descuento</label>
            <input type="text" />
          </div>
          <div className="summary-row">
            <label>Iva</label>
            <input type="text" />
          </div>
          <div className="summary-row">
            <label>Total</label>
            <input type="text" />
          </div>
        </div>
        <button className="payment-button">FORMA DE PAGO</button>
      </div>
      
      {/* Sección derecha - Pago */}
      <div className="payment-section">
        <div className="payment-header">
          <label>Total a pagar</label>
          <span>$000000.00</span>
        </div>
        <h3>Seleccione el método de pago</h3>
        <div className="payment-methods">
          <button className="method">TARJETA</button>
          <button className="method">EFECTIVO</button>
          <button className="method">TRANSFERENCIA</button>
        </div>
        <div className="payment-actions">
          <button className="save">Guardar Venta</button>
          <button className="complete">Completar Venta</button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
