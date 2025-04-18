import React, { lazy, Suspense, useState } from "react";
import "../css/estilo_home.css";
import inicioIcon from "../data-icono/inicio.jpg";
import comprasIcon from "../data-icono/5.compras.png";
import exactaAppLogo from "../data-icono/LogoEA.PNG";
import productosIcon from "../data-icono/productos.jpg";
import ventasIcon from "../data-icono/ventas.jpg";
import clienteIcon from "../data-icono/clientes.jpg";
import proveedorIcon from "../data-icono/proveedor.jpg";
import reportesIcon from "../data-icono/reportes.jpg";
import inventarioIcon from "../data-icono/inventario.jpg";
import configuracionIcon from "../data-icono/configuracion.jpg";

// Carga diferida de los componentes
const ContenidoHome = lazy(() => import("./contenido_home.jsx"));
const PerfilActualizacion = lazy(() => import("./usuario/perfil_actulalizacion.jsx"));
const ClienteM = lazy(() => import("./Menu/Clientes.jsx"));
const ComprasM = lazy(() => import("./Menu/Compras.jsx"));
const ConfiguracionM = lazy(() => import("./Menu/Configuracion.jsx"));
const InventarioM = lazy(() => import("./Menu/Inventarios.jsx"));
const ProductoM = lazy(() => import("./Menu/Productos.jsx"));
const ProveedorM = lazy(() => import("./Menu/Proveedor.jsx"));
const ReportesM = lazy(() => import("./Menu/Reportes.jsx"));
const VentasM = lazy(() => import("./Menu/Ventas.jsx"));
const AggClientesP = lazy(() => import("./contenido_de_home/nueva_venta.jsx"));
const NuevaVenta = lazy(() => import("./contenido_de_home/AddVentas.jsx")); // Asegúrate de que la ruta sea correcta

// quiero que VCarrito carge en la misma pantalla, como lo configuro al archivo real
//const VCarrito = lazy(() => import("./Menu/VentasCarrito.jsx"));

// Sidebar componente
const Sidebar = ({ cargarContenido }) => {
  const menuItems = [
    { image: inicioIcon, text: "Inicio", endpoint: "InicioMenu" },
    { image: productosIcon, text: "Productos", endpoint: "ProductosMenu" },
    { image: ventasIcon, text: "Ventas", endpoint: "VentasMenu" },
    { image: clienteIcon, text: "Clientes", endpoint: "ClientesMenu" },
    { image: comprasIcon, text: "Compras", endpoint: "ComprasMenu" },
    { image: proveedorIcon, text: "Proveedor", endpoint: "ProveedorMenu" },
    { image: reportesIcon, text: "Reportes", endpoint: "ReportesMenu" },
    { image: inventarioIcon, text: "Inventario", endpoint: "InventarioMenu" },
    { image: configuracionIcon, text: "Configuración", endpoint: "ConfiguracionMenu" },
  ];

  return (
    <div className="sidebar">
      <div className="logo-container">
        <img src={exactaAppLogo} alt="Exact-App Logo" className="logo" />
      </div>
      <nav>
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} onClick={() => cargarContenido(item.endpoint)}>
              <img src={item.image} alt={item.text} className="menu-item-icon" />
              <span className="menu-item-text">{item.text}</span>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

// Home componente
const Home = () => {
  const [contenidoActual, setContenidoActual] = useState("InicioMenu");

  // Diccionario de componentes
  const componentes = {
    perfil: <PerfilActualizacion />,
    inicio: <ContenidoHome cargarContenido={setContenidoActual} />, // Asegura que inicio cargue ContenidoHome
    InicioMenu: <ContenidoHome cargarContenido={setContenidoActual} />, // Ahora InicioMenu carga el Home
    ProductosMenu: <ProductoM />,
    VentasMenu: <VentasM cargarContenido={setContenidoActual} />, // Pasa cargarContenido a VentasM
    ClientesMenu: <ClienteM />,
    ComprasMenu: <ComprasM />,
    ProveedorMenu: <ProveedorM />,
    ReportesMenu: <ReportesM />,
    InventarioMenu: <InventarioM />,
    ConfiguracionMenu: <ConfiguracionM />,
    aggClientes: <AggClientesP />,
    NuevaVenta: <NuevaVenta cargarContenido={setContenidoActual} />, // Asegúrate de pasar cargarContenido
    //VentasCarrito: <VCarrito />,
  };

  return (
    <div className="app-container">
      <Sidebar cargarContenido={setContenidoActual} />
      <Suspense fallback={<div>Cargando...</div>}>
        <div className="contenido">{componentes[contenidoActual] || <div>Seleccione una opción</div>}</div>
      </Suspense>
    </div>
  );
};

export default Home;
