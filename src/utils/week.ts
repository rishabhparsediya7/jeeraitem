export function getWeek() {
  const date = new Date();
  let arr: Date[] = [];
  let monday;
  if (date.getDay() === 0) monday = date.getDate() - 6;
  else monday = date.getDate() - date.getDay();
  for (var i = 0; i < 7; i++) {
    const d = new Date(date.getFullYear(), date.getMonth(), i + monday);
    arr.push(d);
  }
  return arr;
}
