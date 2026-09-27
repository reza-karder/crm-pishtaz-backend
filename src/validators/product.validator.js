import Joi from "joi";

const createProductValidator = Joi.object({
  title: Joi.string().required().trim(),
  price: Joi.number().optional()
})

const updateProductValidator = Joi.object({
  title: Joi.string().optional().trim(),
  price: Joi.number().optional()
})

const productsQueryValidator = Joi.object({
  search: Joi.string().trim().optional().allow(""),
  page: Joi.optional()
})

export {
  createProductValidator,
  updateProductValidator,
  productsQueryValidator
}