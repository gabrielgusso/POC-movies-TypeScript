import { Router } from "express"
import {
  platformGetController,
  platformPostController,
} from "../controllers/platform.controller.js"
import { platformMiddleware } from "../middlewares/platform.middleware.js"

export const platformRouter = Router()

platformRouter.get("/platforms", platformGetController)

platformRouter.post("/platform", platformMiddleware, platformPostController)
