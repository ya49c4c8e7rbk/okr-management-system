/* eslint-disable */
// prettier-ignore
export const pagesPath = {
  login: {
    $url: (url?: { hash?: string }) => ({ pathname: '/login' as const, hash: url?.hash })
  },
  okr: {
    detail: {
      _id: (id: string | number) => ({
        $url: (url?: { hash?: string }) => ({ pathname: '/okr/detail/[id]' as const, query: { id }, hash: url?.hash })
      })
    }
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

// prettier-ignore
export type PagesPath = typeof pagesPath
