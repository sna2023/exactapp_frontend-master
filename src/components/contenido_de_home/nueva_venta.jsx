import React, { useState } from "react";
import "../../css/ch_ventas/H_agg_clientes.css";


const NuevaVenta = ({ onClose }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    tipoIdentificacion: "ruc",
    identificacion: "",
    correo: "",
    celular: "",
    direccion: "",
    tipoCliente: "minorista",
    codigoPais: "", // nuevo campo
  });
  

  const [mensajeExito, setMensajeExito] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validaciones
      if (!formData.correo.includes("@")) {
        alert("Ingrese un correo válido.");
        return;
      }

      if (!/^\d{6,15}$/.test(formData.celular)) {
        alert("Ingrese un número de celular válido (entre 6 y 15 dígitos).");
        return;
      }
      

      if (formData.tipoIdentificacion === "ruc") {
        if (!/^\d{13}$/.test(formData.identificacion) || !formData.identificacion.endsWith("001")) {
          alert("El RUC debe tener 13 dígitos y terminar en '001'.");
          return;
        }
      } else if (formData.tipoIdentificacion === "cedula") {
        if (!/^\d{10}$/.test(formData.identificacion)) {
          alert("La cédula debe tener exactamente 10 dígitos numéricos.");
          return;
        }
      } else if (formData.tipoIdentificacion === "pasaporte") {
        if (!/^[a-zA-Z0-9]{10}$/.test(formData.identificacion)) {
          alert("El pasaporte debe contener exactamente 10 caracteres alfanuméricos.");
          return;
        }
      }

      // Envío a la API
      const response = await fetch("http://localhost:3001/api/clientes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
  ...formData,
  celular: formData.codigoPais + formData.celular
}),

      });

      if (!response.ok) {
        throw new Error("Error al guardar el cliente.");
      }

      const data = await response.json();
      console.log("Respuesta del servidor:", data);

      // Mostrar mensaje de éxito
      setMensajeExito(true);
      setTimeout(() => setMensajeExito(false), 3000);

      // Reiniciar el formulario
      setFormData({
        nombre: "",
        tipoIdentificacion: "ruc",
        identificacion: "",
        correo: "",
        celular: "",
        direccion: "",
        tipoCliente: "minorista",
      });

    } catch (error) {
      console.error("Error al guardar:", error);
      alert("Hubo un problema al guardar los datos.");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="form-container">
       <button className="close-btn" onClick={onClose}>X</button>
      {mensajeExito && (
        <div className="mensaje-exito">
          ✅✅ ¡Listo! Su nuevo cliente se ha guardado con éxito.
        </div>
      )}

      <h2 className="h2de">Agregar Cliente</h2>
      
      <form onSubmit={handleSubmit}>
        
        
        <div className="form-group">
       
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            autoComplete="off"
            className="text-input"
          />
        </div>

              <div className="form-group radio-group">
            <label>
              Tipo de Identificación:
              {["ruc", "cedula", "pasaporte"].map((tipo) => (
                <div key={tipo} className="radio-item">
                  <span>{tipo.charAt(0).toUpperCase() + tipo.slice(1)}</span>
                  <input
                    type="radio"
                    name="tipoIdentificacion"
                    value={tipo}
                    checked={formData.tipoIdentificacion === tipo}
                    onChange={handleChange}
                    className="radioim"
                  />
                </div>
              ))}
            </label>
          </div>

        <div className="form-group">
          <label>Número de Identificación:</label>
          <input
            type="text"
            name="identificacion"
            value={formData.identificacion}
            onChange={handleChange}
            required
            autoComplete="off"
            className="num-input"
          />
        </div>

        <div className="form-group">
          <label>Correo Electrónico:</label>
          <input
            type="email"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            required
            autoComplete="off"
            className="email-input"
          />
        </div>

        <div className="form-group">
        <label>Número de Celular:</label>
        <div className="phone-input">
          <select
            name="codigoPais"
            className="selecbt"
            value={formData.codigoPais}
            onChange={handleChange}
            required
          >
            <option value="+593">🇪🇨 +593 </option>
            <option value="+57">🇨🇴 +57 </option>
            <option value="+51">🇵🇪 +51 </option>
            <option value="+54">🇦🇷 +54 </option>
            <option value="+1">🇺🇸 +1</option>
          </select>
          <input
            type="tel"
            name="celular"
            value={formData.celular}
            onChange={handleChange}
            required
            autoComplete="off"
            className="cel-input"
          />
        </div>
</div>


        <div className="form-group">
          <label>Dirección:</label>
          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            required
            autoComplete="off"
            className="direccion-input"
          />
        </div>

        <div className="form-group2 radio-group2">
          {["minorista", "mayorista"].map((tipo) => (
            <label key={tipo}>
              <input
                type="radio"
                name="tipoCliente"
                value={tipo}
                checked={formData.tipoCliente === tipo}
                onChange={handleChange}
              />
              {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
            </label>
          ))}
        </div>

        <button type="submit" className="submit-btn">
          Guardar
        </button>
      </form>
    </div>
  );
};

export default NuevaVenta;
