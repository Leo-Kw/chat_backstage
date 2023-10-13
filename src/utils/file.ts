import * as fs from 'fs'

export const checkDirAndCreate = (filePath: string) => {
  const pathArr = filePath.split('/')
  let checkPath = '.'
  let item: string
  for (item of pathArr) {
    checkPath += `/${item}`
    if (!fs.existsSync(checkPath)) {
      fs.mkdirSync(checkPath)
    }
  }
}

export const removeFile = (filePath: string) => {
  if (fs.existsSync(filePath)) {
    fs.unlink(filePath, (err) => {
      if (err) throw err
    })
  }
}

export const removeFileDir = (filePath: string) => {
  if (fs.existsSync(filePath)) {
    fs.rmdir(filePath, (err) => {
      if (err) throw err
    })
  }
}
