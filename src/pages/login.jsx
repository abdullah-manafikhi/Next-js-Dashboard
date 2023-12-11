import Login from '../components/Login/Login'
import Head from 'next/head'

function login() {
  // hello triggering a rebuild
  return (
    <>
      <Head>
        <title>Dashboard - Login</title>
      </Head>
      <Login />
    </>
  )
}

export default login
