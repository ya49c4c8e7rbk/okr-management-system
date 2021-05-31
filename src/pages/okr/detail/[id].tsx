import { NextPage } from 'next'
import firebase from 'firebase'
import { db } from '~/utils/firebase'
import { ProtectRoute } from '~/src/components/auth/ProtectRoute'
import { IKeyResult, IOKR } from '~/interfaces'

type Props = {
  okr: IOKR
}

const Detail: NextPage<Props> = (props) => {
  return (
    <div>
      <ProtectRoute>
        <div>{props.okr.owner?.name}</div>
        <div>{props.okr.objective}</div>
        <div>
          <ul>
            {props.okr.key_results?.map((data: IKeyResult, i: number) => (
              <li key={i}>{data.key_result}</li>
            ))}
          </ul>
        </div>
      </ProtectRoute>
    </div>
  )
}

Detail.getInitialProps = async ({ query: { id } }) => {
  const okr: IOKR = await new Promise((resolve, reject) => {
    db.collection('okrs')
      .doc(id as string)
      .get()
      .then(async (snapshot) => {
        const data: firebase.firestore.DocumentData | undefined =
          snapshot.data()
        if (data === undefined) {
          reject({} as IOKR)
          return
        }
        const okr: IOKR = {
          id: data.id,
          objective: data.objective,
          key_results: data.key_results,
          owner: {
            name: (await data.owner.get()).get('name'),
          },
        }
        resolve(okr)
      })
      .catch((error) => {
        console.error(error)
        reject({} as IOKR)
      })
  })
  return { okr }
}

export default Detail
