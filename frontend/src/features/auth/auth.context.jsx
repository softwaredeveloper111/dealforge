import React, { createContext, useState } from 'react'
export const  authContextProvider = createContext()


const AuthContext = ({children}) => {

  const [user,setUser] = useState(null)
  const [loading,setLoading] = useState(false)
  const [isAuthChecked, setIsAuthChecked] = useState(false)


  return (
    <authContextProvider.Provider value={{user,setUser,loading,setLoading,isAuthChecked,setIsAuthChecked}}>
      {children}
    </authContextProvider.Provider>
  )
}

export default AuthContext