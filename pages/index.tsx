import Login from '../containers/login'
import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <>
      <Head>
          <title>Techno Library</title>
      </Head>
      <Login />
    </>
  )  
}

export default Home
