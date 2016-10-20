export default Vue => {
  Vue.validator('email', val =>
    /^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/i.test(val)
  )
  Vue.validator('telephone',
    val => /^(0|86|17951)?(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/.test(val)
  )
  Vue.validator('idcard',
    val => /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(val)
  )
  Vue.validator('numeric',
    val => {
      if (!val || val === '') return true
      return /^[-+]?[0-9]+$/.test(val)
    }
  )
}
