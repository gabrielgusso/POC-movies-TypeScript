import Joi from "joi"

export const movieSchema = Joi.object({
  name: Joi.string().required().min(2),
  platformId: Joi.number().required(),
  genreId: Joi.number().required(),
})

export const nameSchema = Joi.object({
  name: Joi.string().required().min(2),
})
