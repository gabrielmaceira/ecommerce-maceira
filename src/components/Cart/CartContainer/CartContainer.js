import React, { useContext, useLayoutEffect, useState } from 'react'
import { CartContext } from '../../../context/CartContext'
import { UserContext } from '../../../context/UserContext'
import { Cart } from '../Cart/Cart'
import { Loader } from '../../Loader/Loader'
import { useHistory } from 'react-router-dom'
import { getFirestore } from '../../../firebase'
import firebase from 'firebase/app'
import '@firebase/firestore'

export const CartContainer = () => {

  const { itemsInCart, cartTotal, removeItem, clear } = useContext(CartContext)
  const { userData } = useContext(UserContext)

  // para mostrar el spinner si esta cargando
  const [isLoading, setIsLoading] = useState(false)

  // para redirigir a la pantalla de ordenes
  const history = useHistory()

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  })

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

        if (doc.data().stock >= itemsInCart[found].qy) {
          batch.update(doc.ref, { stock: doc.data().stock - itemsInCart[found].qy })
        }
        else {
          outOfStock.push(itemsInCart[found])
        }
        return true
      }
      )

      if (outOfStock.length > 0) {
        alert("Algunos items ya no tienen stock. Revisá las cantidades.")
      }
      else {
        batch.commit()
      }
    }).catch(err => console.log(err))
      .finally(() => {
        setIsLoading(false)
      })


    orderCollection.add(newOrder).then(({ id }) => {
      alert("¡Gracias por tu compra!")
      clear()
      return history.push('/orders')
    }).catch(err => {
      console.log(err)
    }).finally(() => {
      setIsLoading(false)
    })
  }

  return (<React.Fragment> 
    {isLoading ? <Loader /> : <Cart
    itemsInCart={itemsInCart}
    cartTotal={cartTotal}
    removeItem={removeItem}
    clear={clear}
    userData={userData}
    sendOrder={sendOrder}
  />}
  </React.Fragment>)
}
