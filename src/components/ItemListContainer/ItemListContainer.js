import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import './ItemListContainer.css'

export const ItemListContainer = ({ greeting }) => {

  return (
    <Container fluid>
    <Row className='greetBack'>
      <Col className='greetHome slide-animate '>
        {greeting}
      </Col>
    </Row>
    </Container>
  )

}