import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { ItemCount } from '../ItemCount/ItemCount'
import { ItemList } from '../ItemList/ItemList'
import './ItemListContainer.css'

export const ItemListContainer = ({ greeting }) => {

  return (
    <Container fluid>
      <Row className='greetBack'>
        <Row className='w-100' >
          <Col className='greetHome slide-animate opacity-zero center'>
            {greeting}
          </Col>
        </Row>
        {/*         <Row className='w-100'>
          <Col className='greetHome slide-animate-2 opacity-zero'>
            "MAS TEXTO"
            </Col>
        </Row> */}
      </Row>
{/*       <Row className='align-center'>
        <ItemCount stock='0' initial='1' />
      </Row> */}

      <ItemList />

    </Container>
  )

}