import { Router } from "express";

import { orderController } from "../controllers/order.controller.js";

const router = Router();

router.get("/", orderController.getAllOrders);
router.get("/:id", orderController.getOneOrder);
router.delete("/:id", orderController.deleteOrder);
router.post("/", orderController.createOrderWithReserveId);
router.put("/:id", orderController.updateOrderStatus);

export default router;
