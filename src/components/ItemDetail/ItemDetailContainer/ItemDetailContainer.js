import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Container } from 'react-bootstrap'
import { ItemDetail } from '../ItemDetail/ItemDetail'
import { getFirestore } from '../../../firebase'
import { useParams } from 'react-router-dom'
import { Loader } from '../../Loader/Loader'

export const ItemDetailContainer = () => {

  const [item, setItem] = useState()
  const [show, setShow] = useState(false)

  // para mostrar el spinner si esta cargando
  const [isLoading, setIsLoading] = useState(false)

  const { id } = useParams()

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  // llenado de lista de items "items" al montarse el componente
  useEffect(() => {
    setIsLoading(true)

    // carga de firestore
    const db = getFirestore()
    const itemCollection = db.collection("items")
    const itemData = itemCollection.doc(id)

    itemData.get().then((doc) => {
      if (!doc.exists) {
        console.log("El item no existe")
        return
      }
      setItem({ id: doc.id, ...doc.data() })
    }).catch((error) => {
      console.log("Error trayendo los resultados", error)
    }).finally(() => {
      setIsLoading(false)
    })
  }, [id])

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  });

  return (
    <Container className='text-center'>
      {isLoading ? <Loader /> :
        item ? <ItemDetail
          id={id}
          title={item.title}
          description={item.description}
          photo={item.pictureUrl}
          price={item.price}
          stock={item.stock}
          handleClose={handleClose}
          handleShow={handleShow}
          show={show}
          />
          :
          <h3 className='mt-5 deliFont'>No se encontró el item solicitado</h3>
      }
    </Container>
  )

}