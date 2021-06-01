import type firebase from 'firebase'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import type { IOKR } from '~/interfaces'
import { Layout } from '~/src/components/Layout'
import { Loading } from '~/src/components/Loading'
import { useAuth } from '~/src/hooks/useAuth'
import { useRequireLogin } from '~/src/hooks/useRequireLogin'
import { db } from '~/utils/firebase'

const Home: NextPage = () => {
  const { logout } = useAuth()
  const { currentUser, isAuthChecking } = useRequireLogin()
  const [okrs, setOkrs] = useState<IOKR[]>([])

  useEffect(() => {
    db.collection('okrs')
      .get()
      .then(async (snapshot) => {
        const snapshots: firebase.firestore.DocumentData[] = []
        snapshot.forEach((doc) => {
          snapshots.push(doc)
        })
        const tmpOkrs: IOKR[] = []
        for (const i in snapshots) {
          const data = snapshots[i].data()
          tmpOkrs.push({
            id: snapshots[i].id,
            objective: data.objective,
            key_results: data.key_results,
            owner: {
              name: (await data.owner.get()).get('name'),
            },
          })
        }
        setOkrs(tmpOkrs)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  if (isAuthChecking) return <Loading />
  if (!currentUser) return null

  return (
    <Layout>
      <button onClick={logout}>Logout</button>

      <h1>Home</h1>
      <hr />

      <h2>ユーザー情報</h2>
      <p>uid: {currentUser.uid}</p>
      <p>name: {currentUser.name}</p>
      <p>email: {currentUser.email}</p>
      <hr />

      <h2>OKR</h2>
      <table>
        <tbody>
          {okrs.length ? (
            okrs.map((okr) => (
              <tr key={okr.id}>
                <td>{okr.owner?.name}</td>
                <td>{okr.objective}</td>
                <td>
                  <Link
                    href={{
                      pathname: '/okr/detail/[id]',
                      query: { id: okr.id },
                    }}
                  >
                    詳細
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>OKRがありません</td>
            </tr>
          )}
        </tbody>
      </table>
    </Layout>
  )
}

export default Home
