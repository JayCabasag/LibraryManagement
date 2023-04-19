import Head from 'next/head'
import { Register } from '../../containers/register'
import React from 'react'

export default function RegisterPage() {
  return (
    <>
      <Head>
        <title>Library management - Register</title>
      </Head>
      <Register />
    </>
  )
}
