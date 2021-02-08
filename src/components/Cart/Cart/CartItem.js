import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { XCircle } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
import './Cart.css'

export const CartItem = ({ id, photo, title, price, quantity, removeItem }) => {

  return <Col id={id} xs={12} className='d-flex align-items-center flex-column cartContainer mt-1 mb-2 '>
    <Row className='w-100 align-items-center'>
      <Col xs={1}>
        <XCircle as='button' className='removeItem' onClick={() => removeItem(id)} />
      </Col>
      <Col xs={3}>
        <Link to={`/item/${id}`}>
          <img src={photo} className='cartThumbnail' alt={title}></img>
        </Link>
      </Col>
      <Col xs={5} className='cartHeader'>
        {title} x {quantity}
      </Col>
      <Col className='cartPrice'>
        $ {price * quantity}
      </Col>
    </Row>
  </Col>

}