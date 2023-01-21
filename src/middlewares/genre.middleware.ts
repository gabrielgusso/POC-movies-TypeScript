import { nameSchema } from "../schemas/movie.schema.js"
import { Request, Response, NextFunction } from "express"
import { Genre } from "../protocols/protocols.js"
import { connection } from "../config/database.js"

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
    const verifyIfExist = await connection.query(
      `
        SELECT FROM genre WHERE name=$1
        `,
      [genre.name]
    )
    if (verifyIfExist.rows[0]) {
      return res.status(409).send("This genre is already registered")
    }

    next()
  } catch (error) {
    return res.status(500).send(error)
  }
}
