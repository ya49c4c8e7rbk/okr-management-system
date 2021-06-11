import { useRouter } from 'next/router'
import type React from 'react'
import { useCallback } from 'react'

import { auth } from '~/utils/firebase'

export const useAuth = () => {
  const { push } = useRouter()

  const login = useCallback(
    (email: string, password: string) => async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      try {
        await auth.signInWithEmailAndPassword(email, password)
        push('/')
      } catch (err) {
        alert(err.message)
      }
    },
    [push]
  )

  const logout = useCallback(async () => {
    try {
      await auth.signOut()
      push('/login')
    } catch (error) {
      alert(error.message)
    }
  }, [push])

  return { login, logout }
}
