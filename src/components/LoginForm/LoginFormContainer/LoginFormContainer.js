import React, { useContext, useState } from 'react'
import {LoginForm} from '../LoginForm/LoginForm'
import { UserContext } from '../../../context/UserContext'
import { getFirestore } from '../../../firebase'
import CryptoJS from 'crypto-js'


export const LoginFormContainer = ({ show, handleClose, loginState }) => {

  const [login, setLogin] = useState(loginState)
  const [errors, setErrors] = useState([])

  const { setUserData } = useContext(UserContext)

  const doLogin = (e) => {
    e.preventDefault()
    const email = e.target[0].value.toLowerCase()
    const password = e.target[1].value

    // Encrypt
    var encPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex)

    // carga de firestore
    const db = getFirestore()
    const userCollection = db.collection("users")
    const user = userCollection.where('email', '==', email).where('password', '==', encPassword)

    user.get().then((querySnapshot) => {
      if (querySnapshot.size === 0) {
        return alert("Los datos ingresados son incorrectos")
      }
      else {
        const userInfo = querySnapshot.docs.map(doc => {
          const fullData = { id: doc.id, ...doc.data() }
          return fullData
        })
        setUserData(userInfo[0])
        alert(`Bienvenido ${userInfo[0].firstName}`)
        handleClose()
      }
    }).catch((error) => {
      console.log("Error trayendo los resultados", error)
    }).finally(() => {
    })
  }

  const doSignUp = (e) => {
    e.preventDefault()

    let errorList = []

    const firstName = e.target[0].value
    const lastName = e.target[1].value
    const address = e.target[2].value
    const phone = e.target[3].value
    const email = e.target[4].value
    const password = e.target[5].value
    const repeatPassword = e.target[6].value

    const regNumbers = new RegExp('^\\d+$')
    const passTest = new RegExp('(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,15}')

    console.log(passTest.test(password))

    if (firstName.trim() === '') {
      errorList.push("firstName")
    }

    if (lastName.replace(/\s+/g, "") === '') {
      errorList.push("lastName")
    }

    if (address.replace(/\s+/g, "") === '') {
      errorList.push("address")
    }

    if (phone.replace(/\s+/g, "") === '' || !regNumbers.test(phone)) {
      errorList.push("phone")
    }

    if (password.replace(/\s+/g, "") === '' || !passTest.test(password)) {
      errorList.push("password")
    }

    if (password !== repeatPassword) {
      errorList.push("repeatPassword")
    }

    if (errorList.length === 0) {

      // carga de firestore
      const db = getFirestore()
      const userCollection = db.collection("users")
      const user = userCollection.where('email', '==', email)

      user.get().then((querySnapshot) => {
        if (querySnapshot.size !== 0) {
          return alert("Ya existe un usuario registrado con este mail.")
        }
        else {
          // Encrypt
          const encPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex)

          const newUser = {
            firstName: firstName,
            lastName: lastName,
            address: address,
            phone: phone,
            email: email.toLowerCase(),
            password: encPassword,
          }

          userCollection.add(newUser).then(({ id }) => {
            alert("Gracias por registrarte")
            setLogin(true)
          }).catch(err => {
            console.log(err)
          })
        }
      }).catch((error) => {
        console.log("Error trayendo los resultados", error)
      }).finally(() => {
      })

    }

    setErrors(errorList)

  }

  return (<LoginForm
    doSignUp={doSignUp}
    doLogin={doLogin}
    show={show}
    handleClose={handleClose} 
    login={login}
    setLogin={setLogin}
    errors={errors}
    />)
}