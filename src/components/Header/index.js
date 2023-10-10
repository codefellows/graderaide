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
          <option value="01">01</option>
          <option value="02">02</option>
          <option value="03">03</option>
          <option value="04">04</option>
          <option value="05">05</option>
          <option value="06">06</option>
          <option value="07">07</option>
          <option value="08">08</option>
          <option value="09">09</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="13">13</option>
          <option value="14">14</option>
          <option value="15">15</option>
          <option value="16">16</option>
          <option value="17">17</option>
          <option value="18">18</option>
          <option value="19">19</option>
          <option value="20">20</option>
          <option value="21">21</option>
          <option value="22">22</option>
          <option value="23">23</option>
          <option value="24">24</option>
          <option value="25">25</option>
          <option value="26">26</option>
          <option value="27">27</option>
          <option value="28">28</option>
          <option value="29">29</option>
          <option value="30">30</option>
          <option value="31">31</option>
          <option value="32">32</option>
          <option value="33">33</option>
          <option value="34">34</option>
          <option value="35">35</option>
          <option value="36">36</option>
          <option value="37">37</option>
          <option value="38">38</option>
          <option value="39">39</option>
          <option value="40">40</option>
          <option value="41">41</option>
          <option value="42">42</option>
          <option value="43">43</option>
          <option value="44">44</option>
          <option value="45">45</option>
        </select>

        <select id="multi" name="multi" className={styles.select} onChange={handleChange} value={selections.multi}>
          <option value="">none</option>
          <option value="" disabled>Part</option>
          <option value="-a">-a</option>
          <option value="-b">-b</option>
          <option value="-c">-c</option>
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
