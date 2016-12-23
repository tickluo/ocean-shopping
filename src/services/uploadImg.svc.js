export const isUploadSupported = () => {
  const elem = document.createElement('input')
  if (navigator.userAgent
      .match(/(Android (1.0|1.1|1.5|1.6|2.0|2.1))|(Windows Phone (OS 7|8.0))|(XBLWP)|(ZuneWP)|(w(eb)?OSBrowser)|(webOS)|(Kindle\/(1.0|2.0|2.5|3.0))/)) {
    return false
  }
  elem.type = 'file'
  return !elem.disabled && window.File && window.FileReader && window.FormData
}

export const checkFile = file => !file.type || /^image\//i.test(file.type)

export const readFile = file => {
  const reader = new FileReader()
  return new Promise((resolve, reject) => {
    reader.onloadend = () => {
      let dataURL = reader.result
      let formData = new FormData()

      const fileType = file.type
      const maxWidth = 800
      const maxHeight = 800

      const image = new Image()
      image.src = dataURL

      image.onload = () => {
        const width = image.width
        const height = image.height
        const shouldResize = (width > maxWidth) || (height > maxHeight)
        if (!shouldResize) {
          formData.append('imageData', dataURL)
          return resolve({ base64: dataURL, type: fileType, formData })
        }
        let newWidth
        let newHeight
        if (width > height) {
          newHeight = height * (maxWidth / width)
          newWidth = maxWidth
        } else {
          newWidth = width * (maxHeight / height)
          newHeight = maxHeight
        }
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        canvas.width = newWidth
        canvas.height = newHeight
        context.drawImage(image, 0, 0, width, height, 0, 0, newWidth, newHeight)
        dataURL = canvas.toDataURL(fileType)
        formData.append('imageData', dataURL)
        return resolve({ base64: dataURL, type: fileType, formData })
      }
      image.onerror = () => {
        return reject(`加载图片文件失败`)
      }
    }
    reader.onerror = () => {
      return reject(`加载图片文件失败`)
    }
    reader.readAsDataURL(file)
  })
}
