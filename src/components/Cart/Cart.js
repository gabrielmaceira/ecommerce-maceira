import React, { useContext, useLayoutEffect, useState } from 'react'
import { CartContext } from '../../context/CartContext'
import { UserContext } from '../../context/UserContext'
import { CartItem } from './CartItem'
import { LoginForm } from '../LoginForm/LoginForm'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Cart.css'

export const Cart = () => {

  const { itemsInCart, cartTotal, removeItem } = useContext(CartContext)
  const { userData } = useContext(UserContext)

  const [show, setShow] = useState(false)

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  });

  return <Container className='d-flex flex-column align-items-center mt-5'>
    {itemsInCart.length > 0 ?
      <React.Fragment>
        <Row className='w-100'>
          <Col xs={12} sm={7}>
            <Col xs={12}>
              <h2 className='deliFont'>Items en el carrito</h2>
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
          <Col xs={12} sm={5} className='d-flex flex-column deliFont cartContactData'>
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
                    <Button className='btn btn-primary btn-block'>Completar pedido</Button>
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
          <Button as={Link} to={`/`} variant='outline-primary' className='deliFont'>Empeza a comprar</Button>
        </Col>
      </Row>
    }
    <LoginForm show={show} handleClose={() => setShow(false)} loginState={false} />
  </Container>

}