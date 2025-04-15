// deleteCategoria.js
export const deleteCategoria = async (id) => {
  const url = `https://aadministracion.infor-business.com/api/1.0/Categoria/${id}`;

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al eliminar la categoría");
    }

    return { success: true, message: "Categoría eliminada correctamente" };
  } catch (error) {
    console.error("Error en deleteCategoria:", error);
    return { success: false, message: error.message };
  }
};