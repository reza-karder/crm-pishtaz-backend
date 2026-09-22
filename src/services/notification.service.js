import UserModel from "../models/User.model.js";
import { getScheduledCallsOfDay, getUnresolvedCalls } from "../utils/date.utils.js";
import CallServices from "./call.service.js";

class NotificationServices {
	static async getAllNotifications(userId) {
		const calls = await CallServices.getAllOwnCalls(userId);
		const unresolvedCalls = getUnresolvedCalls(calls);
		const callsOfDay = getScheduledCallsOfDay(new Date(), calls);
		return { unresolvedCalls, callsOfDay };
	}
}

export default NotificationServices;
