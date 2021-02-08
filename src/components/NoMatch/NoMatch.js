import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

export const NoMatch = () => {
  return (
    <Container fluid className='text-center'>
      <Row>
        <Col xs={12} className='deliFont mt-5 text-left'>
          <h3>No se encontró lo que estabas buscando. Revisá la URL provista.</h3>
          </Col>
      </Row>
    </Container>
  )
}