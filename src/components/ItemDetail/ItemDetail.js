import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { ItemCount } from '../ItemCount/ItemCount'
import './ItemDetail.css'

export const ItemDetail = ({ title, description, photo, price }) => {
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
      <Row className='w-100'>
        <Col xs={12} className='itemDetailPrice mt-4'>
          $ {price}
        </Col>
      </Row>
      <Row className='justify-content-center mt-auto w-100'>
        <Col sm={8} xs={12}>
          <ItemCount stock='5' initial='1' />
        </Col>
      </Row>
    </Col>
  </Row>)
}