import React, { useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  const [activePage, setActivePage] = useState('assignment');
  const [selections, setSelections] = useState({
    program: '',
    courseLevel: '',
    assignmentType: '',
    classNumber: '',
    multi: ''
  });

  const navigateToPage = (page) => {
    setActivePage(page);
  };

return (
    <>
      <Header selections={selections} setSelections={setSelections} navigateToPage={navigateToPage} />
      <Component {...pageProps} activePage={activePage} selections={selections} />
      <Footer />
    </>
  );
}
