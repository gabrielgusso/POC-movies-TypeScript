import { nameSchema } from "../schemas/movie.schema.js"
import { Request, Response, NextFunction } from "express"
import { Genre } from "../protocols/protocols.js"
import { verifyIfExistGenre } from "../repositories/genre.repository.js"

export async function genreMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const genre = req.body as Genre

  const validation = nameSchema.validate(genre, { abortEarly: false })
  if (validation.error) {
    const error = validation.error.details.map((detail) => detail.message)
    return res.status(422).send(error)
  }

  try {
    const verify = await verifyIfExistGenre(genre)
    if (verify.rows[0]) {
      return res.status(409).send("This genre is already registered")
    }

    next()
  } catch (error) {
    return res.status(500).send(error)
  }
}
