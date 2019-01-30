export function toFixed(value, precision) {
  let val = parseFloat(value).toFixed(precision + 1)
  return val.substr(0, val.length - 1)
}
