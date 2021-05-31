import firebase from 'firebase'

export type User = {
  id: number
  name: string
}

export interface IOKRs {
  [key: string]: IOKR
}

export interface IOKR {
  id: string
  objective?: string
  key_results?: IKeyResult[]
  owner?: {
    name?: string
  }
}

export interface IOKRTmp {
  id: string
  objective?: string
  key_results?: IKeyResult[]
  owner: firebase.firestore.DocumentReference
}

export interface IKeyResult {
  key_result: string
}
