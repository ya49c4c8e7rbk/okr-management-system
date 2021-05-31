import firebase from 'firebase'

export type User = {
  id: number
  name: string
}

export type IOKRs = {
  [key: string]: IOKR
}

export type IOKR = {
  id: string
  objective?: string
  key_results?: IKeyResult[]
  owner?: {
    name?: string
  }
}

export type IKeyResult = {
  key_result: string
}
