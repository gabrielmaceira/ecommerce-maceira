import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Item.css'

export const Item = ({ id, title, price, pictureUrl }) => {

  return <Col xs={6} sm={4} lg={3} id={id} className='thumbContainer d-flex align-items-start flex-column '>
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
        {/*       <Col xs={12} className='thumbDescription text-muted'>
        {description}
      </Col> */}
      </Row>
    </Link>
    <Row className='mt-auto w-100'>
      <Col className='thumbPrice pt-2'>
        $ {price}
      </Col>
    </Row>
  </Col>

}