import { toFloatFixed } from './util.svc'

export const rangeAlgo = (weight, range, rate) => {
  if (range.length < 1) return 0
  return toFloatFixed(Math.ceil((range.find(item =>
    item.BeginRange <= weight && item.EndRange >= weight
  ).Price * rate)), 2)
}

export const mathAlgo = (weight, fw, fwp, cw, cwp) => {
  if (weight < fw) return fwp
  return toFloatFixed((fwp + (Math.ceil((weight - fw) / cw) * cwp)), 2)
}
