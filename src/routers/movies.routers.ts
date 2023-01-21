import { Router } from "express"
import {
  movieGetController,
  moviePostController,
} from "../controllers/movie.controller.js"
import { movieMiddleware } from "../middlewares/movie.middleware.js"

export const movieRouter = Router()

movieRouter.get("/movies", movieGetController)

movieRouter.post("/movie", movieMiddleware, moviePostController)
