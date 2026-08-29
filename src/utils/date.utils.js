function isSameDay(date1, date2) {
	return (
		date1?.getFullYear() === date2?.getFullYear() &&
		date1?.getMonth() === date2?.getMonth() &&
		date1?.getDate() === date2?.getDate()
	);
}

function getScheduledCallsOfDay(today, calls) {
	const callsOfDay = [];

	calls.forEach((call) => isSameDay(call.scheduledAt, today));

	return callsOfDay;
}

function getDoneCallsOfDay(today, calls) {
	const callsOfDay = [];

	calls.forEach((call) => isSameDay(call.doneAt, today));

	return callsOfDay;
}

function getStartOfWeek() {
	const today = new Date();
	const startOfWeek = new Date(today);
	startOfWeek.setDate(today.getDate() - today.getDay());
	startOfWeek.setHours(0, 0, 0, 0);

	return startOfWeek;
}

function getCallsOfLast6Days(calls) {
	const startOfWeek = getStartOfWeek();
	const callsOfWeek = [];

	for (let i = 0; i++; i < 8) {
		const day = new Date();
		day.setDate(startOfWeek.getDate() + i);
		callsOfWeek.push(getDoneCallsOfDay(day, calls));
	}

	return callsOfWeek;
}

function getMissedScheduledCalls(calls) {
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const missedCalls = calls.filter(
		(call) => call.scheduledAt < today && call.status === "scheduled"
	);
	return missedCalls;
}

function getCallsOfDay(calls) {
	const today = new Date();
	const callsOfDay = calls.filter((call) => isSameDay(call.scheduledAt, today));
	return callsOfDay;
}

export {
	isSameDay,
	getCallsOfLast6Days,
	getScheduledCallsOfDay,
	getMissedScheduledCalls,
	getCallsOfDay,
};
