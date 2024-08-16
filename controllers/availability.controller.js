import { availabilityModel } from "../models/availability.model.js";
import { isNonEmptyObject } from "../utils/aux.js";

const getAvailability = async (req, res) => {
  const { fechaInicio, fechaFin, capacity } = req.query;
  try {
    const availableProperties_result =
      await availabilityModel.getAvailabilityProperties(
        fechaInicio,
        fechaFin,
        capacity
      );

    if (!availableProperties_result.success) {
      return res.status(500).json({
        message: "Error fetching properties",
        availableProperties_result,
      });
    }

    if (availableProperties_result.availableProperties.length === 0) {
      return res
        .status(404)
        .json({
          message: "Todas las propiedades estan reservadas",
          availableProperties_result,
        });
    }

    return res.status(200).json(availableProperties_result);
  } catch (error) {
    console.error("Error fetching properties:", error);
    return res.status(500).json({ message: error.message });
  }
};

const getOneAvailability = async (req, res) => {
  const { id } = req.params;
  const { fechaInicio, fechaFin } = req.query;
  try {
    const availableProperty = await availabilityModel.getAvailabilityProperty(
      id,
      fechaInicio,
      fechaFin
    );
    if (!availableProperty.success) {
      return res.status(500).json({ message: "Error fetching property query" });
    }

    return res.status(200).json(availableProperty);
  } catch (error) {
    console.error("Error fetching property:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const availabilityController = {
  getAvailability,
  getOneAvailability,
};
