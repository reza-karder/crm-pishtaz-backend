import Joi from "joi";

const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/

const updateUserValidator = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().email(),
  phone: Joi.string().required().regex(/^09\d{9}$/)
})

const updatePasswordValidator = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string().required().regex(PASSWORD_REGEX)
})

export { 
  updateUserValidator,
  updatePasswordValidator
}