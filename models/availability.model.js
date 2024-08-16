import supabase from "../config/supabaseClient.js";
import { adjustDates, transformArrayToPostgRESTSyntax } from "../utils/aux.js";

const getAvailabilityProperties = async (
  fecha_inicio,
  fecha_fin,
  capacity = 0
) => {
  const unavailableProperties_result = await getUnavailableProperties(
    fecha_inicio,
    fecha_fin
  );
  if (!unavailableProperties_result.success) {
    return { success: false, error: unavailableProperties_result.error };
  }
  const availableProperties_result = await searchAvailableProperties(
    unavailableProperties_result.properties_ids,
    capacity
  );
  if (!availableProperties_result.success) {
    return { success: false, error: availableProperties_result.error };
  }
  const availableProperties = availableProperties_result.availableProperties;
  console.log({ availableProperties });
  return { success: true, availableProperties };
};

const getUnavailableProperties = async (fecha_inicio, fecha_fin) => {
  const { adjustedArrivalDate, adjustedEndDate } = adjustDates(
    fecha_inicio,
    fecha_fin
  );
  console.log({ adjustedArrivalDate, adjustedEndDate });

  const { data, error } = await supabase
    .from("reservas")
    .select("property_id", { distinct: true })
    .lt("fecha_inicio", adjustedEndDate.toISOString())
    .gt("fecha_fin", adjustedArrivalDate.toISOString());
  if (error) {
    // console.error("Error fetching properties:", error);
    return { success: false, error };
  }
  console.log({ data });

  const properties_ids = data.map((property) => property.property_id) || [];
  console.log({ properties_ids });
  return { success: true, properties_ids };
};

const searchAvailableProperties = async (unavailableProperties, capacity) => {
  console.log("Begining search for available properties");
  // console.log(unavailableProperties);
  const listUnavailableProperties = transformArrayToPostgRESTSyntax(
    unavailableProperties
  );
  console.log(listUnavailableProperties);
  const { data: availableProperties, error } = await supabase
    .from("properties")
    .select("*")
    .not("id", "in", listUnavailableProperties)
    .gte("capacidad", capacity);

  if (error) {
    // console.error("Error fetching properties:", error);
    return { success: false, error };
  }

  console.log(availableProperties);
  return { success: true, availableProperties };
};

const getAvailabilityProperty = async (id, fechaInicio, fechaFin) => {
  const { adjustedArrivalDate, adjustedEndDate } = adjustDates(
    fechaInicio,
    fechaFin
  );
  console.log({ id, fechaInicio, fechaFin });

  const { data, error } = await supabase
    .from("reservas")
    .select("property_id", { distinct: true })
    .lt("fecha_inicio", adjustedEndDate.toISOString())
    .gt("fecha_fin", adjustedArrivalDate.toISOString())
    .eq("property_id", id);
  if (error) {
    // console.error("Error fetching properties:", error);
    return { success: false, error };
  }
  console.log(data);
  let isAvailable = false;
  if (data.length === 0) {
    isAvailable = true;
  }
  return { success: true, isAvailable };
};

export const availabilityModel = {
  getAvailabilityProperties,
  getAvailabilityProperty,
};
