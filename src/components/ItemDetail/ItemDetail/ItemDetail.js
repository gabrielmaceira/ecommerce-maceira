import React from 'react'
import { Row, Col, Button, Modal } from 'react-bootstrap'
import { ItemCount } from '../ItemCount/ItemCount'
import { Link } from 'react-router-dom'
import { SinStock } from '../../SinStock/SinStock'
import './ItemDetail.css'

export const ItemDetail = ({ id, title, description, photo, price, stock, 
  handleClose, show, onAdd, quantity }) => {

  return (<Row className='mt-3 itemDetail text-center justify-content-around' key={id} id={id}>
    <Col md={5} lg={4}>
      <img src={photo} className='itemDetailPhoto' alt={title}></img>
    </Col>
    <Col md={7} lg={6} className='d-flex align-items-start flex-column itemDetailData'>
      <Row>
        <Col xs={12} className='itemDetailTitle mt-1'>
          {title}
        </Col>
        <Col xs={12} className='itemDetailDescription text-muted mt-1'>
          {description}
        </Col>
      </Row>
      <Row className='w-100 ml-auto mr-auto'>
        <Col xs={12} className='itemDetailPrice mt-4 mb-4'>
          $ {price}
        </Col>
      </Row>
      <Row className='justify-content-center mt-auto w-100 ml-auto mr-auto'>
        {/*muestra el ItemCount si no se agrego el item al carrito*/}
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
        <Row className='justify-content-between mt-auto w-100 ml-auto mr-auto'>
          <Col xs={5} className='text-muted text-left mt-auto'>
            Stock: {stock} unidades
        </Col>
          <SinStock stock={stock} size='5' />
        </Row>
      </Row>
    </Col>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Problema de stock</Modal.Title>
      </Modal.Header>
      <Modal.Body>Parece que estás queriendo agregar a tu carrito más items de los que tenemos en stock.
        Reducí la cantidad y probá de nuevo</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Entendido
          </Button>
      </Modal.Footer>
    </Modal>
  </Row>)
}