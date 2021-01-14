import React, { useState, useEffect } from 'react'
import { Item } from '../Item/Item'
import { objList } from '../../constants/ObjectList'
import { Row } from 'react-bootstrap'

export const ItemList = () => {

  // lista de items que es llenada por la promise
  const [items, setItems] = useState(undefined)

  // promise que va a buscar la lista de items/objetos a nuestra API (archivo estatico)
  const retrieveList = new Promise((resolve, reject) => {
    setTimeout(() =>
      objList.length > 0 ? resolve(objList) : reject("No hay datos"), 2000)
  })

  // llenado de lista de items "items" al montarse el componente
  useEffect(() => {
    retrieveList
      .then((res) => {
        setItems(res)
      })
      .catch((err) => console.log(err))
  })

  return (<Row className='justify-content-between ml-md-4 mr-md-4 mt-4'>
    {items !== undefined &&
      items.map(item => {
        return <Item
          key={item.id}
          id={item.id}
          title={item.title}
          description={item.description}
          price={item.price}
          pictureUrl={item.pictureUrl} />
      })
    }
  </Row>)

}