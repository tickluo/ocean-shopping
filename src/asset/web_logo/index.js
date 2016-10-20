const modules = require.context('./', true, /^\.\/.*\.(png|jpe?g)$/)

export default modules.keys().reduce((module, key) => {
  module[key.replace(/(^\.\/)/g, '')
    .replace(/@/g, '_')] = modules(key)
  return module
}, {})
