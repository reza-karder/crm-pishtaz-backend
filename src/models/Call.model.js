import mongoose from "mongoose";

const STATUS = ["scheduled", "done", "rejected"];

const CallSchema = mongoose.Schema(
	{
		notes: { type: String },
		status: { type: String, enum: STATUS, default: "scheduled" },
		customer: { type: mongoose.Types.ObjectId, ref: "Customer", required: true },
		employee: { type: mongoose.Types.ObjectId, ref: "User", required: true },
		notes: { type: String },
		scheduledAt: { type: Date, required: true },
		doneAt: { type: Date },
	},
	{ timestamps: true },
);

const CallModel = mongoose.model("Call", CallSchema)

export default CallModel