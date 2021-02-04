import React, { useState } from 'react'

export const UserContext = React.createContext([])

export const UserProvider = ({ children }) => {

  const [userData, setUserData] = useState()

  /* 
  formato userData
        {
        id: id,
        firstName: nombre,
        lastName: apellido,
        address: direccion,
        phone: telefono,
        email: email,
      }
  */

  const clearData = () => {
    setUserData()
  }

  return (
    <UserContext.Provider
      value={{ userData, setUserData, clearData }}
    >
      {children}
    </UserContext.Provider>
  )

}