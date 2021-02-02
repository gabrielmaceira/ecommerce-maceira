import React, { useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import { CartItem } from './CartItem'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const Cart = () => {

  const { itemsInCart, cartTotal, removeItem } = useContext(CartContext)

  return <Container className='d-flex align-items-center flex-column'>
    {itemsInCart.length > 0 ?
      <React.Fragment>
        <Col xs={12} sm={8}>
          <h2>Items en el carrito</h2>
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
        <Col xs={12} sm={8} className='bgTotal cartTotal'>Total: $ {cartTotal}</Col>
      </React.Fragment>
      :
      <Row className='mt-4 text-center'>
        <Col>
          <h2 className='deliFont'>No hay items en tu carrito</h2>
          <Button as={Link} to={`/`} variant='outline-primary' className='deliFont'>Empeza a comprar</Button>
        </Col>
      </Row>
    }
  </Container>

}