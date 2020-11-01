import { useEffect, useRef } from 'react'
import Typed from 'typed.js';

import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  const typeTarget = useRef(null);

  useEffect(() => {
    const options = {
      strings: [
        "Google",
        "Facebook",
        "Ad Companies",
        "my ISP",
        "they"
      ],
      typeSpeed: 80,
      backSpeed: 40,
      startDelay: 40
    }
    const typed = new Typed(typeTarget.current, options);
    return () => {
      typed.destroy();
    }
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Can they track me?</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Can <span className={styles.titleType} style={{ whiteSpace: 'pre' }} ref={typeTarget}/>track me?
        </h1>
        <Link href="/results">
          <div className={styles.button}>Analyze My Connection Now</div>
        </Link>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://ghostery.com?utm_source=cantheytrackme.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made with 💖 by {' '}
          <img src="/ghostery.svg" alt="Ghostery Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
