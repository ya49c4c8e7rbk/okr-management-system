import Head from 'next/head'
import type { ReactNode } from 'react'
import React from 'react'

type Props = {
  children?: ReactNode
  title?: string
}

export const Layout = ({ children, title = 'This is the default title' }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header></header>
    {children}
    <footer></footer>
  </div>
)
