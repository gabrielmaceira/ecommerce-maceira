import React from 'react'
import { Col } from 'react-bootstrap'

export const SinStock = ({stock, size}) => {
  if (Number(stock) <= 0) {
    return <Col xs={Number(size)} className='noStock p-0 m-0'> Sin stock </Col>
  }
  else {
    return null
  }
}
