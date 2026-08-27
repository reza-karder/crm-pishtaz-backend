import Joi from "joi";

const PHONE_REGEX = /^09\d{9}$/;
const CALL_STATUS = ["scheduled", "done", "rejected"];
const CUSTOMER_STATUS = ["active", "cold"]

const potentialProductValidator = Joi.object({
	product: Joi.string().required(),
	intentionScore: Joi.number().valid(1, 2, 3, 4, 5).required(),
});

const purchasedProductValidator = Joi.object({
	product: Joi.string().required(),
	price: Joi.number().optional(),
  count: Joi.number().min(1),
	date: Joi.date().optional(),
});

const callValidator = Joi.object({
	notes: Joi.string().optional(),
	status: Joi.string()
		.valid(...CALL_STATUS)
		.required(),
	scheduledAt: Joi.date().optional(),
	doneAt: Joi.date().optional(),
});

const createCustomerValidator = Joi.object({
	name: Joi.string().required(),
	phonePrimary: Joi.string().required().regex(PHONE_REGEX),
	phoneSecondary: Joi.string().optional().regex(PHONE_REGEX),
	email: Joi.string().required().email(),
	notes: Joi.string().optional(),
	address: Joi.string().optional(),
	job: Joi.string().optional(),
  status: Joi.string().optional().valid(...CUSTOMER_STATUS),
	potentialProducts: Joi.array().required().items(potentialProductValidator),
	purchasedProducts: Joi.array().required().items(purchasedProductValidator),
	calls: Joi.array().required().items(callValidator),
});

const updateCustomerValidator = Joi.object({
	name: Joi.string(),
	phonePrimary: Joi.string().regex(PHONE_REGEX),
	phoneSecondary: Joi.string().optional().regex(PHONE_REGEX),
	email: Joi.string().email(),
	notes: Joi.string().optional(),
	address: Joi.string().optional(),
  status: Joi.string().optional().valid(...CUSTOMER_STATUS),
	job: Joi.string().optional(),
});

const addPurchasedProductValidator = Joi.object({
	product: Joi.string().required(),
	price: Joi.number().optional(),
  count: Joi.number().min(1),
	date: Joi.date().optional(),
});

const addPotentialProductValidator = Joi.object({
	product: Joi.string().required(),
	intentionScore: Joi.number().valid(1, 2, 3, 4, 5).required(),
});

const updatePurchasedProductValidator = Joi.object({
  product: Joi.string().optional(),
  count: Joi.number().min(1),
	intentionScore: Joi.number().valid(1, 2, 3, 4, 5).optional(),
});

const updatePotentialProductValidator = Joi.object({
  product: Joi.string(),
  intentionScore: Joi.number().valid(1, 2, 3, 4, 5),
});

const transferCustomerValidator = Joi.object({
  customerId: Joi.string().required(),
  destinationEmployeeId: Joi.string().required()
})

export {
	createCustomerValidator,
	updateCustomerValidator,
	addPurchasedProductValidator,
	addPotentialProductValidator,
	updatePurchasedProductValidator,
  updatePotentialProductValidator,
  transferCustomerValidator
};
