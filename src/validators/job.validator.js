import Joi from "joi";

const createJobValidator = Joi.object({
	title: Joi.string().required().trim(),
});

const updateJobValidator = Joi.object({
	title: Joi.string().optional().trim(),
});

export { createJobValidator, updateJobValidator };
