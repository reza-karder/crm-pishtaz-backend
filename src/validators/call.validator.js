import Joi from "joi";

const CALL_STATUS = ["scheduled", "done", "rejected"];

const updateCallValidator = Joi.object({
	notes: Joi.string().optional().allow("").trim(),
	status: Joi.string()
		.optional()
		.valid(...CALL_STATUS)
		.trim(),
	customer: Joi.string().optional().trim(),
	date: Joi.string().optional(),
});

export { updateCallValidator };
