import { reservationModel } from "../models/reservation.model.js";
import { isNonEmptyObject } from "../utils/aux.js";

const getAllReservations = async (req, res) => {
  try {
    const reservations_result = await reservationModel.getAllReservations();

    if (!reservations_result.success) {
      return res
        .status(500)
        .json({ message: "Error fetching reservations", reservations_result });
    }
    if (reservations_result.data.length === 0) {
      return res.status(404).json({ message: "Reservations not found" });
    }
    return res.status(200).json(reservations_result);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return res.status(500).json({ message: error.message });
  }
};

const getOneReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await reservationModel.getOneReservation(id);

    if (!reservation.success) {
      return res.status(500).json({ message: "Error Reservation not found" });
    }

    if (reservation.data.length === 0) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    return res.status(200).json(reservation);
  } catch (error) {
    console.error("Error fetching reservation:", error);
    return res.status(500).json({ message: error.message });
  }
};

const createReservation = async (req, res) => {
  try {
    const { fechaInicio, fechaFin, property_id, customer_id } = req.body;
    const reservation = await reservationModel.createReservation(
      fechaInicio,
      fechaFin,
      property_id,
      customer_id
    );
    return res.status(200).json(reservation);
  } catch (error) {
    console.error("Error creating reservation:", error);
    return res.status(500).json({ message: error.message });
  }
};

const deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await reservationModel.deleteReservation(id);
    if (!reservation.success) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    const msg = "Reservation deleted successfully";
    return res.status(200).json({ message: msg, reservation });
  } catch (error) {
    console.error("Error deleting reservation:", error);
    return res.status(500).json({ message: error.message });
  }
};

const updateReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const { fechaInicio, fechaFin } = req.body;
    const reservation = await reservationModel.updateReservation(
      id,
      fechaInicio,
      fechaFin
    );
    if (!isNonEmptyObject(reservation)) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    const msg = "Reservation updated successfully";
    return res.status(200).json({ message: msg, reservation });
  } catch (error) {
    console.error("Error updating reservation:", error);
    return res.status(500).json({ message: error.message });
  }
};

const confirmReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await reservationModel.confirmReservation(
      id,
      "confirmed"
    );
    if (!reservation.success) {
      return res
        .status(404)
        .json({ message: "Reservation not found", reservation });
    }
    const msg = "Reservation confirmed successfully";
    return res.status(200).json({ message: msg, reservation });
  } catch (error) {
    console.error("Error confirming reservation:", error);
    return res.status(500).json({ message: error.message });
  }
};

const timeoutReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await reservationModel.confirmReservation(
      id,
      "timeout"
    );
    if (!reservation) {
      return res
        .status(404)
        .json({ message: "Reservation not found", reservation });
    }
    const msg = "Reservation timeout successfully";
    return res.status(200).json({ message: msg, reservation });
  } catch (error) {
    console.error("Error confirming reservation:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const reservationController = {
  getAllReservations,
  getOneReservation,
  createReservation,
  deleteReservation,
  updateReservation,
  confirmReservation,
  timeoutReservation,
};
