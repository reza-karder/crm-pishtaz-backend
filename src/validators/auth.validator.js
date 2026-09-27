import Joi from "joi";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const signinValidator = Joi.object({
	email: Joi.string().regex(EMAIL_REGEX).required().trim(),
	password: Joi.string().required().trim(),
});

export { signinValidator };
