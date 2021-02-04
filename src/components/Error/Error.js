import React from 'react'
import { Row, Col } from 'react-bootstrap'
import './Error.css'

export const Error = ({ display, message }) => {

  return <Row style={{display: display}} >
    <Col className="formError" >
      {message}
    </Col>
  </Row>
}