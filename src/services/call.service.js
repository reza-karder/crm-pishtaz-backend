import { populate } from "dotenv";
import CallModel from "../models/Call.model.js";
import UserModel from "../models/User.model.js";
import CustomerModel from "../models/Customer.model.js";

class CallServices {
	static async createMany(callsData) {
		const calls = await CallModel.insertMany(callsData);
		return calls;
	}

	static async getAllOwnCalls(employeeId) {
		const calls = await CallModel.find({ employee: employeeId }).populate({ path: "customer" });
		return calls;
	}

	static async updateCall(callId, callData) {
		const call = await CallModel.findByIdAndUpdate(callId, callData, { returnDocument: "after" });
		return call;
	}

	static async deleteCall(callId) {
		const call = await CallModel.findByIdAndDelete(callId);
		await CustomerModel.findByIdAndUpdate(call.customer, { $pull: { calls: callId } });
	}
}

export default CallServices;
