import Joi from "joi";

const signinValidator = Joi.object({
	email: Joi.string().email().required().trim(),
	password: Joi.string().required().trim(),
});

export { signinValidator };
