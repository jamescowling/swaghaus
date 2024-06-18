import styles from "../styles/Home.module.css";
import { Items } from "./Items";
import { Cart } from "./Cart";
import { Logout } from "./Logout";
import { ResetButton } from "./ResetButton";

export default function Home() {
  return (
    <div className={styles.container}>
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
        <ResetButton />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://www.convex.dev/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <img src="/convex.svg" alt="Convex Logo" width={90} height={18} />
          </span>
        </a>
      </footer>
    </div>
  );
}
