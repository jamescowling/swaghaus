import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useMutation } from '../convex/_generated/react'
import { useAuth0 } from '@auth0/auth0-react'
import { Items } from '../components/Items'
import { Cart } from '../components/Cart'

function Logout() {
  const { logout, user } = useAuth0()
  return (
    <div>
      <img src={user?.picture} style={{
          width: "40px",
          borderRadius: "20%",
          margin: "10px",
        }}/>
      <button onClick={() => logout({ returnTo: window.location.origin })}>
        Log out {user!.name}
      </button>
    </div>
  )
}

const Home: NextPage = () => {
  const createItem = useMutation('createItem')

  return (
    <div className={styles.container}>
      <Head>
        <title>Swaghaus</title>
        <meta name="description" content="Convex shopping cart demo app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Logout />

      <main className={styles.main}>
        <div>Hey you, buy some shit at</div>
        <h1 className={styles.title}>Swaghaus</h1>

        {/* <button className={styles.button} onClick={(_event) => createItem()}>
          Add Item
        </button> */}
        <div className={styles.parent}>
          <div className={styles.left}>
            <Items />
          </div>
          <div className={styles.right}>
            <Cart />
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://www.convex.dev/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/convex.svg" alt="Convex Logo" width={90} height={18} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home
