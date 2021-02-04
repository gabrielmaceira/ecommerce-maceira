import React, { useContext, useLayoutEffect, useState } from 'react'
import { CartContext } from '../../context/CartContext'
import { UserContext } from '../../context/UserContext'
import { CartItem } from './CartItem'
import { LoginForm } from '../LoginForm/LoginForm'
import { Loader } from '../Loader/Loader'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { getFirestore } from '../../firebase'
import firebase from 'firebase/app'
import '@firebase/firestore'
import './Cart.css'

export const Cart = () => {

  const { itemsInCart, cartTotal, removeItem, clear } = useContext(CartContext)
  const { userData } = useContext(UserContext)

  const [show, setShow] = useState(false)

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
          console.log(doc.data().title, doc.data().stock, itemsInCart[found].qy)
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

  return <Container className='d-flex flex-column align-items-center mt-3'>
    {isLoading ? <Loader /> :
      itemsInCart.length > 0 ?
        <React.Fragment>
          <Row className='w-100'>
            <Col xs={12} md={7}>
              <Col xs={12}>
                <h2 className='deliFont cartHeader'>Items en el carrito</h2>
              </Col>
              {itemsInCart.map(e => {
                return <CartItem
                  key={e.item.id}
                  id={e.item.id}
                  photo={e.item.photo}
                  title={e.item.title}
                  price={e.item.price}
                  quantity={e.qy}
                  removeItem={removeItem}
                />
              })}
              <Col xs={12} className='bgTotal cartTotal'>Total: $ {cartTotal}</Col>
            </Col>
            <Col xs={12} md={5} className='d-flex flex-column deliFont cartContactData'>
              {userData !== undefined ?
                <React.Fragment>
                  <Row>
                    <Col xs={12}>
                      Envío para {userData.firstName} {userData.lastName}
                    </Col>
                    <Col xs={12}>
                      Direccion: {userData.address}
                    </Col>
                    <Col xs={12}>
                      Teléfono de contacto: {userData.phone}
                    </Col>
                  </Row>
                  <Row className='mt-auto'>
                    <Col xs={12} className='mt-auto'>
                      <Button className='btn btn-primary btn-block' onClick={() => sendOrder()}>Completar pedido</Button>
                    </Col>
                  </Row>
                </React.Fragment>
                :
                <React.Fragment>
                  <Col>
                    Para completar la compra por favor
            <button className='loginLink' onClick={() => setShow(true)}><b>registrate</b></button>
                  </Col>
                  <Col>
                    ¿Ya tenés una cuenta? Hacé login
                </Col>
                </React.Fragment>
              }
            </Col>
          </Row>
        </React.Fragment>
        :
        <Row className='mt-4 text-center'>
          <Col>
            <h2 className='deliFont'>No hay items en tu carrito</h2>
            <Button as={Link} to={`/`} variant='outline-primary' className='deliFont'>Empezá a comprar</Button>
          </Col>
        </Row>
    }
    <LoginForm show={show} handleClose={() => setShow(false)} loginState={false} />
  </Container>

}