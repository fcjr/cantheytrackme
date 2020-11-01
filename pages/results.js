// import { useEffect, useRef } from 'react'

import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Results.module.css'

export default function Results() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Can they track me?</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.navbar}>
        <Link href="/">
          <h1 className={styles.title}>
            Can <span className={styles.titleType}>they|</span>track me?
          </h1>
        </Link>
      </div>
      <main className={styles.main}>
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
