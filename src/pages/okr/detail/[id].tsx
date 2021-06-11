import type firebase from 'firebase'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import type { IKeyResult, IOKR } from '~/interfaces'
import { Loading } from '~/src/components/Loading'
import { useRequireLogin } from '~/src/hooks/useRequireLogin'
import { db } from '~/utils/firebase'

const Detail: NextPage = () => {
  const { currentUser, isAuthChecking } = useRequireLogin()
  const [okr, setOkr] = useState<IOKR | null>(null)
  const { query } = useRouter()

  useEffect(() => {
    db.collection('okrs')
      .doc(query.id as string)
      .get()
      .then(async (snapshot) => {
        const data: firebase.firestore.DocumentData | undefined = snapshot.data()
        if (data === undefined) {
          return
        }
        const tmpOkr: IOKR = {
          id: data.id,
          objective: data.objective,
          key_results: data.key_results,
          owner: {
            name: (await data.owner.get()).get('name'),
          },
        }
        setOkr(tmpOkr)
      })
      .catch((error) => {
        console.error(error)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isAuthChecking) return <Loading />
  if (!currentUser || !okr) return null

  return (
    <div>
      <div>{okr.owner?.name}</div>
      <div>{okr.objective}</div>
      <div>
        <ul>
          {okr.key_results?.map((data: IKeyResult, i: number) => (
            <li key={i}>{data.key_result}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Detail
