import React, { useState, useEffect, Suspense } from 'react';
import styles from '../../styles/Pages.module.css';

export default function Assignment({ selections }) {
  const domain = 'https://codefellows.github.io/';
  const repo = `${selections.program}-${selections.courseLevel}-guide/`;
  const path = `curriculum/class-${selections.classNumber}/`;
  const file = `${selections.assignmentType}${selections.multi}/index.html`;
  const url = selections.program && selections.courseLevel && selections.assignmentType && selections.classNumber
    ? `${domain}${repo}${path}${file}`
    : '';

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Suspense fallback={<div>Loading...</div>}>

          <h1 className={styles.title}>Assignment Details</h1>
          {url
            ? <iframe src={url} width="100%" height="90%" title="Assignment Content"></iframe>
            : <p>Welcome! Go ahead and select the options at the top for the assignment you want to grade.</p>}
          <p className={styles.code}>
            {url
              ? <a href={url} target="_blank">View Assignment in a new tab</a>
              : <a href="https://canvas.instructure.com" target="_blank">Open Canvas</a>
            }
          </p>
        </Suspense>
      </main>
    </div>
  );
}
