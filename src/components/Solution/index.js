import React, { useState, useEffect } from 'react';
import styles from '../../styles/Pages.module.css';

export default function Solution({ selections }) {
  let domain = 'https://codefellows.github.io/';
  let repo = `${selections.program}-${selections.courseLevel}-guide/`;
  let path = `curriculum/class-${selections.classNumber}/`;
  let file = `solution/`;

  // Custom overrides for non-compliant repos:
  if(selections.program === 'ops' && selections.assignmentType === 'challenges') {
    file = `${file}challenge/index.html`
  }

  if ((selections.assignmentType === 'lab' && ['401-python', '401-java'].includes(selections.courseLevel))) {
    domain = 'https://github.com/';
    repo = `codefellows/${repo}`;
    path = `tree/main/${path}`;
    file = `${file}${selections.assignmentType}`;
  }

  if (selections.program === 'code' && selections.courseLevel === '301' && selections.assignmentType === 'challenges') {
    file = `${selections.assignmentType}/solutions-${selections.classNumber}.test.js`;
  }


  const url = selections.program && selections.courseLevel && selections.assignmentType && selections.classNumber
    ? `${domain}${repo}${path}${file}`
    : '';

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Assignment Solution</h1>
        {url ? 
        <div className={styles.iframeContainer}>
          <iframe src={url} width="100%" height="100%" title="Assignment Content"></iframe>
        </div>
        : <p>Welcome! Go ahead and select the options at the top for the assignment you want to grade.</p>}
        <p className={styles.code}>
          {url ? <a href={url} target="_blank">View GitHub Solution in a new tab</a>
            : <a href={`https://github.com/codefellows/`} target="_blank">Open GitHub</a>

          }
        </p>
      </main>
    </div>
  );
}
