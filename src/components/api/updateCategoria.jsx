export const updateCategoria = async (categoria) => {
  try {
    const response = await fetch(
      `https://aadministracion.infor-business.com/api/1.0/Categoria/${categoria.id}`, // Usa categoria.id
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoria),
      }
    );

    if (!response.ok) {
      throw new Error(`Error al actualizar la categoría: ${response.status}`);
    }

    return { message: "Categoría actualizada con éxito." };
  } catch (error) {
    console.error(error);
    return { message: error.message || "Error al actualizar la categoría." };
  }
};