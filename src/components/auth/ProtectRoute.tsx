import { useEffect, useState } from 'react'
import firebase from 'firebase'
import { useRouter } from 'next/router'
import { auth } from '~/utils/firebase'

export const ProtectRoute = ({ children }) => {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<null | firebase.User>(null)

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user ? setCurrentUser(user) : router.push('/login')
    })
  }, [])

  return children
}
