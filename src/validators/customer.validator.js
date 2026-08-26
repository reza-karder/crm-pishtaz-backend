import Joi from "joi";

const PHONE_REGEX = /^09\d{9}$/;
const CALL_STATUS = ["scheduled", "done", "rejected"];

const potentialProductValidator = Joi.object({
	product: Joi.string().required(),
	intentionScore: Joi.number().valid(1, 2, 3, 4, 5).required(),
});

const purchasedProductValidator = Joi.object({
	product: Joi.string().required(),
	price: Joi.number().optional(),
	date: Joi.date().optional(),
});

const callValidator = Joi.object({
	notes: Joi.string().optional(),
	status: Joi.string().valid(...CALL_STATUS).required(),
	scheduledAt: Joi.date().optional(),
	doneAt: Joi.date().optional(),
});

const createUCustomerValidator = Joi.object({
	name: Joi.string().required(),
	phonePrimary: Joi.string().required().regex(PHONE_REGEX),
	phoneSecondary: Joi.string().optional().regex(PHONE_REGEX),
	email: Joi.string().required().email(),
	notes: Joi.string().optional(),
	address: Joi.string().optional(),
	job: Joi.string().optional(),
	potentialProducts: Joi.array().required().items(potentialProductValidator),
	purchasedProducts: Joi.array().required().items(purchasedProductValidator),
	calls: Joi.array().required().items(callValidator),
});

export { createUCustomerValidator };
