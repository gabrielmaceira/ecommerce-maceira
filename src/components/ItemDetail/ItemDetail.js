import React, { useState } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { ItemCount } from '../ItemCount/ItemCount'
import {Link} from 'react-router-dom'
import './ItemDetail.css'

export const ItemDetail = ({ title, description, photo, price, stock }) => {

  const [quantity, setQuantity] = useState(0)

  const onAdd = (value) => {
    setQuantity(value)
  }

  return (<Row className='mt-3 itemDetail text-center justify-content-around'>
    <Col md={4} lg={5}>
      <img src={photo} className='itemDetailPhoto' alt={title}></img>
    </Col>
    <Col md={7} lg={6} className='d-flex align-items-start flex-column itemDetailData'>
      <Row>
        <Col xs={12} className='itemDetailTitle'>
          {title}
        </Col>
        <Col xs={12} className='itemDetailDescription text-muted'>
          {description}
        </Col>
      </Row>
      <Row className='w-100 ml-auto mr-auto'>
        <Col xs={12} className='itemDetailPrice mt-4 mb-4'>
          $ {price}
        </Col>
      </Row>
      <Row className='justify-content-center mt-auto w-100 ml-auto mr-auto'>
        {/*oculta el ItemCount si no se agrego el item al carrito*/}
        {quantity === 0 && <Col xs={12}>
          <ItemCount stock={stock} initial='1' onAdd={onAdd} />
        </Col>}
        {/*oculta el ItemCount si no se agrego el item al carrito*/}
        {quantity > 0 && <Col xs={12}>
          <Button variant='outline-danger btn-block mt-1 mb-4' id='onAdd' 
          as={Link} to={`/cart`}>
            Terminar mi compra
            </Button>
        </Col>}
      </Row>
    </Col>
  </Row>)
}