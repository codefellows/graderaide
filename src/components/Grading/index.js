import React, { useState, useEffect } from 'react';
import styles from '../../styles/Pages.module.css';

export default function Grading({ selections }) {
  const [studentSubmission, setStudentSubmission] = useState({});
  const [gradingResult, setGradingResult] = useState(null);
  const [assignmentContent, setAssignmentContent] = useState('');

  useEffect(() => {
    setAssignmentContent('');
    if (selections.program && selections.courseLevel && selections.assignmentType && selections.classNumber) {
      const repo = `${selections.program}-${selections.courseLevel}-guide`;
      const path = `curriculum/class-${selections.classNumber}/${selections.assignmentType + selections.multi}/README.md`;
      const url = `https://api.github.com/repos/codefellows/${repo}/contents/${path}`;
      console.log('Fetching assignment content from:', url);

      fetch(url, {
        headers: {
          'Accept': 'application/vnd.github+json',
          'Authorization': `Bearer ${localStorage.getItem('githubApiKey')}`
        }
      })
        .then(response => response.json())
        .then(content => {
          content = atob(content.content);  // Decode base64-encoded file contents
          setAssignmentContent(content.trim());
        })
        .catch(error => console.error('Error:', error));
    }
  }, [selections]);

  useEffect(() => {
    // Get the initial value of the studentSubmission from storage
    const saveStudentSubmission = () => {
      chrome.storage.local.get(['pageContent', 'pageUrl'], function (result) {
        console.log("Student Submission:", result);
        setStudentSubmission(result);
      })
    }

    // This code will only run on the client side after the component is mounted
    const handleStorageChange = (changes, areaName) => {
      console.log("New item in storage", changes);
      setGradingResult(null);
      saveStudentSubmission();
    }

    // Load initial data and set up listener for changes to storage
    saveStudentSubmission();
    chrome.storage.onChanged.addListener(handleStorageChange);

    // Return a cleanup function to remove the listener when the component unmounts
    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange);
    };
  }, []); // The empty array means this useEffect runs once after the initial render

  useEffect(() => {
    // Fetch grading result from OpenAI API when the selected student submission or assignment changes
    if (assignmentContent && studentSubmission.pageContent) {
      const apiKey = localStorage.getItem('openaiApiKey');
      const apiURL = 'https://api.openai.com/v1/chat/completions';

      fetch(apiURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: `
                You are a grading assistant, who is reviewing an assignment submission to help a human grader provide feedback. 
                Evaluate the student's work and provide insightful feedback, appropriate to deliver to a junior developer. 
                Keep your comments brief, so the human grader can scan them easily to identify problems.
                Ignore any code that appears to be related to git diffs, or the file name. 
                Your first response should identify if the code looks to be working, or have bugs that would prevent it from running.
                Then, enumerate your comments in brief paragraphs. 
                Start each paragraph with an emoji that correlates to the sentiment of the comment, but don't use number emoji. 
                Follow with a blank line after each paragraph. 
                Include the approximate line number of the code you are commenting on.
                
                The full text of the assignment you are grading is detailed just below. 
                You'll only be grading one file at a time, but be sure to speak to how the submission aligns with the assignment requirements:

                {assignmentContent}
                `,
            },
            {
              role: 'user',
              content: studentSubmission.pageContent
            }
          ],
          max_tokens: 500
        })
      })
        .then(response => response.json())
        .then(data => {
          console.log('Complete OpenAI Response:', data);
          data = data.choices[0]?.message.content.replace(/\n/g, '<br />');
          setGradingResult(`<p>${data}</p>` || 'No response from ChatGPT, asleep at the wheel...');
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }, [assignmentContent, studentSubmission]); // This useEffect runs whenever studentSubmission changes


  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Grader Aide</h1>
        {assignmentContent
          ? <div>
            <p>&#9989; Assignment loaded from GitHub: {[selections.program, selections.courseLevel, selections.assignmentType, selections.classNumber].join('-')}</p>
            {studentSubmission.pageContent
              ? <div>
                <p>&#9989; Found work to grade: {studentSubmission.pageUrl}.</p>
                <section>
                  <h2>Grading Result</h2>
                  <div className={styles.description}>
                    {gradingResult
                      ? <div dangerouslySetInnerHTML={{ __html: gradingResult }}></div>
                      : <div className={styles.spinner}></div>}
                  </div>
                </section>
              </div>
              : <p>&#128194; Click a filename for aide in grading...</p>
            }
          </div>
          : <p>&#9757; Go ahead and specify an assignment to that you are grading...</p>
        }
      </main>
    </div>
  );
}
