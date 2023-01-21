import { connection } from "../config/database.js"
import { QueryResult } from "pg"
import { Genre } from "../protocols/protocols.js"

export async function listGenres(): Promise<QueryResult<Genre>> {
  return await connection.query(`SELECT * FROM genre`)
}

export async function insertGenre(genre: Genre): Promise<QueryResult> {
    return await connection.query(
        `INSERT INTO genre (name) VALUES ($1)`,[genre.name]
    )
  }