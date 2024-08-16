import supabase from "../config/supabaseClient.js";

const getAllProperties = async () => {
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Error fetching properties:", error);
    return { success: false, error };
  }
  console.log(data);
  return { success: true, data };
};

const getOneProperty = async (id) => {
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("id", id);
  if (error) {
    console.error("Error fetching property:", error);
    return { success: false, error };
  }
  console.log(data);
  return { success: true, data };
};

const createProperty = async (
  nombre,
  tipo,
  descripcion,
  foto,
  capacidad,
  client_id,
  precio
) => {
  const { data, error } = await supabase
    .from("properties")
    .insert({
      nombre,
      tipo,
      descripcion,
      foto: foto,
      capacidad,
      client_id,
      precio,
    })
    .select();
  if (error) {
    console.error("Error creating property:", error);
    return { success: false, error };
  }
  console.log(data);
  return { success: true, data };
};

const deleteProperty = async (id) => {
  const { data, error } = await supabase
    .from("properties")
    .delete()
    .eq("id", id)
    .select();
  if (error) {
    console.error("Error deleting property:", error);
    return { success: false, error };
  }
  console.log(data);
  return { success: true, data };
};

const updateProperty = async (
  id,
  nombre,
  tipo,
  descripcion,
  foto,
  capacidad,
  client_id,
  precio
) => {
  const { data, error } = await supabase
    .from("properties")
    .update({
      nombre,
      tipo,
      descripcion,
      foto,
      capacidad,
      client_id,
      precio,
    })
    .eq("id", id)
    .select();
  if (error) {
    console.error("Error updating property:", error);
    return { success: false, error };
  }
  console.log(data);
  return { success: true, data };
};

export const propertyModel = {
  getAllProperties,
  getOneProperty,
  createProperty,
  deleteProperty,
  updateProperty,
};
