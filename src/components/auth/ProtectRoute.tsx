import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { auth } from '~/utils/firebase'

export const ProtectRoute = ({ children }) => {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<null | object>(null)

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user ? setCurrentUser(user) : router.push('/login')
    })
  }, [])

  return children
}
