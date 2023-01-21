import { Response, Request } from "express"
import { connection } from "../config/database.js"
import { Genre } from "../protocols/protocols.js"

export async function genreGetController(req: Request, res: Response) {
  try {
    const { rows } = await connection.query(`
        SELECT * FROM genre`)

    return res.status(200).send(rows)
  } catch (error) {
    res.status(500).send(error)
  }
}

export async function genrePostController(req: Request, res: Response) {
  const genre = req.body as Genre

  try {
    await connection.query(
      `
    INSERT INTO genre (name) VALUES ($1)
    `,
      [genre.name]
    )

    res.sendStatus(201)
  } catch (error) {
    res.status(500).send(error)
  }
}
