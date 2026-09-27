import Joi from "joi";

const createJobValidator = Joi.object({
	title: Joi.string().required().trim(),
});

const updateJobValidator = Joi.object({
	title: Joi.string().optional().trim(),
});

const jobsQueryValidator = Joi.object({
	search: Joi.string().trim().optional().allow(""),
	page: Joi.optional(),
});

export { createJobValidator, updateJobValidator, jobsQueryValidator };
