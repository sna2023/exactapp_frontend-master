export const addCategoria = async (categoria) => {
    const url = `https://aadministracion.infor-business.com/api/1.0/Categoria`;
  
    // Eliminar ID si no es necesario para crear una nueva categoría
    const { id, ...categoriaSinId } = categoria;
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoriaSinId), // No enviamos el ID
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error al agregar la categoría: ${errorData.message}`);
      }
  
      return { success: true, message: "Categoría agregada correctamente" };
    } catch (error) {
      console.error("Error en addCategoria:", error);
      return { success: false, message: error.message };
    }
  };
      