import CallModel from "../models/Call.model.js";
import {
	normalizeDate,
	normalizeEndDate,
	normalizeStartDate,
	sortCallsByDay,
} from "../utils/calendar.utils.js";

class CalendarService {
	static async getCallsInRange(employeeId, startDate, endDate) {
		const calls = await CallModel.find({
			employee: employeeId,
			status: "scheduled",
			date: { $gte: normalizeStartDate(startDate), $lte: normalizeEndDate(endDate) },
		});

		return sortCallsByDay(calls, startDate, endDate);
	}

	static async getCallsOfDay(employeeId, date) {
		const calls = await CallModel.find({
			employee: employeeId,
			date: { $gte: normalizeStartDate(date), $lte: normalizeEndDate(date) },
		}).populate({ path: "customer", select: ["name", "_id"] });
    return calls
	}
}

export default CalendarService;
