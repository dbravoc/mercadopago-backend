import { Router } from "express";
import { paymentController } from "../controllers/payment.controller.js";

const router = Router();

router.post("/", paymentController.createPayment);

export default router;
