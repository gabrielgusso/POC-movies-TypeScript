import { connection } from "../config/database.js"
import { QueryResult } from "pg"
import { Platform } from "../protocols/protocols.js"

export async function listPlatforms(): Promise<QueryResult<Platform>> {
  return await connection.query(`SELECT * FROM platform`)
}

export async function insertPlatiform(platform: Platform): Promise<QueryResult> {
    return await connection.query(
        `INSERT INTO platform (name) VALUES ($1)`,[platform.name]
    )
  }