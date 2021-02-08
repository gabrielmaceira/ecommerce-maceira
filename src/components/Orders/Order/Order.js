import React, { useContext } from 'react'
import { Card, Button, Accordion, Col, Container, Row } from 'react-bootstrap'
import { UserContext } from '../../../context/UserContext'
import dateformat from 'dateformat'

export const Order = ({ id, items, total, date, handleEvent }) => {

  // traer los datos del usuario logueado
  const { userData } = useContext(UserContext)

  //para usar el index del map para el Accordion
  let formattedDate = new Date(date.seconds * 1000)
  formattedDate = dateformat(formattedDate, "dd/mm/yyyy h:MM:ss TT")

  return (<Card>
    <Card.Header className='text-left deliFont'>
      <Accordion.Toggle as={Button} variant="link" className="accordionHeader"
        eventKey={id} onClick={() => handleEvent()}>
        Orden {id} - {formattedDate}
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey={id}>
      <Card.Body>
        <Container>
          <Row className='mt-1'>
            <Col xs={12} className='text-left deliFont'>
              Orden {id} - {formattedDate}
            </Col>
            <Col xs={12} className='text-left deliFont'>
              <Col className='pl-0 mt-2'><b>Envío a:</b> {userData.firstName} {userData.lastName}</Col>
              <Col className='pl-0'><b>Dirección:</b> {userData.address}</Col>
              <Col className='pl-0'><b>Teléfono:</b> {userData.phone}</Col>
            </Col>
            <Col xs={12} className='mt-3'>
              {items.map(item => {
                console.log(item.item.photo)
                return <React.Fragment key={item.item.id}>
                  <Row className='align-items-center mb-2'>
                    <Col xs={4} md={5}>
                      <img src={item.item.photo} className='cartThumbnail ' alt={item.id}></img>
                    </Col>
                    <Col className='m-0 p-0 text-left'>
                      <Col className='deliFont' xs={8} md={12}>
                        {item.item.title} x {item.qy}
                      </Col>
                      <Col className='deliFont text-right' xs={12} md={12}>
                        $ {item.item.price * item.qy}
                      </Col>
                    </Col>
                  </Row>
                </React.Fragment>
              })
              }
            </Col>
            <Col xs={12} className='bgTotal cartTotal'>Total: $ {total}</Col>
            {/*       {orders !== undefined &&
        orders.map(order => {
          return <Order
            key={order.orderId}
            id={order.orderId}
            items={order.items}
            total={order.total}
            date={order.date}
          />
        })
      } */}
          </Row>
        </Container>
      </Card.Body>
    </Accordion.Collapse>
  </Card>
  )
}