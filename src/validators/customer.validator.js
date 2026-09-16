import Joi from "joi";

const PHONE_REGEX = /^09\d{9}$/;
const CALL_STATUS = ["scheduled", "done", "rejected", "unanswered"];
const CUSTOMER_STATUS = ["active", "cold"]

const callValidator = Joi.object({
	notes: Joi.string().optional().allow(""),
	status: Joi.string()
		.valid(...CALL_STATUS)
		.required(),
	date: Joi.date().required(),
  _id: Joi.string().optional()
});

const productValidator = Joi.object({
  type: Joi.string().required().valid("purchased", "potential"),
  price: Joi.number().optional().allow(""),
  intentionScore: Joi.number().valid(1,2,3,4,5),
  quantity: Joi.number().integer(),
  _id: Joi.string().optional()
})

const createCustomerValidator = Joi.object({
	name: Joi.string().required(),
	phonePrimary: Joi.string().required().regex(PHONE_REGEX),
	phoneSecondary: Joi.string().optional().allow("").regex(PHONE_REGEX),
	email: Joi.string().required().allow("").email(),
	notes: Joi.string().optional().allow(""),
	address: Joi.string().optional().allow(""),
	job: Joi.string().optional(),
  status: Joi.string().optional().valid(...CUSTOMER_STATUS),
	calls: Joi.array().required().items(callValidator),
  products: Joi.array().required().items(productValidator)
});

const updateCustomerValidator = Joi.object({
	name: Joi.string().optional(),
	phonePrimary: Joi.string().optional().regex(PHONE_REGEX),
	phoneSecondary: Joi.string().optional().allow("").regex(PHONE_REGEX),
	email: Joi.string().optional().allow("").email(),
	notes: Joi.string().optional().allow(""),
	address: Joi.string().optional().allow(""),
	job: Joi.string().optional(),
  status: Joi.string().optional().valid(...CUSTOMER_STATUS),
	calls: Joi.array().optional().items(callValidator),
  products: Joi.array().optional().items(productValidator)
});

const transferCustomerValidator = Joi.object({
  customerId: Joi.string().required(),
  destinationEmployeeId: Joi.string().required()
})

export {
	createCustomerValidator,
	updateCustomerValidator,
  transferCustomerValidator
};
