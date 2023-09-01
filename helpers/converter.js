function getDayDate(dayName) {
  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  const today = new Date();

  const dayIndex = dayNames.indexOf(dayName.toLowerCase());
  const currentDayIndex = today.getDay(); 
  const daysToAdd = dayIndex - currentDayIndex;

  today.setDate(today.getDate() + daysToAdd);

  return today;
}

module.exports = getDayDate