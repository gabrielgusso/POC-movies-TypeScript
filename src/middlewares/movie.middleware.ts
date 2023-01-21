import { movieSchema } from "../schemas/movie.schema.js"
import { Request, Response, NextFunction } from "express"
import { Movie } from "../protocols/protocols.js"
import { connection } from "../config/database.js"

export async function movieMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const movie = req.body as Movie

  const validation = movieSchema.validate(movie, { abortEarly: false })
  if (validation.error) {
    const error = validation.error.details.map((detail) => detail.message)
    return res.status(422).send(error)
  }

  try {
    const verifyIfExistPlatform = await connection.query(
      `
        SELECT FROM platform WHERE id=$1
        `,
      [movie.platformId]
    )
    if (!verifyIfExistPlatform.rows[0]) {
      return res.status(404).send("Platform not found")
    }

    const verifyIfExistGenre = await connection.query(
      `
        SELECT FROM genre WHERE id=$1
        `,
      [movie.genreId]
    )
    if (!verifyIfExistGenre.rows[0]) {
      return res.status(404).send("Genre not found")
    }

    next()
  } catch (error) {
    return res.status(500).send(error)
  }
}
