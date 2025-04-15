import { useState, useEffect } from "react";

const API_URL = "https://aadministracion.infor-business.com/api/1.0/Compania";
const COMPANY_ID = "3fa85f64-5717-4562-b3fc-2c963f66afa6";

const validarRUC = (ruc) => {
    // Validación modificada para coincidir con el formato del ejemplo
    return ruc.length >= 10 && ruc.length <= 20; // Ajustar según requerimientos reales
  };

export default function Compania() {
  const [compania, setCompania] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [formData, setFormData] = useState({
    id: COMPANY_ID, // Agregamos el ID al formData
    ruc: "",
    razonSocial: "",
    direccionMatriz: "",
    abreviatura: "",
    telefono: "",
    email: "",
    nombreBD: "",
    nombreDominio: "",
    enabled: true, // Cambiado de deleted a enabled
  });

  // Función para cargar los datos
  const fetchCompania = async () => {
    try {
      const response = await fetch(`${API_URL}/${COMPANY_ID}`, {
        headers: { Accept: "application/json" },
      });

      if (!response.ok) throw new Error("Error al obtener los datos");

      const data = await response.json();
      setCompania(data);

      // Asegurar que todos los campos necesarios estén presentes
      setFormData({
        id: COMPANY_ID,
        ruc: data.ruc || "",
        razonSocial: data.razonSocial || "",
        direccionMatriz: data.direccionMatriz || "",
        abreviatura: data.abreviatura || "",
        telefono: data.telefono || "",
        email: data.email || "",
        nombreBD: data.nombreBD || "",
        nombreDominio: data.nombreDominio || "",
        enabled: data.enabled ?? true,
      });
    } catch (error) {
      console.error("Error al obtener compañía:", error);
      setMensaje(error.message);
    }
  };

  useEffect(() => {
    fetchCompania();
  }, []);

  const handleChange = (e) => {
    let value = e.target.value;

    // Formatear RUC mientras se escribe
    if (e.target.name === "ruc") {
      value = value.replace(/\D/g, "").slice(0, 11);
    }

    setFormData({ ...formData, [e.target.name]: value });
  };

  const actualizarCompania = async () => {
    try {
      // Validar RUC antes de enviar
      if (!validarRUC(formData.ruc)) {
        setMensaje("RUC inválido: debe contener 11 dígitos");
        return;
      }

      const response = await fetch(`${API_URL}/${COMPANY_ID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        body: JSON.stringify({
          ...formData,
          id: COMPANY_ID, // Asegurar que el ID siempre esté presente
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error en la actualización");
      }

      await fetchCompania();
      setMensaje("¡Actualización exitosa!");
      setTimeout(() => setMensaje(""), 3000);
    } catch (error) {
      console.error("Error:", error);
      setMensaje(error.message); // Mostrar mensaje específico del servidor
    }
  };

  return (
    <div>
      <h2>Información de la Compañía</h2>
      {compania ? (
        <div>
          <p><strong>RUC:</strong> {compania.ruc}</p>
          <p><strong>Razón Social:</strong> {compania.razonSocial}</p>
          <p><strong>Dirección Matriz:</strong> {compania.direccionMatriz}</p>
          <p><strong>Abreviatura:</strong> {compania.abreviatura}</p>
          <p><strong>Teléfono:</strong> {compania.telefono}</p>
          <p><strong>Email:</strong> {compania.email}</p>
          <p><strong>Nombre BD:</strong> {compania.nombreBD}</p>
          <p><strong>Nombre Dominio:</strong> {compania.nombreDominio}</p>
          <p><strong>Habilitado:</strong> {compania.enabled ? "Sí" : "No"}</p>
        </div>
      ) : (
        <p>Cargando información...</p>
      )}

      <h2>Editar Compañía</h2>
      <form>
        <input
          type="text"
          name="ruc"
          value={formData.ruc}
          onChange={handleChange}
          placeholder="RUC"
          required
        />
        <label>
          Habilitado: 
          <select
            name="enabled"
            value={formData.enabled}
            onChange={(e) => setFormData({ ...formData, enabled: e.target.value === "true" })}
          >
            <option value={true}>Sí</option>
            <option value={false}>No</option>
          </select>
        </label>

        <button type="button" onClick={actualizarCompania}>
          Actualizar
        </button>

        {mensaje && <p style={{ color: mensaje.includes("éxito") ? "green" : "red" }}>{mensaje}</p>}
      </form>
    </div>
  );
}
