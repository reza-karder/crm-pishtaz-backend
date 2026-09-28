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

		return sortCallsByDay(calls, normalizeStartDate(startDate), normalizeEndDate(endDate));
	}

	static async getCallsOfDay(employeeId, date) {
    const startDate = normalizeDate(date)
		let endDate = new Date(date);
		endDate.setDate(endDate.getDate() + 1)
    endDate = normalizeDate(endDate)

		const calls = await CallServices.getAllOwnCalls(employeeId, {
			date: { $gte: startDate, $lt: endDate },
		});

		return calls;
	}
}

export default CalendarService;
