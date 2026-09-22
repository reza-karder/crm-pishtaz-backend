import mongoose from "mongoose";

const ROLES = ["employee", "admin"];
const STATUS = ["active", "ban"]

const UserSchema = mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		customers: [{ type: mongoose.Types.ObjectId, ref: "Customer" }],
		role: { type: String, enum: ROLES, default: "employee" },
    phone: { type: String, unique: true },
    status: { type: String, enum: STATUS, default: "active" }
	},
	{ timestamps: true },
);

UserSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.password;
    return ret;
  },
});

const UserModel = mongoose.model("User", UserSchema)

export default UserModel