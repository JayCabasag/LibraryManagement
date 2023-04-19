import Head from "next/head";
import { Login } from "../../containers/login";

import React from 'react'

export default function LoginPage() {
  return <>
    <Head>
      <title>Library management - Login </title>
    </Head>
    <Login />
  </>
}