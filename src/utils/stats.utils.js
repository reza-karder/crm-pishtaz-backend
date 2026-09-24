// returns array of array. each array represents the month with its calls
function sortCallsByMonth(calls) {
	const sortedCalls = Array.from({ length: 4 }, (_, index) => {
		const currentDate = new Date();
		currentDate.setMonth(currentDate.getMonth() - index);
		return calls.filter((call) => new Date(call.date).getMonth() === currentDate.getMonth());
	});
  return sortedCalls.reverse()
}

export { sortCallsByMonth }