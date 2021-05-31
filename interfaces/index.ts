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
