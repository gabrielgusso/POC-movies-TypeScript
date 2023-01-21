import { Response, Request } from "express"
import { connection } from "../config/database.js"
import { Platform } from "../protocols/protocols.js"

export async function platformGetController(req: Request, res: Response) {
  try {
    const { rows } = await connection.query(`
        SELECT * FROM platform`)

    return res.status(200).send(rows)
  } catch (error) {
    res.status(500).send(error)
  }
}

export async function platformPostController(req: Request, res: Response) {
  const platform = req.body as Platform

  try {
    await connection.query(
      `
    INSERT INTO platform (name) VALUES ($1)
    `,
      [platform.name]
    )

    res.sendStatus(201)
  } catch (error) {
    res.status(500).send(error)
  }
}
