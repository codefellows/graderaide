import React, { useState, useEffect } from 'react';
import styles from './Header.module.css';

export default function Header({ navigateToPage, selections, setSelections }) {

  const handleChange = (e) => {
    setSelections({
      ...selections,
      [e.target.name]: e.target.value
    });
  };

  return (
    <header className={styles.head}>
      <div className={styles.selectContainer}>
        <select id="program" name="program" className={styles.select} onChange={handleChange} value={selections.program}>
          <option value="" disabled>Program</option>
          <option value="code">Code</option>
          <option value="ops">Ops</option>
        </select>

        <select id="course-level" name="courseLevel" className={styles.select} onChange={handleChange} value={selections.courseLevel}>
          <option value="" disabled>Course Level</option>
          <option value="101">101</option>
          <option value="102">102</option>
          <option value="201">201</option>
          <option value="301">301</option>
          <option value="401-cybersecurity">401-cybersecurity</option>
          <option value="401-javascript">401-javascript</option>
          <option value="401-python">401-python</option>
          <option value="401-dotnet">401-dotnet</option>
          <option value="401-java">401-java</option>
          <option value="501">501</option>
        </select>

        <select id="assignment-type" name="assignmentType" className={styles.select} onChange={handleChange} value={selections.assignmentType}>
          <option value="" disabled>Assignment Type</option>
          <option value="lab">Lab</option>
          <option value="challenges">Challenge</option>
        </select>

        <select id="class" name="classNumber" className={styles.select} onChange={handleChange} value={selections.classNumber}>
          <option value="" disabled>Class</option>
          {
            Array.from({ length: 45 }, (_, i) => i + 1).map(number => { // Create an array of numbers from 1 to 45
              number = number < 10 ? '0' + number : number; // Pad single digit numbers with a leading zero
              return <option value={number} key={number}>{number}</option>
            })
          }
        </select>
      </div>

      <nav className={styles.nav}>
        <a onClick={() => navigateToPage('assignment')}>Assignment</a> | {" "}
        <a onClick={() => navigateToPage('solution')}>Solution</a> | {" "}
        <a onClick={() => navigateToPage('grading')}>Grading</a>
      </nav>
    </header>
  );
}
