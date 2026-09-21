import CalendarService from "../services/calendar.service.js";

class CalendarController {
	static async getCallsInRange(req, res) {
		const { startDate, endDate } = req.params;
		const calls = await CalendarService.getCallsInRange(req.session.userId, startDate, endDate);
		return res.status(200).send({ success: true, calls });
	}

	static async getCallsOfDay(req, res) {
		const calls = await CalendarService.getCallsOfDay(req.session.userId, req.params.date);
		return res.status(200).send({ success: true, calls });
	}
}

export default CalendarController;
