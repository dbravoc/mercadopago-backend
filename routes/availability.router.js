import { Router } from "express";
import { availabilityController } from "../controllers/availability.controller.js";

const router = Router();

router.get("/", availabilityController.getAvailability);
router.get("/:id", availabilityController.getOneAvailability); // ve si una propiedad existe

export default router;
