import Joi from "joi";

const createProductValidator = Joi.object({
  title: Joi.string().required(),
  price: Joi.number().optional()
})

export {
  createProductValidator
}