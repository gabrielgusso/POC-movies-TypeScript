import { nameSchema } from "../schemas/movie.schema.js"
import { Request, Response, NextFunction } from "express"
import { Platform } from "../protocols/protocols.js"
import { verifyIfExistPlatform } from "../repositories/platform.repository.js"

export async function platformMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const platform = req.body as Platform

  const validation = nameSchema.validate(platform, { abortEarly: false })
  if (validation.error) {
    const error = validation.error.details.map((detail) => detail.message)
    return res.status(422).send(error)
  }

  try {
    const verify = await verifyIfExistPlatform(platform)
    if (verify.rows[0]) {
      return res.status(409).send("This platform is already registered")
    }

    next()
  } catch (error) {
    return res.status(500).send(error)
  }
}
