import { NextPage } from 'next'
import { db } from '~/utils/firebase'
import { ProtectRoute } from '~/src/components/auth/ProtectRoute'

const Detail: NextPage = (props: any) => {
  return (
    <div>
      <ProtectRoute>
        <div>{props.okr.owner.name}</div>
        <div>{props.okr.objective}</div>
        <div>
          <ul>
            {props.okr.key_results.map((data, i) => (
              <li key={i}>{data.key_result}</li>
            ))}
          </ul>
        </div>
      </ProtectRoute>
    </div>
  )
}

Detail.getInitialProps = async ({ req, query: { id } }) => {
  const result = await new Promise((resolve, reject) => {
    db.collection('okrs')
      .doc(id as string)
      .get()
      .then(async (snapshot) => {
        const data = await snapshot.data()
        data.owner = { name: (await data.owner.get()).get('name') }
        resolve(data)
      })
      .catch((error) => {
        console.error(error)
        reject([])
      })
  })
  return { okr: result }
}

export default Detail
