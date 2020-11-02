// import { useEffect, useRef } from 'react'
import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

import Test from '../components/test'

import styles from '../styles/Results.module.css'

export default class Results extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      passed: 0,

      testVPNpassed: false,

      testBeyondCognitoPassed: false,
      sentHeaders: {
        'X-Client-Data': 'test'
      },
      recievedHeaders: {}
    }

    this._runTests()
  }

  _runTests = async () => {
    const { sentHeaders } = this.state;
    let passed = 0;

    let testVPNpassed = false;
    try {
      // VPN Check -- TODO location lookup
      const vpnResp = await fetch('/api/vpncheck');
      const vpnJSON = await vpnResp.json();
      testVPNpassed = vpnJSON && vpnJSON.isVPN;
      if (testVPNpassed) passed++;
    } catch(e) { /* TODO */}

    let testBeyondCognitoPassed = false;
    let recievedHeaders = {};
    try {
      const req = new Request('api/echoheaders', {
        method: 'GET',
        headers: sentHeaders,
      });
      const headerResp = await fetch(req);
      const headerJSON = await headerResp.json();
      testBeyondCognitoPassed = headerJSON.headers && !headerJSON.headers['x-client-data'];
      if (testBeyondCognitoPassed) passed++;
      headerJSON.headers && (recievedHeaders = headerJSON.headers);
    } catch(e) { /* TODO */}

    this.setState({ passed, testVPNpassed, testBeyondCognitoPassed, recievedHeaders });
  }

  render() {
    const { passed, testVPNpassed, testBeyondCognitoPassed } = this.state

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
          <div className={styles.score}>
            <div className={styles.scoreHeader}>
              Your Score:
            </div>
            <div className={styles.scoreText}>
              {`${passed}/4`}
            </div>
          </div>
          <div className={styles.tests}>
            <Test 
              title='Tracker Blocker Test'
              description='Example without details'
            />
            <Test 
              title='Ad Blocker Test'
              description='Example with details'
              details='these are more details'
            />
            <Test 
              title='VPN Test'
              description='Are you using a VPN?'
              details={
                <>
                  This checks if you are connected to a Ghostery VPN.
                  <br /><br />
                  Note: You may still be connected to a VPN that is not owned by ghostery.
                </>
              }
              passed={testVPNpassed}
            />
            <Test 
              title='BeyondCognito Test'
              description='Are you removing tracking headers?'
              passed={testBeyondCognitoPassed}
            />
          </div>
        </main>

        <footer className={styles.footer}>
          <a
            href="https://github.com/fcjr"
            // href="https://ghostery.com?utm_source=cantheytrackme.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Made with 💖 by {' '}
            fcjr
            {/* <img src="/ghostery.svg" alt="Ghostery Logo" className={styles.logo} /> */}
          </a>
        </footer>
      </div>
    )
  }
}
