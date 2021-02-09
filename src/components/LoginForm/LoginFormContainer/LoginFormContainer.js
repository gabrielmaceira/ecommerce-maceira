import React, { useContext, useState } from 'react'
import {LoginForm} from '../LoginForm/LoginForm'
import { UserContext } from '../../../context/UserContext'
import { getFirestore } from '../../../firebase'
import CryptoJS from 'crypto-js'


export const LoginFormContainer = ({ show, handleClose, loginState }) => {

  // manejo del estado
  const [login, setLogin] = useState(loginState)
  const [errors, setErrors] = useState([])

  // llamada al context de usuario
  const { setUserData } = useContext(UserContext)

  // hacer el login
  const doLogin = (e) => {
    e.preventDefault()
    // pasa el email a minusculas para compararlo luego con los datos en firestore, que se cargan siempre en minuscula
    const email = e.target[0].value.toLowerCase()
    const password = e.target[1].value

    // Hasheado de la contraseña por seguridad
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

  // hacer el registro del usuario
  const doSignUp = (e) => {
    e.preventDefault()

    let errorList = []

    const firstName = e.target[0].value
    const lastName = e.target[1].value
    const address = e.target[2].value
    const phone = e.target[3].value
    // el email se pasa a minusculas para hacer los chequeos de login despues
    const email = e.target[4].value.toLowerCase()
    const password = e.target[5].value
    const repeatPassword = e.target[6].value

    // revisa si son numeros
    const regNumbers = new RegExp('^\\d+$')
    // revisa que tenga 1 mayuscula, 1 minuscula, 1 numero y entre 8 y 15 caracteres totales
    const passTest = new RegExp('(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,15}')

    // validacion de campos
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

    // si no hay errores hace el signup, sino muestra error
    if (errorList.length === 0) {
      // carga de firestore
      const db = getFirestore()
      const userCollection = db.collection("users")
      const user = userCollection.where('email', '==', email)

      // valida que no exista un usuario con el mail ingresado en firestore
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