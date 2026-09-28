const DAY_IN_MILISECONDS = (1000 * 60 * 60 * 24)

// returns array of array each array reperesents day of month 
// with calls inside it
function sortCallsByDay(calls, startDate, endDate) {  
  const totalDays = Math.ceil((endDate - startDate) / DAY_IN_MILISECONDS) + 2;
  const sortedCalls = Array.from({ length: totalDays }, () => [])

  calls.forEach((call) => {
    const normalizedCallDate = normalizeDate(call.date)
    const dayIndex = Math.floor((normalizedCallDate - startDate) / DAY_IN_MILISECONDS)  + 1;
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
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0)
}

function normalizeStartDate(entry) {
  const date = new Date(entry)
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1, 0, 0, 0)
}

export {sortCallsByDay, normalizeDate, normalizeEndDate, normalizeStartDate}