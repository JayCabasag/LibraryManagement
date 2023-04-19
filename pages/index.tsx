import LoginPage from './login'
import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <>
      <Head>
          <title>Techno Library - Home</title>
      </Head>
      <LoginPage />
    </>
  )  
}

export default Home
