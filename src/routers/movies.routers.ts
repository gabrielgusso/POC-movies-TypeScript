import { Router } from "express"
import {
  movieGetController,
  moviePostController,
  movieUpdateController,
  movieDeleteController,
  totalMovieGetController
} from "../controllers/movie.controller.js"
import { movieMiddleware } from "../middlewares/movie.middleware.js"

export const movieRouter = Router()

movieRouter.get("/movies", movieGetController)

movieRouter.get("/total-movies", totalMovieGetController)

movieRouter.post("/movie", movieMiddleware, moviePostController)

movieRouter.patch("/movie/:id", movieUpdateController)

movieRouter.delete("/movie/:id", movieDeleteController)

