import React from 'react'
import { initializeApp } from 'firebase/app'
import {
  signInWithPopup,
  GoogleAuthProvider,
  getAuth,
  browserSessionPersistence,
  setPersistence,
  User,
  UserCredential
} from 'firebase/auth'
import { useState, useEffect, useRef } from 'react'
import { useMemo } from 'react'

type AuthContextType = {
  user: User | null
  login: () => Promise<UserCredential | undefined>
  logout: () => void
}

export const AuthContext = React.createContext<AuthContextType>({
  user: null,
  login: () => Promise.resolve(undefined),
  logout: () => {}
})

const provider = new GoogleAuthProvider()
initializeApp(JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG!))

export function AuthProvider({ children }: { children: any }): JSX.Element {
  const authRef = useRef(getAuth())
  const [user, setUser] = useState(() => authRef.current.currentUser)

  useEffect(
    () =>
      authRef.current.onAuthStateChanged(async user => {
        if (user) {
          setUser(user)
        } else {
          setUser(null)
        }
      }),
    []
  )
  let value = useMemo(
    () => ({
      user,
      login: async () => {
        await setPersistence(getAuth(), browserSessionPersistence)
        return signInWithPopup(getAuth(), provider)
      },
      logout: async () => {
        await getAuth().signOut()
        setUser(null)
      }
    }),
    [user]
  )
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
