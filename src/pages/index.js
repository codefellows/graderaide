import React, { useState, useEffect } from 'react';
import Assignment from '../components/Assignment';
import Grading from '../components/Grading';
import Solution from '../components/Solution';

export default function Home({ activePage, selections }) {
  
  return (
    <>
      {activePage === 'assignment' && <Assignment selections={selections} />}
      {activePage === 'solution' && <Solution  selections={selections}/>}
      {activePage === 'grading' && <Grading  selections={selections} />}
    </>
  );
}
