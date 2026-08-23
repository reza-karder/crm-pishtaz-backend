import Joi from "joi";

const updateUserValidator = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().email(),
  phone: Joi.string().required().regex(/^09\d{9}$/)
})

export {
  updateUserValidator
}