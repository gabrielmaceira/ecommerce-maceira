import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import './Footer.css'
export const Footer = () => {

  return <Container fluid className='footer footer-font'>
    <Row className='pt-5 pb-5 pl-md-3 pr-md-3'>
      <Col xs={12} sm={6} className='footer-main-text'>
        DeliCupcakes
      </Col>
      <Col xs={12} sm={6} >
        <Row>
          <Col xs={12}>
            Contacto
          </Col>
          <Col xs={12}>
            <i className="fas fa-phone-alt"></i>  +54 11 4 864 1360
          </Col>
          <Col xs={12}>
            <i className="far fa-envelope"></i>  info@delicupcakes.com.ar
          </Col>
        </Row>
        <Row>
          <Col>
            <a href="http://www.facebook.com" target="_blank" rel="noopener noreferrer"
              className="btn-social btn-facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="http://www.instagram.com" target="_blank" rel="noopener noreferrer"
              className="btn-social btn-instagram"><i className="fab fa-instagram"></i></a>
            <a href="http://www.twitter.com" target="_blank" rel="noopener noreferrer"
              className="btn-social btn-twitter"><i className="fab fa-twitter"></i></a>
          </Col>
        </Row>
      </Col>
      <Col xs={12} className='mt-4 footer-divider'></Col>
      <Col xs={12} className='text-muted mt-4'>
        Gabriel Maceira Alvarez 2021 &copy;
      </Col>
    </Row>
  </Container>

}