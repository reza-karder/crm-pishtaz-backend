import Joi from "joi";

const PHONE_REGEX = /^09\d{9}$/;
const CALL_STATUS = ["scheduled", "done", "rejected", "unanswered"];
const CUSTOMER_STATUS = ["active", "cold"];

const VALID_QUERIES = {
	sort: ["all", "newest", "oldest", "name"],
	status: ["all", "active", "cold"],
	date: ["all", "24h", "week", "month"],
	call: ["all", "scheduled", "none"],
};

const callValidator = Joi.object({
	notes: Joi.string().optional().allow("").trim(),
	status: Joi.string()
		.valid(...CALL_STATUS)
		.required()
		.trim(),
	date: Joi.date().required(),
	_id: Joi.string().optional().trim(),
});

const productValidator = Joi.object({
	type: Joi.string().required().valid("purchased", "potential"),
	price: Joi.number().optional().allow(""),
	intentionScore: Joi.number().valid(1, 2, 3, 4, 5),
	quantity: Joi.number().integer(),
	_id: Joi.string().optional(),
});

const createCustomerValidator = Joi.object({
	name: Joi.string().required().trim(),
	phonePrimary: Joi.string().required().regex(PHONE_REGEX).trim(),
	phoneSecondary: Joi.string().optional().allow("").regex(PHONE_REGEX).trim(),
	email: Joi.string().required().allow("").email().trim(),
	notes: Joi.string().optional().allow("").trim(),
	address: Joi.string().optional().allow("").trim(),
	job: Joi.string().optional(),
	status: Joi.string()
		.optional()
		.valid(...CUSTOMER_STATUS),
	calls: Joi.array().required().items(callValidator),
	products: Joi.array().required().items(productValidator),
});

const updateCustomerValidator = Joi.object({
	name: Joi.string().optional().trim(),
	phonePrimary: Joi.string().optional().regex(PHONE_REGEX).trim(),
	phoneSecondary: Joi.string().optional().allow("").regex(PHONE_REGEX).trim(),
	email: Joi.string().optional().allow("").email().trim(),
	notes: Joi.string().optional().allow("").trim(),
	address: Joi.string().optional().allow("").trim(),
	job: Joi.string().optional(),
	status: Joi.string()
		.optional()
		.valid(...CUSTOMER_STATUS),
	calls: Joi.array().optional().items(callValidator),
	products: Joi.array().optional().items(productValidator),
});

const transferCustomerValidator = Joi.object({
	customerId: Joi.string().required(),
	destinationEmployeeId: Joi.string().required(),
});

const customerQueryParamsValidator = Joi.object({
	search: Joi.string().optional().allow("").trim(),
	sort: Joi.string()
		.optional()
		.valid(...VALID_QUERIES.sort)
		.trim(),
	purchasedProduct: Joi.string().optional().trim(),
	potentialProduct: Joi.string().optional().trim(),
	job: Joi.string().optional().trim(),
	status: Joi.string()
		.optional()
		.valid(...VALID_QUERIES.status)
		.trim(),
	date: Joi.string()
		.optional()
		.valid(...VALID_QUERIES.date),
	call: Joi.string()
		.optional()
		.valid(...VALID_QUERIES.call)
		.trim(),
	page: Joi.string().optional(),
});

const deleteManyCustomersValidator = Joi.object({
	mode: Joi.string().required().valid("all", "explicit").trim(),
	excludedIds: Joi.array().optional(),
	selectedIds: Joi.array().optional(),
});

export {
	createCustomerValidator,
	updateCustomerValidator,
	transferCustomerValidator,
	customerQueryParamsValidator,
	deleteManyCustomersValidator,
};
