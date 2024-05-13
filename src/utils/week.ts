export function getWeek() {
  const currentDate = new Date();
  const currentDayOfWeek = currentDate.getDay();
  const firstDayOfWeek = new Date(currentDate);
  const diff =
    currentDate.getDate() -
    currentDayOfWeek +
    (currentDayOfWeek === 0 ? -6 : 1);
  firstDayOfWeek.setDate(diff);

  const weekDates: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(firstDayOfWeek);
    date.setDate(firstDayOfWeek.getDate() + i);
    weekDates.push(date);
  }

  return weekDates;
}
