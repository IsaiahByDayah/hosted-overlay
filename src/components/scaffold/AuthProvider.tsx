import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react"
import { User, onAuthStateChanged } from "firebase/auth"

import firebase from "lib/firebase"

interface AuthContextData {
  user?: User | null
  signOut: () => void
}

export const AuthContext = createContext<AuthContextData>({
  user: undefined,
  signOut: () => {
    // Noop
  },
})

interface AuthProviderProps {
  children?: ReactNode
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | undefined | null>(undefined)

  useEffect(() => {
    onAuthStateChanged(firebase.auth, (newUser) => {
      setUser(newUser)
      if (newUser) {
        console.log("New User: ", newUser)
      } else {
        console.log("Signed out!")
      }
    })
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        signOut: firebase.auth.signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)

export default AuthProvider
