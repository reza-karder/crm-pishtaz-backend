import CallModel from "../models/Call.model.js";
import CustomerModel from "../models/Customer.model.js";
import UserModel from "../models/User.model.js";
import { sortCallsByMonth } from "../utils/stats.utils.js";

class StatsServices {
	static async getStats() {
		const callDateStartRange = new Date();
		const callDateEndRange = new Date();
		callDateStartRange.setMonth(callDateStartRange.getMonth() - 4);
		callDateStartRange.setDate(1);
		callDateStartRange.setHours(0, 0, 0, 0);

		const callsCount = await CallModel.countDocuments({ status: "done" });
		const customersCount = await CustomerModel.countDocuments();
		const employees = await UserModel.find({ status: "active", role: "employee" }).populate({
			path: "customers",
			select: ["customers"],
      populate: "calls",
      select: ["status"]
		});
		const doneCalls = await CallModel.find({
			date: { $gte: callDateStartRange, $lte: callDateEndRange },
			status: "done",
		});
		const sortedCalls = sortCallsByMonth(doneCalls);

		return {
			callsCount,
			customersCount,
			activeEmployeesCount: employees.length,
			employees,
			calls: sortedCalls,
		};
	}
}

export default StatsServices;
