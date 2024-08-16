function isNonEmptyObject(obj) {
  return obj && typeof obj === "object" && Object.keys(obj).length > 0;
}

function adjustDates(arrivalDate, endDate) {
  // Set arrival time to 4 PM
  const adjustedArrivalDate = new Date(arrivalDate);
  adjustedArrivalDate.setHours(16, 0, 0, 0); // 4 PM
  // console.log(adjustedArrivalDate);

  // Set end time to 12 PM (noon)
  const adjustedEndDate = new Date(endDate);
  adjustedEndDate.setHours(12, 0, 0, 0); // 12 PM
  // console.log(adjustedEndDate);

  return { adjustedArrivalDate, adjustedEndDate };
}

function transformArrayToPostgRESTSyntax(array) {
  if (!Array.isArray(array) || array.length === 0) {
    return "()";
  }

  const formattedArray = array.map((value) => `${value}`).join(", ");
  return `(${formattedArray})`;
}

function calculateNights(startDate, endDate) {
  // Parse the dates
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Calculate the difference in time
  const diffTime = end - start;

  // Calculate the difference in days
  const diffDays = diffTime / (1000 * 60 * 60 * 24);

  // Return the number of nights
  return Math.ceil(diffDays);
}

export {
  isNonEmptyObject,
  adjustDates,
  transformArrayToPostgRESTSyntax,
  calculateNights,
};
