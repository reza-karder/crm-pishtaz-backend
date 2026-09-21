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
    console.log({calls});

		return sortCallsByDay(calls, startDate, endDate);
	}
}

export default CalendarService;
