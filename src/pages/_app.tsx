import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import type { FC } from 'react'
import React, { useEffect } from 'react'

import { CurrentUserProvider } from '~/src/context/CurrentUser'
import { useCurrentUser } from '~/src/hooks/useCurrentUser'
import { auth } from '~/utils/firebase'

const AppInit: FC = () => {
  const { setCurrentUser } = useCurrentUser()
  const { replace, pathname } = useRouter()

  useEffect(() => {
    ;(async function () {
      try {
        // const { currentUser } = await fetchCurrentUser() // サーバーへのリクエスト（未ログインの場合は401等を返すものとする）
        auth.onAuthStateChanged((value) => {
          // ログインユーザーの情報が取得できたのでグローバルステートにセット
          if (value?.uid && value?.email) {
            setCurrentUser({
              uid: value.uid,
              name: value?.displayName,
              email: value.email,
            })
            return
          }

          setCurrentUser(null)
          if (pathname !== '/login') {
            replace('/login')
          }
        })
      } catch {
        // 未ログイン（未ログイン時のリダイレクト処理などをここに書いても良いかも）
        setCurrentUser(null)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>OKR</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <CurrentUserProvider>
        <AppInit />
        <Component {...pageProps} />
      </CurrentUserProvider>
    </>
  )
}

export default App
