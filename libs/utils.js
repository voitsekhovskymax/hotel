export function datePickerFormat(date) {
  let dateArray = date.split('-');
  let date_output = new Date(dateArray[2], dateArray[1] - 1, parseInt(dateArray[0]) + 1).toISOString().substr(0, 10);
  return date_output;
}

