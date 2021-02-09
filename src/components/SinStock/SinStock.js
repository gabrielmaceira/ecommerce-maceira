import React from 'react'
import { Col } from 'react-bootstrap'

export const SinStock = ({stock, size}) => {
  // display de cartel de falta de stock si el stock = 0
  if (Number(stock) <= 0) {
    return <Col xs={Number(size)} className='noStock m-auto'> Sin stock </Col>
  }
  else {
    return null
  }
}
