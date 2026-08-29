import Joi from "joi";

const createJobValidator = Joi.object({
	title: Joi.string().required(),
});

const updateJobValidator = Joi.object({
	title: Joi.string().optional(),
});

export { createJobValidator, updateJobValidator };
