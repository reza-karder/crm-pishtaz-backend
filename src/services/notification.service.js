import UserModel from "../models/User.model.js";
import { getCallsOfDay, getMissedScheduledCalls } from "../utils/date.utils.js";
import CallServices from "./call.service.js";

class NotificationServices {
	static async getAllNotifications(userId) {
    const calls = await CallServices.getAllCalls(userId)
    const missedCalls = getMissedScheduledCalls(calls)
    const callsOfDay = getCallsOfDay(calls)
    return { missedCalls, callsOfDay }
	}
}

export default NotificationServices;
