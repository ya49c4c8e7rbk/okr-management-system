import { useEffect, useState } from 'react'
import firebase from 'firebase'
import { useRouter } from 'next/router'
import { auth } from '~/utils/firebase'

export const ProtectRoute: React.FC = ({ children }) => {
  const router = useRouter()
  const [, setCurrentUser] = useState<null | firebase.User>(null)

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user ? setCurrentUser(user) : router.push('/login')
    })
  }, [router])

  return <>{children}</>
}
