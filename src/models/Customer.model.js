import mongoose from "mongoose";

const INTENTION_SCORES = [1, 2, 3, 4, 5];
const CUSTOMER_STATUS = ["active", "cold"];
const PRODUCT_TYPES = ["purchased", "potential"];

const ProductSchema = mongoose.Schema(
	{
		product: { type: mongoose.Types.ObjectId, ref: "Product", required: true },
		type: { type: String, enum: PRODUCT_TYPES, required: true },
		intentionScore: { type: Number, enum: INTENTION_SCORES },
		price: { type: Number },
    quantity: { type: Number }
	},
	{ timestamps: true }
);

const CustomerSchema = mongoose.Schema(
	{
		name: { type: String, required: true },
		phonePrimary: { type: String, required: true, unique: true },
		phoneSecondary: { type: String },
		email: { type: String, lowercase: true },
		notes: { type: String },
		address: { type: String },
		job: { type: mongoose.Types.ObjectId, ref: "Job" },
		products: [ProductSchema],
		status: { type: String, enum: CUSTOMER_STATUS, default: "active" },
		employee: { type: mongoose.Types.ObjectId, ref: "User" },
		calls: [{ type: mongoose.Types.ObjectId, ref: "Call" }],
	},
	{ timestamps: true }
);

CustomerSchema.index(
  { phoneSecondary: 1 },
  {
    unique: true,
    partialFilterExpression: {
      phoneSecondary: { $type: "string", $ne: "" }
    }
  }
);

CustomerSchema.index(
  { email: 1 },
  {
    unique: true,
    partialFilterExpression: {
      email: { $type: "string", $ne: "" }
    }
  }
);

const CustomerModel = mongoose.model("Customer", CustomerSchema);

export default CustomerModel;
