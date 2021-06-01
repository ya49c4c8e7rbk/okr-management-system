import type { FC } from 'react'
import React from 'react'

export const Layout: FC = ({ children }) => {
  return (
    <>
      <header></header>
      <main>{children}</main>
      <footer></footer>
    </>
  )
}
