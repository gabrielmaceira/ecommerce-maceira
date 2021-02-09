import React, { useState, useEffect, useContext } from 'react'
import { NavBar } from '../NavBar/NavBar'
import { CartContext } from '../../../context/CartContext'
import { UserContext } from '../../../context/UserContext'
import { getFirestore } from '../../../firebase'

export const NavBarContainer = () => {

  const [categories, setCategories] = useState([])
  const { qyInCart } = useContext(CartContext)
  const { userData, clearData } = useContext(UserContext)

  // uso de contenedor para traer los datos de categorias de firestore
  useEffect(() => {
    const db = getFirestore()
    const categoryCollection = db.collection("categories")

    categoryCollection.get().then((querySnapshot) => {
      if (querySnapshot.size === 0) {
        console.log("Sin resultados")
      }
      setCategories(querySnapshot.docs.map(doc => {
        const fullData = { id: doc.id, ...doc.data() }
        return fullData
      }))
    }).catch((error) => {
      console.log("Error trayendo los resultados", error)
    }).finally(() => {
    })
  }, [])

  return (<NavBar categories={categories} qyInCart={qyInCart} userData={userData} clearData={clearData} />)

}