import React,{ createContext, useContext, useEffect, useState } from 'react'
import {
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
  } from 'firebase/auth'
import { auth } from './firebase'

const AuthContext = createContext({})
export const useAuth = () => useContext(AuthContext)

const AuthContextProvider = ({children}) => {

  // const user = useRef(null);

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        })
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password).then(() => {
      // alert("Logged In!");
      return true;
      }).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // alert("Error when Logging!");
          throw errorMessage;

      });
  }

  const logout = async () => {
    setUser(null)
    await signOut(auth)
  }


  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
    {loading ? null : children}
  </AuthContext.Provider>
  )
}

export default AuthContextProvider