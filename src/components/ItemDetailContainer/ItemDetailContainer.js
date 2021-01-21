import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { ItemDetail } from '../ItemDetail/ItemDetail'
import { FindObjectById } from '../../Utils/FindObjectById'
import { useParams } from 'react-router-dom'

export const ItemDetailContainer = () => {

  const [item, setItem] = useState()
  const {id} = useParams()

  // promise que va a buscar los datos del objeto por id a nuestra API (archivo estatico)
  const retrieveItem = new Promise((resolve, reject) => {
    const obj = FindObjectById(id)
    setTimeout(() =>
      obj ? resolve(obj) : reject(), 2000)
  })

  // carga de los datos del item al cargarse el componente
  useEffect(() => {
    retrieveItem
      .then((res) => {
        setItem(res)
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <Container>
      {item && <ItemDetail
        title={item.title}
        description={item.description}
        photo={item.pictureUrl}
        price={item.price} 
        stock={item.stock} />}
    </Container>
  )

}