import React, { useState, useEffect, useContext } from 'react'
import { Container } from 'react-bootstrap'
import { OrderList } from '../OrderList/OrderList'
import { Loader } from '../../Loader/Loader'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../../../context/UserContext'
import { getFirestore } from '../../../firebase'
import './OrderListContainer.css'

export const OrderListContainer = () => {

  // lista de ordenes que es llenada por la promise
  const [orders, setOrders] = useState(undefined)

  // para mostrar el spinner si esta cargando
  const [isLoading, setIsLoading] = useState(false)

  // traer los datos del usuario logueado
  const { userData } = useContext(UserContext)

  const history = useHistory()

  // llenado de lista de items "items" al montarse el componente
  useEffect(() => {

    if (userData) {
      setIsLoading(true)
      const date = new Date()

      // carga de firestore
      const db = getFirestore()
      const orderCollection = db.collection("orders").where("buyer", "==", userData.id).where("date", "<=", date)
      const filterOrders = orderCollection.orderBy("date", "desc")

      filterOrders.get().then((querySnapshot) => {
        if (querySnapshot.size === 0) {
          console.log("Sin resultados")
        }
        setOrders(querySnapshot.docs.map(doc => {
          const fullData = { orderId: doc.id, ...doc.data() }
          return fullData
        }))
      }).catch((error) => {
        console.log("Error trayendo los resultados", error)
      }).finally(() => {
        setIsLoading(false)
      })
    }
    else {
      alert("Debés estar logueado para ver tus órdenes")
      history.push('/')
    }
  }, [userData, history])

  return (
    <Container fluid className='text-center'>
      {isLoading ? <Loader /> :
        orders && orders.length > 0 && userData ? <OrderList orders={orders} userData={userData} /> :
          <h3 className='mt-5 deliFont'>Todavía no tenés órdenes en el sistema</h3>
      }
    </Container>
  )

}