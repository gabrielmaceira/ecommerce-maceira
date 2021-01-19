import { objList } from '../constants/ObjectList'

// encuentra un item en la lista estatica por id

export const FindObjectById = (id) => {

  let foundObj = undefined
  let i = 0

  while (i < objList.length && foundObj === undefined) {
    if (objList[i].id === id) {
      foundObj = objList[i]
    }
    i++
  }

  return foundObj

}