import React, { useState } from 'react';

import styles from '../styles/Test.module.css' 

export default function Test({ title, description, details, passed }) {

  const [ checked, setChecked ] = useState(false); 

  return (
    <div className={`${styles.container} ${passed ? styles.passed : styles.failed}`}>
      <div className={styles.containerinner}>
        <div className={styles.titlebar}> 
          <div>{title}</div>
          <div>{`Result: ${passed ? 'Passed' : 'Failed'}`}</div>
        </div>
        <div className={styles.description}>
          {description}
        </div>
        {details && (
          <div className={`${styles.accordion} ${passed ? styles.passed : styles.failed}`}>
              <div className={styles.accordionlabel}>
                <div className={styles.accordionlabeltext}>More Details</div>
                <div className={`${styles.arrow} ${checked && styles.flip}`} onClick={() => setChecked(!checked)} />
              </div>
              {checked && (
                <div className={styles.accordioncontent}>
                  {details}
                </div>
              )}
          </div>
        )}
      </div>
    </div>
  )
}
