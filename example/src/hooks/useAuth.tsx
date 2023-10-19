import { useContext } from 'react'
import { AuthContext } from '../provider/AuthProvider'

export default function useAuth() {
  return useContext(AuthContext)
}
