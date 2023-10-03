import { useState } from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  const [openaiApiKey, setOpenaiApiKey] = useState(
    typeof window !== 'undefined' ? localStorage.getItem('openaiApiKey') || '' : ''
  );
  const [githubApiKey, setGithubApiKey] = useState(
    typeof window !== 'undefined' ? localStorage.getItem('githubApiKey') || '' : ''
  );

  const handleOpenaiApiKeyChange = (event) => {
    const apiKey = event.target.value;
    setOpenaiApiKey(apiKey);
    if (typeof window !== 'undefined') {
      localStorage.setItem('openaiApiKey', apiKey);
      setOpenaiApiKeyHidden(true);
    }
  };

  const handleGithubApiKeyChange = (event) => {
    const apiKey = event.target.value;
    setGithubApiKey(apiKey);
    if (typeof window !== 'undefined') {
      localStorage.setItem('githubApiKey', apiKey);
      setGithubApiKeyHidden(true);
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerText}>
        <a
          href="https://github.com/codefellows/graderaide"
          target="_blank"
          rel="noopener noreferrer"
        >
          Graider Aide, &copy; Code Fellows v0.0.1
          <span className={styles.logo}>
            <img
              src="icons/icon16.png"
              alt="Logo"
              width={16}
              height={16}
            />
          </span>
        </a>
      </div>
      <div className={styles.apiKey}>
        <label htmlFor="openaiApiKey">OpenAI API Key:</label>
        <input
          type="password"
          id="openaiApiKey"
          value={openaiApiKey}
          onChange={handleOpenaiApiKeyChange}
        />
      </div>
      <div className={styles.apiKey}>
        <label htmlFor="githubApiKey">Github API Key:</label>
        <input
          type="password"
          id="githubApiKey"
          value={githubApiKey}
          onChange={handleGithubApiKeyChange}
        />
      </div>
    </footer>
  );
}
