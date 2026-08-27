import { populate } from "dotenv";
import CallModel from "../models/Call.model.js";
import UserModel from "../models/User.model.js";

class CallServices {
	static async createMany(callsData) {
		const calls = await CallModel.insertMany(callsData);
		return calls;
	}

	static async getAllOwnCalls(employeeId) {
		const employee = await UserModel.findById(employeeId).populate({
			path: "customers",
			select: "calls",
			populate: {
				path: "calls",
				populate: "customer",
			},
		});

		// get call from user doc
		const calls = employee.customers.map((customer) => customer.calls).flat();
		return calls;
	}
}

export default CallServices;
