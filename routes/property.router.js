import { Router } from "express";

// import { authMiddleware } from "../middlewares/auth.middleware.js";
import { propertyController } from "../controllers/property.controller.js";

const router = Router();

// router.get("/", authMiddleware, usuariosController.getAllUsers);

router.get("/", propertyController.getAllProperties);
router.get("/:id", propertyController.getOneProperty);
router.post("/", propertyController.createProperty);
router.delete("/:id", propertyController.deleteProperty);
router.put("/:id", propertyController.updateProperty);

export default router;
