import supabase from "../config/supabaseClient.js";
import { adjustDates, calculateNights } from "../utils/aux.js";

const getAllReservations = async () => {
  console.log("getAllReservations.Model");
  const { data, error } = await supabase.from("reservas").select("*");
  // .order("created_at", { ascending: false });
  if (error) {
    console.error("Error fetching properties:", error);
    return { success: false, error };
  }
  console.log(data);
  return { success: true, data };
};

const getOneReservation = async (id) => {
  const { data, error } = await supabase
    .from("reservas")
    .select("*")
    .eq("id", id);
  if (error) {
    console.error("Error fetching property:", error);
    return { success: false, error };
  }
  // console.log(data);
  return { success: true, data };
};

const createReservation = async (
  fechaInicio,
  fechaFin,
  property_id,
  customer_id
) => {
  const { adjustedArrivalDate, adjustedEndDate } = adjustDates(
    fechaInicio,
    fechaFin
  );
  console.log({ fechaInicio, fechaFin });
  // console.log({ AdjFechaInicio, AdjFechaFin });
  const { data, error } = await supabase
    .from("reservas")
    .insert({
      fecha_inicio: adjustedArrivalDate,
      fecha_fin: adjustedEndDate,
      property_id,
      customer_id,
      estado: "unconfirmed",
      noches: calculateNights(adjustedArrivalDate, adjustedEndDate),
    })
    .select();
  if (error) {
    console.error("Error creating property:", error);
    return error.message;
  }
  console.log(data);
  return data;
};

const deleteReservation = async (id) => {
  const { data, error } = await supabase
    .from("reservas")
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

const updateReservation = async (id, fechaInicio, fechaFin) => {
  const { adjustedArrivalDate, adjustedEndDate } = adjustDates(
    fechaInicio,
    fechaFin
  );
  const { data, error } = await supabase
    .from("reservas")
    .update({
      fecha_inicio: adjustedArrivalDate,
      fecha_fin: adjustedEndDate,
      noches: calculateNights(fechaInicio, fechaFin),
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

const confirmReservation = async (id, estado) => {
  const { data, error } = await supabase
    .from("reservas")
    .update({ estado })
    .eq("id", id)
    .select();
  if (error) {
    console.error("Error updating property:", error);
    return { success: false, error };
  }
  console.log(data);
  return { success: true, data };
};

export const reservationModel = {
  getAllReservations,
  getOneReservation,
  createReservation,
  deleteReservation,
  confirmReservation,
  updateReservation,
};
