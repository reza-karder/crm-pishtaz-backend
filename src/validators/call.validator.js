import Joi from "joi";

const CALL_STATUS = ["scheduled", "done", "rejected"];

const updateCallValidator = Joi.object({
  notes: Joi.string().optional().allow(""),
  status: Joi.string().optional().valid(...CALL_STATUS),
  customer: Joi.string().optional(),
  date: Joi.string().optional(),
})

export {
  updateCallValidator
}