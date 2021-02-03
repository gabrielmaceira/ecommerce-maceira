import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import './About.css'

export const About = ({ greeting }) => {
  return (
    <Container fluid className='text-center'>
      <Row className='greetBack center text-center'>
        <Row>
          <Col className='greetHome slide-animate opacity-zero'>
            {greeting}
          </Col>
        </Row>
      </Row>
      <Row>
        <Col xs={12} className='aboutFont'><span className='logoFont'>DeliCupcakes</span> es una idea "original" de 
        Gabriel Maceira Alvarez, como parte de un curso de React en CoderHouse.</Col>
        <Col xs={12} className='aboutFont'>Los precios pueden parecer muy baratos o muy caros porque fueron puestos 
        relativamente al azar.</Col>
      </Row>
    </Container>
  )
}