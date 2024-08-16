import { propertyModel } from "../models/property.model.js";
import { isNonEmptyObject } from "../utils/aux.js";

const getAllProperties = async (req, res) => {
  try {
    const properties = await propertyModel.getAllProperties();

    if (!properties.success) {
      return res.status(500).json({ message: "Error in Properties Query" });
    }

    if (properties.data.length === 0) {
      return res.status(404).json({ message: "Properties not found" });
    }

    return res.status(200).json(properties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    return res.status(500).json({ message: error.message });
  }
};

const getOneProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await propertyModel.getOneProperty(id);
    if (!property.success) {
      return res.status(500).json({ message: "Error in Property query" });
    }
    if (property.data.length === 0) {
      return res.status(404).json({ message: "Property not found" });
    }
    return res.status(200).json(property);
  } catch (error) {
    console.error("Error fetching property:", error);
    return res.status(500).json({ message: error.message });
  }
};

const createProperty = async (req, res) => {
  try {
    const { nombre, tipo, descripcion, foto, capacidad, client_id, precio } =
      req.body;
    const property = await propertyModel.createProperty(
      nombre,
      tipo,
      descripcion,
      foto,
      capacidad,
      client_id,
      precio
    );
    if (!property.success) {
      return res
        .status(500)
        .json({ message: "Error in creating property", error: property.error });
    }
    return res.status(200).json(property);
  } catch (error) {
    console.error("Error creating property en try catch:", error);
    return res.status(500).json({ message: error.message });
  }
};

const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await propertyModel.deleteProperty(id);
    if (!property.success) {
      return res
        .status(404)
        .json({ message: "Property not found", error: property.error });
    }
    const msg = "Property deleted successfully";
    return res.status(200).json({ message: msg, property });
  } catch (error) {
    console.error("Error deleting property:", error);
    return res.status(500).json({ message: error.message });
  }
};

const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, tipo, descripcion, foto, capacidad, client_id, precio } =
      req.body;
    const property = await propertyModel.updateProperty(
      id,
      nombre,
      tipo,
      descripcion,
      foto,
      capacidad,
      client_id,
      precio
    );
    if (!property.success) {
      return res.status(500).json({ message: "Property error" });
    }

    if (property.data.length === 0) {
      return res.status(404).json({ message: "Property not found" });
    }
    const msg = "Property updated successfully";
    return res.status(200).json({ message: msg, property });
  } catch (error) {
    console.error("Error updating property:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const propertyController = {
  getAllProperties,
  getOneProperty,
  createProperty,
  deleteProperty,
  updateProperty,
};
