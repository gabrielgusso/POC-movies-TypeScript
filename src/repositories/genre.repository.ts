import { connection } from "../config/database.js"
import { QueryResult } from "pg"
import { Genre, Movie } from "../protocols/protocols.js"

export async function listGenres(): Promise<QueryResult<Genre>> {
  return await connection.query(`SELECT * FROM genre`)
}

export async function insertGenre(genre: Genre): Promise<QueryResult> {
  return await connection.query(`INSERT INTO genre (name) VALUES ($1)`, [
    genre.name,
  ])
}

export async function verifyIfExistGenre(genre: Genre): Promise<QueryResult<Genre>> {
  return await connection.query(
    `SELECT * FROM genre WHERE name=$1`, [genre.name])
}

export async function verifyIfExistGenremId(movie: Movie): Promise<QueryResult> {
  return await connection.query(
    `SELECT * FROM genre WHERE id=$1`,
      [movie.genreId]
  )
}