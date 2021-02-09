import React, { useContext, useLayoutEffect, useState } from 'react'
import { CartContext } from '../../../context/CartContext'
import { UserContext } from '../../../context/UserContext'
import { Cart } from '../Cart/Cart'
import { Loader } from '../../Loader/Loader'
import { ModalError } from '../../ModalError/ModalError'
import { useHistory } from 'react-router-dom'
import { getFirestore } from '../../../firebase'
import firebase from 'firebase/app'
import '@firebase/firestore'

export const CartContainer = () => {
  // llamada a contextos de carrito y usuario
  const { itemsInCart, cartTotal, removeItem, clear } = useContext(CartContext)
  const { userData } = useContext(UserContext)

  // para mostrar el spinner si esta cargando
  const [isLoading, setIsLoading] = useState(false)

  // mostrar mensajes de error o exito
  const [show, setShow] = useState(false)
  const [alert, setAlert] = useState("")
  const [purchaseComplete, setPurchaseComplete] = useState(false)

  // para redirigir a la pantalla de ordenes
  const history = useHistory()

  // mover la pagina hacia arriba de todo en la carga
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  })

  // para redirigir a la pantalla de ordenes si la compra se realizo exitosamente
  const handleClose = () => {
    if (purchaseComplete) {
      return history.push('/orders')
    }
  }

  // insercion de la orden en la base de datos
  const sendOrder = () => {
    const db = getFirestore()
    const orderCollection = db.collection("orders")
    const itemsToUpdate = db.collection("items")
      .where(firebase.firestore.FieldPath.documentId(), "in", itemsInCart.map((item) => item.item.id))

    const newOrder = {
      buyer: userData.id,
      items: itemsInCart,
      date: firebase.firestore.Timestamp.fromDate(new Date()),
      total: cartTotal,
    }

    setIsLoading(true)

    const batch = db.batch()

    let outOfStock = []

    itemsToUpdate.get().then((docSnapshot) => {
      docSnapshot.docs.map((doc) => {
        // el idx/index me estaba trayendo datos erroneos, lo hago a mano
        let i = 0
        let found = undefined

        while (i < itemsInCart.length && found === undefined) {
          if (itemsInCart[i].item.id === doc.id) {
            found = i
          }
          i++
        }

        // si el item encontrado tiene stock suficiente lo agregar al batch update, sino a la lista de falta de stock
        if (doc.data().stock >= itemsInCart[found].qy) {
          batch.update(doc.ref, { stock: doc.data().stock - itemsInCart[found].qy })
        }
        else {
          outOfStock.push(itemsInCart[found])
        }
        return true
      }
      )

      // si hay algun item sin stock informa al usuario, sino actualiza el stock en la firestore y agrega la orden
      if (outOfStock.length > 0) {
        setAlert({message:"Algunos items ya no tienen stock. Revisá las cantidades.", title: "¡Hubo un problema!"})
        setShow(true)
      }
      else {
        batch.commit()

        orderCollection.add(newOrder).then(({ id }) => {
          setPurchaseComplete(true)
          setAlert({message:"¡Gracias por tu compra!", title: "Compra exitosa"})
          clear()
          setShow(true)
          
        }).catch(err => {
          console.log(err)
        }).finally(() => {
          setIsLoading(false)
        })

      }
    }).catch(err => console.log(err))
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (<React.Fragment>
    {isLoading ? <Loader className='text-center' /> : <Cart
      itemsInCart={itemsInCart}
      cartTotal={cartTotal}
      removeItem={removeItem}
      clear={clear}
      userData={userData}
      sendOrder={sendOrder}
    />}
    <ModalError alert={alert} show={show} handleClose={handleClose} />
  </React.Fragment>)
}
