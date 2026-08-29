import Joi from "joi";

const createJobValidator = Joi.object({
	title: Joi.string().required(),
});

export { createJobValidator };
