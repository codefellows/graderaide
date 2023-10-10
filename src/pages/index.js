import React, { useState, useEffect } from 'react';
import Assignment from '../components/Assignment';
import Grading from '../components/Grading';
import Solution from '../components/Solution';

export default function Home({ activePage, selections }) {

  return (
    <>
      <div style={{ display: activePage === 'assignment' ? 'block' : 'none' }}>
        <Assignment selections={selections} />
      </div>
      <div style={{ display: activePage === 'solution' ? 'block' : 'none' }}>
        <Solution selections={selections} />
      </div>
      <div style={{ display: activePage === 'grading' ? 'block' : 'none' }}>
        <Grading selections={selections} />
      </div>
    </>
  );
}
