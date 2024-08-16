import supabase from "../config/supabaseClient.js";
import { calculateNights } from "../utils/aux.js";
import { reservationModel } from "./reservation.model.js";
import { propertyModel } from "./property.model.js";

const getAllOrders = async () => {
  const { data, error } = await supabase.from("ordenes").select("*");
  if (error) {
    console.error("Error fetching properties:", error);
    return { success: false, error };
  }
  return { success: true, data };
};

const getOneOrder = async (id) => {
  const { data, error } = await supabase
    .from("ordenes")
    .select("*")
    .eq("id", id);
  if (error) {
    console.error("Error fetching property:", error);
    return { success: false, error };
  }
  return { success: true, data };
};

const deleteOrder = async (id) => {
  const { data, error } = await supabase
    .from("ordenes")
    .delete()
    .eq("id", id)
    .select();
  if (error) {
    console.error("Error deleting property:", error);
    return { success: false, error };
  }
  return { success: true, data };
};

const createOrderWithReserveId = async (reserveId) => {
  try {
    const queryReserve = await reservationModel.getOneReservation(reserveId);
    const reserve = queryReserve.data[0];
    console.log(reserve);
    const queryProperty = await propertyModel.getOneProperty(
      reserve.property_id
    );
    const property = queryProperty.data[0];
    console.log(property);
    const { data, error } = await supabase
      .from("ordenes")
      .insert({
        reserva_id: reserveId,
        customer_id: reserve.customer_id,
        noches: reserve.noches,
        estado: "pending",
        price_noche: property.precio,
        value_reserve: reserve.noches * property.precio,
      })
      .select();
    if (error) {
      console.error("Error creating order:", error);
      return { success: false, error };
    }
    return { success: true, data };
  } catch (error) {
    console.error("Error creating order:", error);
    return { success: false, error };
  }
};

const updateOrderStatus = async (id, estado) => {
  try {
    const { data, error } = await supabase
      .from("ordenes")
      .update({ estado })
      .eq("id", id)
      .select();
    if (error) {
      return { success: false, error };
    }
    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
};

export const orderModel = {
  getAllOrders,
  getOneOrder,
  deleteOrder,
  createOrderWithReserveId,
  updateOrderStatus,
};
