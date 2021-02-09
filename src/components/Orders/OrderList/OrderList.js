import React, { useState } from 'react'
import { Order } from '../Order/Order'
import { Container, Accordion } from 'react-bootstrap'

export const OrderList = ({ orders, userData }) => {

  // para maneja el acordeon de ordenes
  const [activeKey, setActiveKey] = useState(orders[0].orderId)
  
  const handleEvent = (value) => {
    setActiveKey(value)
  }

  return (<Container>
    <Accordion activeKey={activeKey}>
      {orders !== undefined &&
        orders.map((order) => {
          return <Order
            key={order.orderId}
            id={order.orderId}
            items={order.items}
            total={order.total}
            date={order.date}
            handleEvent={handleEvent}
            userData={userData}
          />
        })
      }
    </Accordion>
  </Container>)

}