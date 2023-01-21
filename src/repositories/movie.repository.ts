import { connection } from "../config/database.js"
import { QueryResult } from "pg"
import { Movie, TotalMovies, MovieEntity, Watched } from "../protocols/protocols.js"

export async function listAllMovies(): Promise<QueryResult<MovieEntity>> {
  return await connection.query(`
SELECT m.id, m.name, p.name as platform, g.name as genre, m."watchedStatus" 
FROM movies m
JOIN platform p
ON m."platformId" = p.id
JOIN genre g
ON m."genreId" = g.id
ORDER BY m.id
`)
}

export async function listAmountOfMovies(): Promise<QueryResult<TotalMovies>> {
  return await connection.query(`
    SELECT COUNT(id) as "totalMovies" FROM movies
    `)
}

export async function insertMovie(movie:Movie): Promise<QueryResult> {
  return await connection.query(
    `INSERT INTO movies (name, "platformId", "genreId") VALUES ($1, $2, $3)`,
    [movie.name, movie.platformId, movie.genreId]
  )
}

export async function verifyIfExist(id:string): Promise<QueryResult<Watched>> {
  return await connection.query(`SELECT "watchedStatus" FROM movies WHERE id=$1`, [id])
}

export async function updatetMovieTrue(id:string): Promise<QueryResult> {
    return await connection.query(
        `UPDATE movies SET "watchedStatus" = true WHERE id = $1`,
        [id]
    )
}

export async function updatetMovieFalse(id:string): Promise<QueryResult> {
    return await connection.query(
        `UPDATE movies SET "watchedStatus" = false WHERE id = $1`,
        [id]
    )
}

export async function deleteMovie(id:string): Promise<QueryResult> {
    return await connection.query(`DELETE FROM movies WHERE id = $1`, [id])
}

