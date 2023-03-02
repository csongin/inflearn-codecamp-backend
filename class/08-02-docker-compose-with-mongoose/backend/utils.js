export function getToday() {
  const newDate = new Date();
  const yyyy = newDate.getFullYear();
  const mm = newDate.getMonth() + 1;
  const dd = newDate.getDate();
  const today = `${yyyy}-${mm}-${dd}`;
  return today;
}
