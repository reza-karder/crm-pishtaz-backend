import Joi from "joi";

const CALL_STATUS = ["scheduled", "done", "rejected"];

const createCallValidator = Joi.object({
  notes: Joi.string().optional(),
  status: Joi.string().required().valid(...CALL_STATUS),
  customer: Joi.string().required(),
  scheduledAt: Joi.date().optional(),
  doneAt: Joi.date().optional(),
})

export {
  createCallValidator
}