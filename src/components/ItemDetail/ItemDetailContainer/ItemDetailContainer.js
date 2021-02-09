import React, { useState, useContext, useEffect, useLayoutEffect } from 'react'
import { Container } from 'react-bootstrap'
import { ItemDetail } from '../ItemDetail/ItemDetail'
import { CartContext } from '../../../context/CartContext'
import { getFirestore } from '../../../firebase'
import { useParams } from 'react-router-dom'
import { Loader } from '../../Loader/Loader'

export const ItemDetailContainer = () => {

  // manejo del estado
  const [item, setItem] = useState()
  const [show, setShow] = useState(false)
  const [quantity, setQuantity] = useState(0)

  const { addItem } = useContext(CartContext)

  // para mostrar el spinner si esta cargando
  const [isLoading, setIsLoading] = useState(false)

  // trayendo el id del item de los parametros de la url
  const { id } = useParams()

  // para mostrar/ocultar el mensaje de error
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  // agrega la cantidad seleccionada del item al carrito, y actualiza su cantidad
  const onAdd = (value) => {

    // agrega el item al carrito
    const addItemWorked = addItem(
      {
        id: id,
        title: item.title,
        description: item.description,
        photo: item.pictureUrl,
        price: item.price,
        stock: item.stock,
      },
      value)

    if (addItemWorked) {
      setQuantity(value)
    }
    else {
      handleShow()
    }
  }

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
      {/* uso de loader mientras carga los datos */}
      {isLoading ? <Loader /> :
        item ? <ItemDetail
          id={id}
          title={item.title}
          description={item.description}
          photo={item.pictureUrl}
          price={item.price}
          stock={item.stock}
          handleClose={handleClose}
          show={show}
          onAdd={onAdd}
          quantity={quantity}
        />
          :
          <h3 className='mt-5 deliFont'>No se encontró el item solicitado</h3>
      }
    </Container>
  )

}