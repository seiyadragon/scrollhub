import Link from "next/link";
import Head from "next/head";
import { FaBook, FaHome, FaSearch } from "react-icons/fa";
import styles from "../styles/Home.module.css";

export function NavBar({ title }) {
  return (
    <section className={styles.navigation}>
      <Head>
        <title>{"ScrollHub " + title}</title>
        <meta name="description" content="ScrollHub free online books!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Link href="/">
        <span>
          <FaHome className={styles.linkIcon} />
        </span>
      </Link>
      <Link href="/books?page=1">
        <span>
          <FaBook className={styles.linkIcon} />
        </span>
      </Link>
      <Link href="/search">
        <span>
          <FaSearch className={styles.linkIcon} />
        </span>
      </Link>
    </section>
  );
}

export function LogoImage({}) {
  return <section className={styles.logo} />;
}

export function Content({}) {
  return (
    <section className={styles.content}>
      <LogoImage />
      <span>Our goal is to bring free e-books to the entire internet.</span>
    </section>
  );
}

export default function Home({}) {
  return (
    <main>
      <NavBar title="Home" />
      <section className={styles.contentWrapper}>
        <section className={styles.contentWrapperBackdrop}>
          <Content />
        </section>
      </section>
    </main>
  );
}
