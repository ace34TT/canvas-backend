import express from "express";
import upload from "../middlewares/multer.middleware";
import { imageGenerationHandler } from "../controllers/main.controllers";
const router = express.Router();

router.post("/", upload.single("file"), imageGenerationHandler);

export { router as MainRoutes };
