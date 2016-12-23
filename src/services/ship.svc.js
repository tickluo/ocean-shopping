export const rangeAlgo = (weight, range, rate) =>
  Math.ceil((range.find(item =>
    item.BeginRange <= weight && item.EndRange >= weight
  ).Price * rate)).toFixed(2)

export const mathAlgo = (weight, fw, fwp, cw, cwp, rate) => {
  if (weight < fw) return (fwp * rate)
  return fwp + (Math.ceil((weight - fw) / cw) * cwp)
}
