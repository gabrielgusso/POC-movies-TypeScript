import { Response, Request } from "express"
import { Movie } from "../protocols/protocols.js"
import {
  listAllMovies,
  listAmountOfMovies,
  insertMovie,
  verifyIfExist,
  updatetMovieTrue,
  updatetMovieFalse,
  deleteMovie
} from "../repositories/movie.repository.js"

export async function movieGetController(req: Request, res: Response) {
  try {
    const result = await listAllMovies()
    return res.status(200).send(result.rows)
  } catch (error) {
    res.status(500).send(error)
  }
}

export async function totalMovieGetController(req: Request, res: Response) {
  try {
    const result = await listAmountOfMovies()
    return res.status(200).send(result.rows[0])
  } catch (error) {
    res.status(500).send(error)
  }
}

export async function moviePostController(req: Request, res: Response) {
  const movie = req.body as Movie

  try {
    const result = await insertMovie(movie)

    res.status(201).send(`Movie inserted ${result.rowCount}`)
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
    const movieExist = await verifyIfExist(id)
    if (!movieExist.rows[0]) {
      return res.status(404).send("Movie not found")
    }

    if (movieExist.rows[0].watchedStatus === false) {
      await updatetMovieTrue(id)
    } else {
      await updatetMovieFalse(id)
    }

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
    const movieExist = await verifyIfExist(id)
    if (!movieExist.rows[0]) {
      return res.status(404).send("Movie not found")
    }

    await deleteMovie(id)

    res.sendStatus(200)
  } catch (error) {
    res.status(500).send(error)
  }
}
