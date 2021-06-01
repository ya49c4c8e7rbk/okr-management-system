import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { useCurrentUser } from './useCurrentUser'

export const useRequireLogin = () => {
  const { currentUser, isAuthChecking } = useCurrentUser()
  const { replace } = useRouter()

  useEffect(() => {
    if (isAuthChecking) return // まだ確認中
    if (!currentUser) replace('/login') // 未ログインだったのでリダイレクト
  }, [currentUser, isAuthChecking, replace])

  return { currentUser, isAuthChecking }
}
