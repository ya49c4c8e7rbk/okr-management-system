import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { useAuth } from '~/src/hooks/useAuth'
import { useCurrentUser } from '~/src/hooks/useCurrentUser'

const Login: NextPage = () => {
  const { currentUser } = useCurrentUser()
  const { login } = useAuth()
  const { replace } = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (!currentUser) return
    replace('/')
  }, [currentUser, replace])

  return (
    <div>
      <form onSubmit={login(email, password)}>
        <div>
          <label htmlFor="email">Email: </label>
          <input id="email" type="email" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input id="password" type="password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
