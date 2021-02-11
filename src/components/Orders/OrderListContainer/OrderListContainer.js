import React, { useState, useEffect, useContext } from 'react'
import { Container } from 'react-bootstrap'
import { OrderList } from '../OrderList/OrderList'
import { Loader } from '../../Loader/Loader'
import { ModalError } from '../../ModalError/ModalError'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../../../context/UserContext'
import { getFirestore } from '../../../firebase'
import './OrderListContainer.css'

export const OrderListContainer = () => {

  // lista de ordenes que es llenada por la promise
  const [orders, setOrders] = useState(undefined)

  // para mostrar el spinner si esta cargando
  const [isLoading, setIsLoading] = useState(false)

  // manejo de estado
  const [alertData, setAlertData] = useState({ show: false, alert: {}})

  // traer los datos del usuario logueado
  const { userData } = useContext(UserContext)

  // para redirigir al usuario si no esta logueado
  const history = useHistory()

  // llenado de lista de ordenes al cargar el componente, ordenadas por fecha
  // para ordenar por fecha se tuvo que hacer un indice en firestore (gracias a un mensaje de error en la consola)
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
      setAlertData({
        show: true,
        alert: { message: "Debés estar logueado para ver tus órdenes", title: "Error de credenciales" }
      })
    }
  }, [userData, history])

  return (
    <Container fluid className='text-center'>
      <ModalError alert={alertData.alert} show={alertData.show}
        handleClose={() => { setAlertData({show: false, alert:{}}); history.push('/') }} />
      {isLoading ? <Loader /> :
        orders && orders.length > 0 && userData ? <OrderList orders={orders} userData={userData} /> :
          <h3 className='mt-5 deliFont'>Todavía no tenés órdenes en el sistema</h3>
      }
    </Container>
  )

}