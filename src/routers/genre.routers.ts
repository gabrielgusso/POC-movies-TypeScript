import { Router } from "express"
import {
  genreGetController,
  genrePostController,
} from "../controllers/genre.controller.js"
import { genreMiddleware } from "../middlewares/genre.middleware.js"

export const genreRouter = Router()

genreRouter.get("/genres", genreGetController)

genreRouter.post("/genre", genreMiddleware, genrePostController)
