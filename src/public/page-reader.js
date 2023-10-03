console.log("Injecting page-reader.js...")

const saveStudentSubmission = (e) => {
  // Extract the page content
  let pageContent = '';
  const pageUrl = window.location.href;
  const hash = pageUrl.split('#')[1];
  const studentCode = document.getElementById('read-only-cursor-text-area');
  if (hash) {
    pageContent = document.querySelector(`#${hash} table`).innerText;
  }
  else if (studentCode) {
    pageContent = studentCode.value;
  }
  else {
    pageContent = '';
  }

  chrome.storage.local.set({ pageContent: pageContent, pageUrl: pageUrl }, function () {
    console.log("Student submission saved");
  });
}

// Store the page content in the extension storage
document.addEventListener('DOMContentLoaded', saveStudentSubmission); // Fired when loading a PR file directly
//Events that fire during GitHub navigation
document.addEventListener('soft-nav:success', saveStudentSubmission); // Fired when navigating within a repo
document.addEventListener('turbo:click', () => { setTimeout(saveStudentSubmission, 100) }); // Fired when navigating within a PR
window.addEventListener('hashchange', saveStudentSubmission); // Fired when navigating a PR file tree
