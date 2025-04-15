import React, { useState, useEffect } from "react";
import { updateCategoria } from "./api/updateCategoria"; // Asegúrate de que la ruta sea correcta

const Categoria = ({ categoriaId }) => { // Recibe categoriaId como prop
  const [categoria, setCategoria] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoria = async () => {
      try {
        const response = await fetch(
          `https://aadministracion.infor-business.com/api/1.0/Categoria/${categoriaId}`
        );
        if (!response.ok) {
          throw new Error(`Error al obtener la categoría: ${response.status}`);
        }
        const data = await response.json();
        setCategoria(data);
      } catch (err) {
        console.error(err);
        setError(err.message || "No se pudo cargar la categoría");
      } finally {
        setLoading(false);
      }
    };

    fetchCategoria();
  }, [categoriaId]); // Dependencia en categoriaId

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCategoria((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError(null);

    if (!categoria) {
      setMessage("No hay datos para actualizar.");
      setLoading(false);
      return;
    }

    try {
      const result = await updateCategoria(categoria);
      setMessage(result.message);
    } catch (err) {
      setError(err.message || "Error al actualizar la categoría.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Editar Categoría</h2>
      {categoria ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ... (campos del formulario) */}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Actualizando..." : "Actualizar"}
          </button>
        </form>
      ) : (
        <p>No se pudo cargar la categoría.</p>
      )}

      {message && <p className="mt-4 text-green-500">{message}</p>}
    </div>
  );
};

export default Categoria;