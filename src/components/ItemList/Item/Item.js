import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { SinStock } from '../../SinStock/SinStock'
import { Link } from 'react-router-dom'
import './Item.css'

export const Item = ({ id, title, price, pictureUrl, stock }) => {

  return <Col xs={6} sm={4} lg={3} id={id} className='thumbContainer d-flex align-items-start flex-column'>
      <Link to={`/item/${id}`}>
        <Row >
          <Col>
            <img src={pictureUrl} className='itemThumbnail' alt={title}></img>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className='thumbTitle'>
            {title}
          </Col>
        </Row>
      </Link>
    <Row className='mt-auto w-100 justify-content-center m-0 p-0'>
      <Col xs={12} className='thumbPrice pt-2'>
        $ {price}
      </Col>
      {/* muestra el componente SinStock si el stock es 0, para informar al usuario antes de abrir el detalle */}
      <SinStock stock={stock} size='8'/>
    </Row>
  </Col>

}