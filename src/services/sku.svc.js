export const getDisableSku = (skuClass, currentSku, Skus) => {
  if (skuClass.length === 0) return []
  const indexMax = skuClass.length
  const disableSkuArray = []
  // TODO:this gonna to be optimized
  for (let i = 0; i < indexMax; i++) {
    const relativeSku = Skus.filter(item => {
      const temp = currentSku.PropIds.join(',').split(',')
      temp.splice(i, 1)
      let hasSelect = 0
      temp.forEach(selected => {
        if (item.PropIds.includes(selected)) hasSelect++
      })
      return hasSelect === temp.length
    })
    const rowTemp = []
    relativeSku.forEach(item => {
      const disTemp = item.PropIds[i].split(':')
      rowTemp.push(disTemp[1] * 1)
    })
    for (let j = 0, val = 0; j < skuClass[i].SkuProperties.length; j++) {
      if (rowTemp[j] || rowTemp[j] === 0) {
        const differ = rowTemp[j] - val
        if (differ !== 0) {
          for (let k = 0; k < differ; k++) {
            disableSkuArray.push(`${i}:${val + k}`)
          }
          val += (differ + 1)
        } else val++
      } else {
        disableSkuArray.push(`${i}:${val}`)
      }
    }
  }
  return disableSkuArray
}

export const genSkuModel = (skuClass) => {

}
