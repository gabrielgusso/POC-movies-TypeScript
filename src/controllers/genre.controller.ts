import { Response, Request } from "express"
import { Genre } from "../protocols/protocols.js"
import { listGenres, insertGenre } from "../repositories/genre.repository.js"

export async function genreGetController(req: Request, res: Response) {
  try {
    const result = await listGenres()
    return res.status(200).send(result.rows)
  } catch (error) {
    res.status(500).send(error)
  }
}

export async function genrePostController(req: Request, res: Response) {
  const genre = req.body as Genre

  try {
    const result = await insertGenre(genre)
    res.status(201).send(`Genre inserted ${result.rowCount}`)
  } catch (error) {
    res.status(500).send(error)
  }
}
