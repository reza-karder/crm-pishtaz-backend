import Joi from "joi";

const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const createUserValidator = Joi.object({
	name: Joi.string().required().trim(),
	email: Joi.string().required().regex(EMAIL_REGEX).trim(),
	role: Joi.string().optional().valid("employee", "admin"),
  status: Joi.string().required(),
	phone: Joi.string()
		.required()
		.regex(/^09\d{9}$/)
		.trim()
    .allow(""),
	password: Joi.string().required().regex(PASSWORD_REGEX),
});

const updateUserValidator = Joi.object({
	name: Joi.string().optional().trim(),
	email: Joi.string().optional().regex(EMAIL_REGEX).trim(),
  role: Joi.string().optional().valid("employee", "admin"),
  status: Joi.string().optional().allow(""),
	phone: Joi.string()
		.optional()
		.regex(/^09\d{9}$/)
		.allow("")
		.trim(),
	password: Joi.string().optional().regex(PASSWORD_REGEX).trim(),
});

const updatePasswordValidator = Joi.object({
	currentPassword: Joi.string().required().trim(),
	newPassword: Joi.string().required().regex(PASSWORD_REGEX).trim(),
});

const deleteUserValidator = Joi.object({
	substituteEmployeeId: Joi.string().required(),
});

export { updateUserValidator, updatePasswordValidator, createUserValidator, deleteUserValidator };
