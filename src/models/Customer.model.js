import mongoose from "mongoose";

const INTENTION_SCORES = [1,2,3,4,5]
const CUSTOMER_STATUS = ["active", "cold"]

const PurchasedProductSchema = mongoose.Schema({
	product: { type: mongoose.Types.ObjectId, ref: "Product", required: true },
  price: { type: Number },
  date: { type: Date }
});

const PotentialProductSchema = mongoose.Schema({
  product: { type: mongoose.Types.ObjectId, ref: "Product", required: true },
  intentionScore: { type: Number, enum: INTENTION_SCORES, required: true},
})

const CustomerSchema = mongoose.Schema(
	{
		name: { type: String, required: true },
		phonePrimary: { type: String, required: true, unique: true },
		phoneSecondary: { type: String, unique: true },
		email: { type: String, unique: true, lowercase: true },
		notes: { type: String },
		address: { type: String },
		job: { type: mongoose.Types.ObjectId, ref: "Job" },
		potentialProducts: [PotentialProductSchema],
    purchasedProducts: [PurchasedProductSchema],
    status: { type: String, enum: CUSTOMER_STATUS, default: "active" },
    calls: [{ type: mongoose.Types.ObjectId, ref: "Call" }]
	},
	{ timestamps: true },
);

const CustomerModel = mongoose.model("Customer", CustomerSchema);

export default CustomerModel;
