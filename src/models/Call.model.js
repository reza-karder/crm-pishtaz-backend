import mongoose from "mongoose";

const STATUS = ["scheduled", "done", "rejected"];

const CallSchema = mongoose.Schema(
	{
		notes: { type: String },
		status: { type: String, enum: STATUS, default: "scheduled" },
		customer: { type: mongoose.Types.ObjectId, ref: "Customer", required: true },
		date: { type: Date, required: true },
	},
	{ timestamps: true },
);

const CallModel = mongoose.model("Call", CallSchema)

export default CallModel