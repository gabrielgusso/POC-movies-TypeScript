import { Response, Request } from "express"
import { connection } from "../config/database.js"
import { Movie } from "../protocols/protocols.js"

export async function movieGetController(req: Request, res: Response) {
  try {
    const { rows } = await connection.query(`
        SELECT m.name, p.name as platform, g.name as genre, m."watchedStatus" 
        FROM movies m
        JOIN platform p
        ON m."platformId" = p.id
        JOIN genre g
        ON m."genreId" = g.id
        `)

    return res.status(200).send(rows)
  } catch (error) {
    res.status(500).send(error)
  }
}

export async function totalMovieGetController(req: Request, res: Response) {
  try {
    const { rows } = await connection.query(`
        SELECT COUNT(id) as "totalMovies" FROM movies
        `)

    return res.status(200).send(rows[0])
  } catch (error) {
    res.status(500).send(error)
  }
}

export async function moviePostController(req: Request, res: Response) {
  const movie = req.body as Movie

  try {
    await connection.query(
      `
    INSERT INTO movies (name, "platformId", "genreId") VALUES ($1, $2, $3)
    `,
      [movie.name, movie.platformId, movie.genreId]
    )

    res.sendStatus(201)
  } catch (error) {
    res.status(500).send(error)
  }
}

export async function movieUpdateController(req: Request, res: Response) {
  const id = req.params.id
  const isNum = /^\d+$/.test(id)
  if (!isNum) {
    res.sendStatus(400)
    return
  }
  try {
    const verifyIfExist = await connection.query(
      `SELECT FROM movies WHERE id=$1`,
      [id]
    )
    if (!verifyIfExist.rows[0]) {
      return res.status(404).send("Movie not found")
    }

    await connection.query(
      `UPDATE movies SET "watchedStatus" = true WHERE id = $1`,
      [id]
    )
    res.sendStatus(200)
  } catch (error) {
    res.status(500).send(error)
  }
}

export async function movieDeleteController(req: Request, res: Response) {
  const id = req.params.id
  const isNum = /^\d+$/.test(id)
  if (!isNum) {
    res.sendStatus(400)
    return
  }
  try {
    const verifyIfExist = await connection.query(
      `SELECT FROM movies WHERE id=$1`,
      [id]
    )
    if (!verifyIfExist.rows[0]) {
      return res.status(404).send("Movie not found")
    }

    await connection.query(`DELETE FROM movies WHERE id = $1`, [id])
    res.sendStatus(200)
  } catch (error) {
    res.status(500).send(error)
  }
}
