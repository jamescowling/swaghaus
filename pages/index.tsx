import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Items } from "../components/Items";
import { Cart } from "../components/Cart";
import { Logout } from "../components/Logout";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Swaghaus</title>
        <meta name="description" content="Convex shopping cart demo app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Logout />

      <main className={styles.main}>
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
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/convex.svg" alt="Convex Logo" width={90} height={18} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
