import { Router } from "express";

import { reservationController } from "../controllers/reservation.controller.js";

const router = Router();

router.get("/", reservationController.getAllReservations);
router.get("/:id", reservationController.getOneReservation);
router.post("/", reservationController.createReservation);
router.delete("/:id", reservationController.deleteReservation);
router.put("/:id", reservationController.updateReservation);
router.put("/confirm/:id", reservationController.confirmReservation);
router.put("/timeout/:id", reservationController.timeoutReservation);

export default router;
