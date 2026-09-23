import CallModel from "../models/Call.model.js";
import {
	normalizeDate,
	normalizeEndDate,
	normalizeStartDate,
	sortCallsByDay,
} from "../utils/calendar.utils.js";
import CallServices from "./call.service.js";

class CalendarService {
	static async getCallsInRange(employeeId, startDate, endDate) {
		const calls = await CallServices.getAllOwnCalls(employeeId, {
			status: "scheduled",
			date: { $gte: normalizeStartDate(startDate), $lte: normalizeEndDate(endDate) },
		});

		return sortCallsByDay(calls, startDate, endDate);
	}

	static async getCallsOfDay(employeeId, date) {
		const calls = await CallServices.getAllOwnCalls(employeeId, {
			date: { $gte: normalizeStartDate(date), $lte: normalizeEndDate(date) },
		});

		return calls;
	}
}

export default CalendarService;
