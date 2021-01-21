import React from 'react'
import { Row, Col } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import './Item.css'

export const Item = ({ id, title, price, pictureUrl }) => {

  return <Col xs={12} sm={5} lg={3} id={id} className='thumbContainer'>
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
      <Row>
        <Col className='thumbPrice pt-2 text-muted'>
          $ {price}
        </Col>
      </Row>
    </Link>
  </Col>

}