import Joi from "joi";

const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/

const createUserValidator = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().email(),
  role: Joi.string().optional().valid("employee", "admin"),
  phone: Joi.string().required().regex(/^09\d{9}$/),
  password: Joi.string().required().regex(PASSWORD_REGEX),
})

const updateUserValidator = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().optional().email(),
  phone: Joi.string().optional().regex(/^09\d{9}$/).allow(""),
  password: Joi.string().optional().regex(PASSWORD_REGEX),
})

const updatePasswordValidator = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string().required().regex(PASSWORD_REGEX)
})

const deleteUserValidator = Joi.object({
  substituteEmployeeId: Joi.string().required()
})

export { 
  updateUserValidator,
  updatePasswordValidator,
  createUserValidator,
  deleteUserValidator
}