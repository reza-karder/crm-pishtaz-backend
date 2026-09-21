const DAY_IN_MILISECONDS = (1000 * 60 * 60 * 24)

// returns array of array each array reperesents day of month 
// with calls inside it
function sortCallsByDay(calls, startDate, endDate) {
  const normalizedStart = normalizeDate(startDate);
  const normalizedEnd = normalizeDate(endDate);
  
  const totalDays = Math.round((normalizedEnd - normalizedStart) / DAY_IN_MILISECONDS) + 1;
  const sortedCalls = Array.from({ length: totalDays }, () => [])

  calls.forEach((call) => {
    const normalizedCallDate = normalizeDate(call.date)
    const dayIndex = Math.floor((normalizedCallDate - normalizedStart) / DAY_IN_MILISECONDS)  - 1;
    sortedCalls[dayIndex].push(call)
  })

  return sortedCalls
}

function normalizeDate(entry) {
  const date = new Date(entry)
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0)
}

function normalizeEndDate(entry) {
  const date = new Date(entry)
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 2, 0, 0, 0)
}

function normalizeStartDate(entry) {
  const date = new Date(entry)
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - 2, 0, 0, 0)
}

export {sortCallsByDay, normalizeDate, normalizeEndDate, normalizeStartDate}